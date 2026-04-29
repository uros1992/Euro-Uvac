import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";

async function startServer() {
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
      const { to, name, date, seats } = req.body;

      if (!to || typeof to !== 'string' || to.trim() === '') {
        console.error("Error: Missing recipient email (to)");
        return res.status(400).json({ success: false, error: "Recipient email (to) is required" });
      }
      
      let transporter: nodemailer.Transporter;
      let isMock = false;

      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
         // Use real SMTP provider
         transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
               user: process.env.SMTP_USER,
               pass: process.env.SMTP_PASS,
            },
         });
      } else {
         // Auto-generate test account for Ethereal (Fake SMTP for development/testing)
         isMock = true;
         const testAccount = await nodemailer.createTestAccount();
         transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
         });
      }

      let formattedDate = date;
      if (date && date.includes('-')) {
        const [year, month, day] = date.split('-');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
        formattedDate = `${parseInt(day)} ${monthName} ${year}, 13:00 PM`;
      } else {
        formattedDate = new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ", 13:00 PM";
      }

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Euro Uvac Booking" <no-reply@eurouvac.com>', 
        to: to, 
        subject: "Your Booking is Confirmed!", 
        text: `Euro Uvac Adventure\nBooking Confirmed! ✅\n\nHello ${name},\n\nYour Euro Uvac adventure has been confirmed! Here are the details:\n\n* Date: ${formattedDate}\n* Guests: ${seats}\n\nIf you need to manage or cancel your reservation (up to 24 hours prior to departure), you can do so by logging into the website.\n\nSee you out on the water!`, 
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #0369a1;">Euro Uvac Adventure</h1>
            <h2>Booking Confirmed! ✅</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your Euro Uvac adventure has been confirmed! Here are the details:</p>
            <ul>
              <li><strong>Date:</strong> ${formattedDate}</li>
              <li><strong>Guests:</strong> ${seats}</li>
            </ul>
            <p>If you need to manage or cancel your reservation (up to 24 hours prior to departure), you can do so by logging into the website.</p>
            <p>See you out on the water!</p>
          </div>
        `, 
      });

      // Ethereal automatically provides a URL to preview the fake email without a real inbox!
      let previewUrl = null;
      if (isMock) {
        previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Email sent! Preview URL: %s", previewUrl);
      }
      
      res.json({ success: true, previewUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to send email" });
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
