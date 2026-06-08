import React, { useEffect } from 'react';
import Reviews from '../components/sections/Reviews';
import CTA from '../components/sections/CTA';
import SeoHead from '../components/SeoHead';
import { useReviews } from '../context/ReviewsContext';

interface ReviewsPageProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function ReviewsPage({ lang, setIsBookingOpen }: ReviewsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { reviews, loaded } = useReviews();

  // Dynamically calculate aggregate rating based on active loaded reviews
  const totalCount = reviews.length;
  const averageRating = totalCount > 0 
    ? Math.round((reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalCount) * 10) / 10 
    : null;

  const reviewCount = totalCount > 0 ? totalCount : null;

  // Extract example reviews list matching Schema.org template
  const exampleReviews = reviews.slice(0, 4).map(r => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": r.name || "Gost"
    },
    "datePublished": r.isoDate || "2026-01-01",
    "reviewBody": r.text || "",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": r.rating || 5,
      "bestRating": 5
    }
  }));

  const schema = loaded && averageRating !== null && reviewCount !== null ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://uvacgriffon.rs/#localbusiness",
        "name": "Uvac Griffon",
        "legalName": "Euro Uvac",
        "url": "https://uvacgriffon.rs/",
        "logo": "https://res.cloudinary.com/dejmpunhb/image/upload/v1777665113/krstarenje-uvcem-meandri.webp",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/v1777665113/krstarenje-uvcem-meandri.webp",
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": averageRating,
          "reviewCount": reviewCount,
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": exampleReviews
      }
    ]
  } : null;

  return (
    <>
      <SeoHead
        title={lang === 'en'
          ? 'Guest Reviews | Uvac Griffon'
          : 'Recenzije gostiju | Uvac Griffon'
        }
        description={lang === 'en'
          ? 'Read what our guests say about their experience cruising Uvac with us.'
          : 'Pročitajte šta naši gosti kažu o svom iskustvu krstarenja Uvcem sa nama.'
        }
        canonicalUrl="https://uvacgriffon.rs/recenzije"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_1200/v1777665113/krstarenje-uvcem-meandri.webp"
        schema={schema ?? undefined}
      />
      <div className="pt-20">
        <Reviews lang={lang} />
        <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />
      </div>
    </>
  );
}
