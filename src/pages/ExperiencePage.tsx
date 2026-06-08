import React, { useEffect } from 'react';
import Experience from '../components/sections/Experience';
import CTA from '../components/sections/CTA';
import SeoHead from '../components/SeoHead';

interface ExperiencePageProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function ExperiencePage({ lang, setIsBookingOpen }: ExperiencePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://uvacgriffon.rs/iskustvo/#collection",
        "url": "https://uvacgriffon.rs/iskustvo",
        "name": lang === 'en' ? "Discover Uvac Experiences" : "Otkrijte Uvac - Doživljaji i Atrakcije",
        "description": lang === 'en'
          ? "Explore the ultimate attractions of Uvac: the sweeping river meanders, the mysterious Ice Cave, and the majestic Griffon Vultures."
          : "Istražite glavne atrakcije Uvca: veličanstvene meandre reke, tajanstvenu Ledenu pećinu i carstvo beloglavih supova.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://uvacgriffon.rs/#website"
        },
        "publisher": {
          "@id": "https://uvacgriffon.rs/#localbusiness"
        },
        "author": {
          "@id": "https://uvacgriffon.rs/#localbusiness"
        },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": 3,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": lang === 'en' ? "Uvac Canyon & Meanders" : "Kanjon Uvca i Meandri",
              "url": "https://uvacgriffon.rs/kanjon-uvca"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": lang === 'en' ? "Ice Cave" : "Ledena pećina",
              "url": "https://uvacgriffon.rs/ledena-pecina"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": lang === 'en' ? "Griffon Vulture" : "Beloglavi sup",
              "url": "https://uvacgriffon.rs/beloglavi-sup"
            }
          ]
        }
      },
      {
        "@type": "TravelAgency",
        "@id": "https://uvacgriffon.rs/#localbusiness"
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={lang === 'en'
          ? 'Discover Uvac | Scenic Views & Nature | Uvac Griffon'
          : 'Otkrijte Uvac | Priroda i vidikovci | Uvac Griffon'
        }
        description={lang === 'en'
          ? 'Explore the three greatest gems of Uvac canyon. Griffon vultures, viewpoints and the Ice Cave.'
          : 'Otkrijte tri najveća bisera kanjona Uvca. Beloglavi supovi, vidikovci i Ledena pećina.'
        }
        canonicalUrl="https://uvacgriffon.rs/iskustvo"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665121/beloglavi-sup.webp"
        schema={schema}
      />
      <div className="pt-20"> {/* Add padding for fixed navbar */}
        <Experience lang={lang} />
        <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />
      </div>
    </>
  );
}
