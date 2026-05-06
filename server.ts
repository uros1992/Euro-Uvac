import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

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
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key) {
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

  // NEW: Booking endpoint with Supabase storage and Resend notification
  app.post("/api/booking", async (req, res) => {
    try {
      const { name, email, phone, date, message, num } = req.body;

      if (!name || !email || !date || !num) {
        return res.status(400).json({ success: false, error: "Obavezna polja nisu popunjena." });
      }

      const supabase = getSupabase();
      const resend = getResend();

      // 1. Sačuvaj u Supabase
      const { data: bookingData, error: supabaseError } = await supabase
        .from('bookings')
        .insert([
          { 
            name, 
            email, 
            phone, 
            booking_date: date, 
            message, 
            guest_count: parseInt(num),
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw new Error("Greška pri čuvanju rezervacije u bazi podataka.");
      }

      // 2. Pošalji mejlove (ako je čuvanje uspešno)
      const subject = "Nova rezervacija / New Booking - Uvac Griffon";
      
      const adminEmailHtml = `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nova rezervacija primljena!</h2>
          <p><strong>Ime:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Nije navedeno'}</p>
          <p><strong>Datum:</strong> ${date}</p>
          <p><strong>Broj osoba:</strong> ${num}</p>
          <p><strong>Poruka:</strong> ${message || '/'}</p>
          <hr />
          <p>Proveri Supabase Dashboard za više detalja.</p>
        </div>
      `;

      const userEmailHtml = `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h1 style="color: #0369a1; text-align: center;">Uvac Griffon</h1>
          <h2 style="text-align: center;">Primili smo Vaš upit! ✅</h2>
          <p>Zdravo <strong>${name}</strong>,</p>
          <p>Hvala Vam na interesovanju za krstarenje Uvcem. Primili smo Vašu poruku i obradićemo je u najkraćem mogućem roku.</p>
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>📅 Datum:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>👥 Broj osoba:</strong> ${num}</p>
          </div>
          <p>Kontaktiraćemo Vas uskoro radi potvrde dostupnosti.</p>
          <p>Srdačan pozdrav,<br/><strong>Uvac Griffon Tim</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Ovo je automatska potvrda prijema upita.</p>
        </div>
      `;

      // Šaljemo adminu
      await resend.emails.send({
        from: 'Uvac Griffon <booking@uvacgriffon.rs>',
        to: ['booking@uvacgriffon.rs'],
        subject: `NOVO: Rezervacija - ${name} (${date})`,
        html: adminEmailHtml
      });

      // Šaljemo korisniku
      await resend.emails.send({
        from: 'Uvac Griffon <booking@uvacgriffon.rs>',
        to: [email],
        subject: 'Uspešno ste poslali upit za krstarenje - Uvac Griffon',
        html: userEmailHtml
      });

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
              <p>Plaćanje se vrši na licu mesta (2000 DIN po osobi + 420 DIN za ulaz u rezervat i pećinu).</p>
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
              <p>Payment is made on-site (2000 DIN per person + 420 DIN for reserve and cave entry).</p>
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
    <lastmod>2026-04-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/#tours</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/#about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/#location</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://uvacgriffon.rs/privacy</loc>
    <priority>0.3</priority>
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
