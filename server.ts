import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";

async function startServer() {
  // Dual-language email support enabled (SR/EN)
const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // Redirect from old Render domain to custom domain
  app.use((req, res, next) => {
    if (req.hostname === 'euro-uvac.onrender.com') {
      return res.redirect(301, 'https://uvacgriffon.rs' + req.originalUrl);
    }
    next();
  });

  // Email route
  app.post("/api/send-email", async (req, res) => {
    try {
      console.log("Received send-email request:", req.body);
      console.log("Starting email sending process...");
      console.log("SMTP Config present:", {
        host: !!process.env.SMTP_HOST,
        user: !!process.env.SMTP_USER,
        pass: !!process.env.SMTP_PASS,
        from: !!process.env.SMTP_FROM
      });

      const { to, name, date, seats, lang } = req.body;
      const isSerbian = lang === 'sr';

      if (!to || typeof to !== 'string' || to.trim() === '') {
        console.error("Error: Missing recipient email (to)");
        return res.status(400).json({ success: false, error: "Recipient email (to) is required" });
      }
      
      let transporter: nodemailer.Transporter;
      let isMock = false;

      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
         const host = process.env.SMTP_HOST.toLowerCase();
         const isGmail = host.includes('gmail.com');
         
         console.log(`Initializing transporter for ${isGmail ? 'Gmail' : host}...`);
         
         if (isGmail) {
            transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
               },
               connectionTimeout: 10000, // 10 seconds
               greetingTimeout: 10000,
            });
         } else {
            const port = Number(process.env.SMTP_PORT) || 587;
            transporter = nodemailer.createTransport({
               host: process.env.SMTP_HOST,
               port: port,
               secure: port === 465, 
               auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
               },
               tls: {
                 rejectUnauthorized: false 
               },
               connectionTimeout: 10000,
               greetingTimeout: 10000,
            });
         }
      } else {
         console.log("No SMTP config found, using Ethereal mock account");
         isMock = true;
         const testAccount = await nodemailer.createTestAccount();
         transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
               user: testAccount.user,
               pass: testAccount.pass,
            },
         });
      }

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
        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Uvac Griffon Booking" <no-reply@uvacgriffon.rs>', 
          to: to, 
          subject: subject, 
          html: emailHtml
        });

        console.log("Email sent successfully! MessageId:", info.messageId);
        
        // Ethereal preview URL
        let previewUrl = null;
        if (isMock) {
          previewUrl = nodemailer.getTestMessageUrl(info);
          console.log("Review Ethereal email at:", previewUrl);
        }
        
        res.json({ success: true, previewUrl });
      } catch (mailError) {
        console.error("FATAL: SMTP Error while sending mail:", mailError);
        res.status(500).json({ 
          success: false, 
          error: "Slanje mejla nije uspelo. Proverite serverske logove.",
          details: mailError instanceof Error ? mailError.message : String(mailError)
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
