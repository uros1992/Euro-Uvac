import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Configuration constants for booking validation and constraints
const CONFIG = {
  MAX_CAPACITY: 12,
  SEASON_START_MONTH: 4, // May (0-indexed month index)
  SEASON_END_MONTH: 9,   // October (0-indexed month index)
  // Allowed departure days (0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday)
  // Departures allowed Tuesday to Sunday (Monday is closed)
  ALLOWED_DEPARTURE_DAYS: [0, 2, 3, 4, 5, 6],
  ALLOWED_DEPARTURE_DAYS_NAMES_SR: ["Nedelja", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
  ALLOWED_DEPARTURE_DAYS_NAMES_EN: ["Sunday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

// In-memory Mutex to queue execution sequentially
class Mutex {
  private queue: Promise<any> = Promise.resolve();

  async acquire(): Promise<() => void> {
    let release: () => void;
    const next = new Promise<void>((resolve) => {
      release = resolve;
    });
    const current = this.queue;
    this.queue = current.then(() => next).catch(() => next);
    await current;
    return release!;
  }
}

const bookingMutex = new Mutex();

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function startServer() {
  // Dual-language email support enabled (SR/EN)
  const app = express();
  const PORT = 3000;
  
  // Lazy init Resend
  let resendClient: Resend | null = null;
  const getResend = () => {
    if (!resendClient) {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is missing in environment variables");
      }
      resendClient = new Resend(process.env.RESEND_API_KEY);
    }
    return resendClient;
  };

  // Lazy init Supabase
  let supabaseClient: ReturnType<typeof createClient> | null = null;
  const getSupabase = () => {
    if (!supabaseClient) {
      const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key) {
        console.error("[Supabase Config Error]: Missing credentials", { url: !!url, key: !!key });
        throw new Error("Supabase credentials missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables");
      }
      supabaseClient = createClient(url, key);
    }
    return supabaseClient;
  };

  app.use(express.json());

  // Redirect from old Render domain to custom domain
  app.use((req, res, next) => {
    if (req.hostname === 'euro-uvac.onrender.com') {
      return res.redirect(301, 'https://uvacgriffon.rs' + req.originalUrl);
    }
    next();
  });

  // Secure endpoint to fetch booking dates and seat count without exposing private customer information
  app.get("/api/availability", async (req, res) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('bookings')
        .select('booking_date, guest_count');

      if (error) {
        console.error("Error fetching availability:", error);
        return res.status(500).json({ success: false, error: "Database error fetching availability" });
      }

      res.status(200).json({ success: true, availability: data });
    } catch (err: any) {
      console.error("Availability exception:", err);
      res.status(500).json({ success: false, error: err.message || "Internal server error" });
    }
  });

  // NEW: Booking endpoint with Supabase storage and Resend notification
  app.post("/api/booking", async (req, res) => {
    try {
      const { name, email, phone, date, message, num } = req.body;

      if (!name || !email || !date || !num) {
        return res.status(400).json({ success: false, error: "Obavezna polja nisu popunjena." });
      }

      const numGuests = parseInt(num);

      // --- SERVER-SIDE VALIDATION ---
      const bookingDateOnly = new Date(date);
      const bYear = bookingDateOnly.getUTCFullYear();
      const bMonth = bookingDateOnly.getUTCMonth();
      const bDay = bookingDateOnly.getUTCDate();
      const dayOfWeek = bookingDateOnly.getUTCDay();

      // 1. Date validity - reject dates in the past (comparing days normalized to midnight)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const bookingDateCompare = new Date(bYear, bMonth, bDay);
      if (bookingDateCompare.getTime() < today.getTime()) {
        return res.status(400).json({
          success: false,
          error: "Izabrani datum je u prošlosti. Molimo izaberite aktuelan datum.",
          errorEn: "The selected date is in the past. Please select an active date."
        });
      }

      // 2. Day of week check - departures allowed Tuesday to Sunday (or based on config constant)
      if (!CONFIG.ALLOWED_DEPARTURE_DAYS.includes(dayOfWeek)) {
        return res.status(400).json({
          success: false,
          error: `Polasci nisu dozvoljeni ovim danom u nedelji. Polasci su mogući sledećim danima: ${CONFIG.ALLOWED_DEPARTURE_DAYS_NAMES_SR.join(', ')}.`,
          errorEn: `Departures are not allowed on this day of the week. Departures are permitted on: ${CONFIG.ALLOWED_DEPARTURE_DAYS_NAMES_EN.join(', ')}.`
        });
      }

      // 3. Season check - only allow May 1 to Oct 31
      if (bMonth < CONFIG.SEASON_START_MONTH || bMonth > CONFIG.SEASON_END_MONTH) {
        return res.status(400).json({
          success: false,
          error: "Rezervacije su moguće samo tokom letnje sezone (od 1. maja do 31. oktobra).",
          errorEn: "Reservations are only available within the summer season (May 1st to October 31st)."
        });
      }

      // 4. Guest count check - must be >= 1 and <= tour's max capacity
      if (isNaN(numGuests) || numGuests < 1 || numGuests > CONFIG.MAX_CAPACITY) {
        return res.status(400).json({
          success: false,
          error: `Broj putnika mora biti od 1 do maksimalno ${CONFIG.MAX_CAPACITY} osoba.`,
          errorEn: `Number of guests must be between 1 and the maximum capacity of ${CONFIG.MAX_CAPACITY} guests.`
        });
      }

      const supabase = getSupabase();
      const resend = getResend();

      // 5. Atomic capacity check & Insertion
      const release = await bookingMutex.acquire();
      let bookingData;
      try {
        const { data: bookingsOnDate, error: fetchError } = await supabase
          .from('bookings')
          .select('guest_count')
          .eq('booking_date', date);

        if (fetchError) {
          console.error("Supabase fetch database exception during capacity check:", fetchError);
          return res.status(500).json({
            success: false,
            error: "Sistemska greška pri proveri kapaciteta.",
            errorEn: "System error checking tour capacity."
          });
        }

        const bookedSeats = (bookingsOnDate || []).reduce((sum, b) => sum + (parseInt(b.guest_count) || 0), 0);
        const remainingCapacity = CONFIG.MAX_CAPACITY - bookedSeats;

        if (remainingCapacity < numGuests) {
          return res.status(409).json({
            success: false,
            error: `Nažalost, nema dovoljno slobodnih mesta za izabrani datum. Preostalo je još ${remainingCapacity >= 0 ? remainingCapacity : 0} slobodnih mesta.`,
            errorEn: `Unfortunately, there are not enough available seats for this date. Only ${remainingCapacity >= 0 ? remainingCapacity : 0} seats left.`
          });
        }

        // Insert booking atomically inside lock
        const { data, error: supabaseError } = await supabase
          .from('bookings')
          .insert([
            { 
              name, 
              email, 
              phone, 
              booking_date: date, 
              message, 
              guest_count: numGuests,
              created_at: new Date().toISOString()
            }
          ])
          .select();

        if (supabaseError) {
          console.error("Supabase insert error:", supabaseError);
          return res.status(500).json({
            success: false,
            error: "Greška pri čuvanju rezervacije u bazi podataka.",
            errorEn: "Error saving reservation to the database."
          });
        }

        bookingData = data;
      } finally {
        release();
      }

      // 2. Pošalji mejlove (ako je čuvanje uspešno)
      const subject = "Nova rezervacija / New Booking - Uvac Griffon";
      
      const bookingDateObj = new Date(date);
      const day = bookingDateObj.getUTCDate();
      const monthsSR = ['Januar','Februar','Mart','April',
        'Maj','Jun','Jul','Avgust','Septembar',
        'Oktobar','Novembar','Decembar'];
      const monthsEN = ['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
      const year = bookingDateObj.getUTCFullYear();
      const formattedDateSR = `${day}. ${monthsSR[bookingDateObj.getUTCMonth()]} ${year}. u 13:00h`;
      const formattedDateEN = `${day} ${monthsEN[bookingDateObj.getUTCMonth()]} ${year} at 1:00 PM`;

      // Escaping user-supplied fields to prevent HTML injection
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || '');
      const safeMessage = escapeHtml(message || '');
      const safeNum = escapeHtml(String(num));

      const adminEmailHtml = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nova rezervacija primljena!</h2>
          <p><strong>Ime:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone || 'Nije navedeno'}</p>
          <p><strong>Datum:</strong> ${formattedDateSR}</p>
          <p><strong>Broj osoba:</strong> ${safeNum}</p>
          <p><strong>Poruka:</strong> ${safeMessage || '/'}</p>
          <hr />
          <p>Proveri Supabase Dashboard za više detalja.</p>
        </div>
      `;

      const userEmailHtml = `
  <div style="font-family: sans-serif; max-width: 600px; 
  margin: 0 auto; color: #333; line-height: 1.6;">
    
    <div style="background-color: #0f291e; padding: 20px; 
    text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0;">Uvac Griffon</h1>
    </div>

    <div style="padding: 20px; border: 1px solid #e5e7eb; 
    border-top: none;">
      <h2 style="color: #0f291e;">Rezervacija potvrđena! ✅</h2>
      <p>Zdravo <strong>${safeName}</strong>,</p>
      <p>Vaša avantura na Uvcu je uspešno rezervisana. 
      Detalji vaše rezervacije:</p>
      <div style="background-color: #f0f9ff; padding: 15px; 
      border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">
          <strong>📅 Datum:</strong> ${formattedDateSR}
        </p>
        <p style="margin: 5px 0;">
          <strong>👥 Osoba:</strong> ${safeNum}
        </p>
        <p style="margin: 5px 0;">
          <strong>📍 Mesto polaska:</strong> 
          Brana HE "Uvac", Akmačići
        </p>
      </div>
      <p>Plaćanje se vrši na licu mesta 
      (2000 RSD po osobi + 420 RSD za ulaz u rezervat 
      i pećinu).</p>
      <p>Ako želite da otkažete ili promenite rezervaciju, 
      molimo vas da nas kontaktirate putem sajta ili 
      telefona najmanje 24h ranije.</p>
      <p>Vidimo se na vodi! 🚤</p>
    </div>

    <div style="margin: 30px 0; 
    border-top: 2px dashed #e5e7eb;"></div>

    <div style="padding: 20px; border: 1px solid #e5e7eb; 
    border-radius: 0 0 8px 8px;">
      <h2 style="color: #0f291e;">Booking Confirmed! ✅</h2>
      <p>Hello <strong>${safeName}</strong>,</p>
      <p>Your Uvac adventure has been successfully booked. 
      Here are your booking details:</p>
      <div style="background-color: #f0f9ff; padding: 15px; 
      border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">
          <strong>📅 Date:</strong> ${formattedDateEN}
        </p>
        <p style="margin: 5px 0;">
          <strong>👥 Guests:</strong> ${safeNum}
        </p>
        <p style="margin: 5px 0;">
          <strong>📍 Departure:</strong> 
          Dam HE "Uvac", Akmačići
        </p>
      </div>
      <p>Payment is made on-site 
      (2000 RSD per person + 420 RSD for nature reserve 
      and cave entry).</p>
      <p>To cancel or modify your booking, please 
      contact us via the website or phone at least 
      24 hours in advance.</p>
      <p>See you out on the water! 🚤</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; 
      margin: 20px 0;" />
      <p style="font-size: 12px; color: #6b7280; 
      text-align: center;">
        Uvac Griffon | Akmačići, Nova Varoš<br/>
        <a href="https://uvacgriffon.rs" 
        style="color: #0f291e;">uvacgriffon.rs</a>
      </p>
    </div>
  </div>
`;

      // Helper function for sending with fallback
      const sendEmailWithFallback = async (options: any) => {
        try {
          const res = await resend.emails.send(options);
          if (res.error) {
            console.warn(`[Resend Warning]: Email failed from ${options.from}. Reason: ${res.error.message}. Retrying with fallback...`);
            // Fallback to onboarding address if domain is the issue
            return await resend.emails.send({
              ...options,
              from: 'Uvac Griffon <onboarding@resend.dev>'
            });
          }
          return res;
        } catch (err: any) {
          console.error(`[Resend Exception]: Critical error sending from ${options.from}.`, err);
          // Last ditch effort with onboarding address
          return await resend.emails.send({
            ...options,
            from: 'Uvac Griffon <onboarding@resend.dev>'
          });
        }
      };

      // Šaljemo adminu
      const adminRes = await sendEmailWithFallback({
        from: 'Uvac Griffon <booking@uvacgriffon.rs>',
        to: ['booking@uvacgriffon.rs'],
        subject: `NOVO: Rezervacija - ${name} (${formattedDateSR})`,
        html: adminEmailHtml
      });
      
      if (adminRes.error) {
        console.error("[Resend Admin FINAL FAIL]:", adminRes.error);
      }

      // Šaljemo korisniku
      let emailUserError = null;
      const userRes = await sendEmailWithFallback({
        from: 'Uvac Griffon <booking@uvacgriffon.rs>',
        to: [email],
        bcc: ['milivoje.ciro@gmail.com'],
        subject: 'Rezervacija primljena – Krstarenje Uvcem | Uvac Griffon',
        html: userEmailHtml
      });

      if (userRes.error) {
        console.error("[Resend User FINAL FAIL]:", userRes.error);
        emailUserError = userRes.error ? userRes.error.message : "Unknown error";
      }

      if (emailUserError) {
        return res.status(200).json({ 
          success: true, 
          message: "Rezervacija je sačuvana, ali email potvrda nije mogla biti poslata.",
          emailError: emailUserError 
        });
      }

      res.status(200).json({ success: true, message: "Rezervacija uspešno zabeležena i mejlovi poslati." });

    } catch (error: any) {
      console.error("Booking process error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Došlo je do greške prilikom obrade rezervacije." 
      });
    }
  });

  // Email route (legacy / keep for now)
  app.post("/api/send-email", async (req, res) => {
    try {
      const { to, name, date, seats, lang } = req.body;
      const isSerbian = lang === 'sr';

      if (!to || typeof to !== 'string' || to.trim() === '') {
        return res.status(400).json({ success: false, error: "Recipient email (to) is required" });
      }
      
      const resend = getResend();

      let formattedDateSr = date;
      let formattedDateEn = date;
      
      if (date && date.includes('-')) {
        const [year, month, day] = date.split('-');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        formattedDateSr = `${parseInt(day)}. ${dateObj.toLocaleString('sr-RS', { month: 'long' })} ${year}, 13:00č`;
        formattedDateEn = `${parseInt(day)} ${dateObj.toLocaleString('en-US', { month: 'long' })} ${year}, 1:00 PM`;
      } else {
        const d = new Date(date);
        formattedDateSr = d.toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' }) + ", 13:00č";
        formattedDateEn = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ", 1:00 PM";
      }

      const subject = "Vaša rezervacija je potvrđena! / Your Booking is Confirmed! - Uvac Griffon";
      
      const emailHtml = `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <!-- SERBIAN VERSION -->
            <div style="background-color: #0369a1; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">Uvac Griffon Avantura</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #0369a1;">Rezervacija potvrđena! ✅</h2>
              <p>Zdravo <strong>${name}</strong>,</p>
              <p>Vaša avantura na Uvcu je uspešno rezervisana. Detalji vaše rezervacije:</p>
              <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${formattedDateSr}</p>
                <p style="margin: 5px 0;"><strong>👥 Osoba:</strong> ${seats}</p>
                <p style="margin: 5px 0;"><strong>📍 Mesto polaska:</strong> Brana HE "Uvac", Akmačići</p>
              </div>
              <p>Plaćanje se vrši na licu mesta (2000 RSD po osobi + 420 RSD za ulaz u rezervat i pećinu).</p>
              <p>Ako želite da otkažete ili promenite rezervaciju, molimo vas da nas kontaktirate putem sajta ili telefona najmanje 24h ranije.</p>
              <p>Vidimo se na vodi!</p>
            </div>

            <div style="margin: 30px 0; border-top: 2px dashed #e5e7eb;"></div>

            <!-- ENGLISH VERSION -->
            <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0369a1;">Booking Confirmed! ✅</h2>
              <p>Hello <strong>${name}</strong>,</p>
              <p>Your Uvac adventure has been confirmed! Here are the details:</p>
              <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${formattedDateEn}</p>
                <p style="margin: 5px 0;"><strong>👥 Guests:</strong> ${seats}</p>
                <p style="margin: 5px 0;"><strong>📍 Departure:</strong> Dam HE "Uvac", Akmačići</p>
              </div>
              <p>Payment is made on-site (2000 RSD per person + 420 RSD for nature reserve and cave entry).</p>
              <p>If you need to manage or cancel your reservation, please do so via the website or contact us at least 24 hours prior to departure.</p>
              <p>See you out on the water!</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="font-size: 12px; color: #6b7280; text-align: center;">
                Uvac Griffon | Akmačići, Nova Varoš<br/>
                <a href="https://uvacgriffon.rs" style="color: #0369a1;">uvacgriffon.rs</a>
              </p>
            </div>
          </div>
      `;
      
      try {
        console.log("Attempting to send email via Resend API...");
        
        const { data, error } = await resend.emails.send({
          from: 'Uvac Griffon <booking@uvacgriffon.rs>', // AKO NIJE VERIFIKOVAN DOMEN, OVDE STAVI 'onboarding@resend.dev'
          to: [to], 
          subject: subject, 
          html: emailHtml
        });

        if (error) {
          console.error("Resend API Error:", error);
          // Ako je greška zbog domena, pokušavamo sa onboarding adresom kao fallback (samo za testiranje)
          if (error.message.includes("domain") || error.name === "validation_error") {
             console.log("Retrying with onboarding@resend.dev fallback...");
             const retry = await resend.emails.send({
               from: 'Uvac Griffon <onboarding@resend.dev>',
               to: [to],
               subject: subject,
               html: emailHtml
             });
             if (retry.error) throw new Error(retry.error.message);
             return res.json({ success: true, id: retry.data?.id });
          }
          throw new Error(error.message);
        }

        console.log("Email sent successfully! Id:", data?.id);
        res.json({ success: true, id: data?.id });
      } catch (mailError: any) {
        console.error("FATAL: Resend Error while sending mail:", mailError);
        res.status(500).json({ 
          success: false, 
          error: "Slanje mejla nije uskoro. Proverite Resend nalog ili se obratite podršci.",
          details: mailError?.message || String(mailError)
        });
      }
    } catch (error) {
      console.error("General error in email route:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://uvacgriffon.rs/sitemap.xml\n");
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://uvacgriffon.rs/</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/tura</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/recenzije</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/iskustvo</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/iskustvo/beloglavi-sup</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/iskustvo/kanjon-uvca</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/iskustvo/ledena-pecina</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
