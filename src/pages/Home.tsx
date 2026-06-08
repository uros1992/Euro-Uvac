import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import Experience from '../components/sections/Experience';
import Tour from '../components/sections/Tour';
import Location from '../components/sections/Location';
import Reviews from '../components/sections/Reviews';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import SeoHead from '../components/SeoHead';
import { useReviews } from '../ReviewsContext';

interface HomeProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function Home({ lang, setIsBookingOpen }: HomeProps) {
  const { reviews, loaded } = useReviews();

  const totalCount = reviews.length;
  const averageRating = loaded && totalCount > 0
    ? Math.round((reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalCount) * 10) / 10
    : null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://uvacgriffon.rs/#localbusiness",
        "name": "Uvac Griffon",
        "legalName": "Euro Uvac",
        "url": "https://uvacgriffon.rs/",
        "logo": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_220/v1777665116/uvac-griffon.webp",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_1200/v1777665113/krstarenje-uvcem-meandri.webp",
        "telephone": "+381 65 886 2760",
        "email": "booking@uvacgriffon.rs",
        "priceRange": "RSD 2000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Akmačići",
          "addressLocality": "Nova Varoš",
          "addressRegion": "Zlatiborski okrug",
          "addressCountry": "RS"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.41859,
          "longitude": 19.92684
        },
        ...(loaded && averageRating !== null && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": totalCount,
            "bestRating": "5",
            "worstRating": "1"
          }
        })
      },
      {
        "@type": "WebSite",
        "@id": "https://uvacgriffon.rs/#website",
        "url": "https://uvacgriffon.rs/",
        "name": "Uvac Griffon",
        "description": lang === 'en'
          ? 'Boat cruise through Uvac River meanders from Rastoke Dam. Ice Cave, viewpoints and griffon vultures.'
          : 'Krstarenje meandrima Uvca brodom sa polaskom sa brane Rastoke. Ledena pećina, vidikovci, beloglavi supovi.',
        "publisher": {
          "@id": "https://uvacgriffon.rs/#localbusiness"
        }
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={lang === 'en' 
          ? 'Uvac River Cruise 2026 | Uvac Griffon – Meanders & Griffon Vultures'
          : 'Krstarenje Uvcem 2026 | Uvac Griffon – Meandri i beloglavi supovi'
        }
        description={lang === 'en'
          ? 'Boat cruise through Uvac River meanders from Rastoke Dam. Ice Cave, viewpoints and griffon vultures. Season May–October 2026. Book online!'
          : 'Krstarenje meandrima Uvca brodom sa polaskom sa brane Rastoke. Ledena pećina, vidikovci, beloglavi supovi. Sezona 2026: maj–oktobar. Rezerviši odmah!'
        }
        canonicalUrl="https://uvacgriffon.rs/"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_1200/v1777665113/krstarenje-uvcem-meandri.webp"
        schema={schema}
      />
      <Hero lang={lang} setIsBookingOpen={setIsBookingOpen} />
      <Experience lang={lang} />
      <Tour lang={lang} setIsBookingOpen={setIsBookingOpen} />
      <Location lang={lang} />
      <Reviews lang={lang} />
      <FAQ lang={lang} />
      <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />
    </>
  );
}
