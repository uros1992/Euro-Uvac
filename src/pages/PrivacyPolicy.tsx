import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';

const content = {
  sr: {
    title: "Politika privatnosti — Uvac Griffon",
    date: "Datum poslednje izmene: 3. maj 2026.",
    sections: [
      {
        title: "1. Ko prikuplja podatke",
        text: "Euro Uvac\nAkmačići, Nova Varoš, Srbija\nPIB: 112457556\nMatični broj: 66116204\nEmail: [booking@uvacgriffon.rs]\nTelefon: +381 65 886 2760"
      },
      {
        title: "2. Koje podatke prikupljamo",
        text: "Prilikom rezervacije prikupljamo isključivo:\n- Ime i prezime\n- Email adresu\n- Broj telefona\n- Broj osoba\n- Datum rezervacije\nNe prikupljamo finansijske podatke niti podatke o platnim karticama."
      },
      {
        title: "3. Zašto prikupljamo podatke",
        text: "Podaci se koriste isključivo za:\n- Potvrdu rezervacije putem email poruke\n- Komunikaciju u vezi sa rezervacijom\n- Obaveštavanje o promenama u rasporedu\nPodaci se nikada ne koriste u marketinške svrhe bez izričite saglasnosti i nikada se ne prosleđuju trećim licima."
      },
      {
        title: "4. Koliko dugo čuvamo podatke",
        text: "Podaci se čuvaju maksimalno 12 meseci od datuma rezervacije, nakon čega se trajno brišu. Nerealizovane rezervacije brišu se u roku od 30 dana."
      },
      {
        title: "5. Ko ima pristup podacima",
        text: "Isključivo ovlašćeno osoblje Euro Uvac.\nPodaci se ne prosleđuju marketinškim agencijama, partnerskim kompanijama niti bilo kojoj trećoj strani."
      },
      {
        title: "6. Tehnička zaštita",
        text: "Podaci se prenose putem sigurne HTTPS veze. Email komunikacija odvija se putem verifikovanih servisa."
      },
      {
        title: "7. Vaša prava",
        text: "Imate pravo da pristupite, ispravite ili zahtevate brisanje vaših podataka, kao i da povučete saglasnost u bilo kom trenutku. Za ostvarivanje prava kontaktirajte nas na gorenavedeni email."
      },
      {
        title: "8. Kolačići",
        text: "Sajt koristi Google Analytics kolačiće isključivo za analizu posećenosti. Ovi kolačići ne identifikuju vas lično."
      },
      {
        title: "9. Kontakt",
        text: "Euro Uvac\nEmail: [booking@uvacgriffon.rs]\nTelefon: +381 65 886 2760"
      }
    ]
  },
  en: {
    title: "Privacy Policy — Uvac Griffon",
    date: "Last updated: May 3, 2026",
    sections: [
      {
        title: "1. Data Controller",
        text: "Euro Uvac\nAkmačići, Nova Varoš, Serbia\nVAT (PIB): 112457556\nReg. No. (MB): 66116204\nEmail: [booking@uvacgriffon.rs]\nPhone: +381 65 886 2760"
      },
      {
        title: "2. Data We Collect",
        text: "When booking, we collect only:\n- Full Name\n- Email Address\n- Phone Number\n- Number of Guests\n- Booking Date\nWe do not collect financial data or payment card information."
      },
      {
        title: "3. Why We Collect Data",
        text: "Data is used exclusively for:\n- Booking confirmation via email\n- Communication regarding the reservation\n- Advising on schedule changes\nData is never used for marketing purposes without explicit consent and is never forwarded to third parties."
      },
      {
        title: "4. Data Retention",
        text: "Data is stored for a maximum of 12 months from the booking date, after which it is permanently deleted. Unrealized bookings are deleted within 30 days."
      },
      {
        title: "5. Who Has Access to Data",
        text: "Exclusively authorized Euro Uvac staff.\nData is not forwarded to marketing agencies, partner companies, or any third party."
      },
      {
        title: "6. Technical Protection",
        text: "Data is transmitted via a secure HTTPS connection. Email communication takes place through verified services."
      },
      {
        title: "7. Your Rights",
        text: "You have the right to access, correct, or request the deletion of your data, as well as to withdraw consent at any time. To exercise your rights, contact us at the email address provided above."
      },
      {
        title: "8. Cookies",
        text: "The site uses Google Analytics cookies exclusively to analyze traffic. These cookies do not identify you personally."
      },
      {
        title: "9. Contact",
        text: "Euro Uvac\nEmail: [booking@uvacgriffon.rs]\nPhone: +381 65 886 2760"
      }
    ]
  }
};

interface PrivacyPolicyProps {
  lang: 'sr' | 'en';
}

export default function PrivacyPolicy({ lang }: PrivacyPolicyProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = content[lang];

  return (
    <div className="pt-28 pb-16 min-h-screen bg-surface-page text-gray-800 font-sans">
      <SeoHead 
        title={lang === 'sr' ? 'Politika privatnosti – Uvac Griffon' : 'Privacy Policy – Uvac Griffon'}
        description={lang === 'sr' ? 'Politika privatnosti i uslovi korišćenja za zvanični sajt Uvac Griffon tura krstarenja.' : 'Privacy policy and terms of use for the official Uvac Griffon cruise tours.'}
        canonicalUrl="https://uvacgriffon.rs/privacy"
      />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-uvac-dark mb-2">{t.title}</h1>
        <p className="text-gray-400 text-sm mb-12">{t.date}</p>

        <div className="space-y-12">
          {t.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-bold text-uvac-dark border-l-4 border-uvac-accent pl-4">{section.title}</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap pl-5">
                {section.text}
              </div>
            </section>
          ))}
        </div>


      </div>
    </div>
  );
}
