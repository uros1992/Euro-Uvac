import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../lib/translations';

interface CTAProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function CTA({ lang, setIsBookingOpen }: CTAProps) {
  const t = translations[lang];

  return (
    <section className="py-24 bg-uvac-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topography" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm0 2c15.464 0 28 12.536 28 28S45.464 58 30 58 2 45.464 2 30 14.536 2 30 2zm0 4c13.255 0 24 10.745 24 24S43.255 54 30 54 6 43.255 6 30 16.745 6 30 6zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S10 41.046 10 30 18.954 10 30 10zm0 4c8.837 0 16 7.163 16 16s-7.163 16-16 16S14 38.837 14 30 21.163 14 30 14z" fill="currentColor" fillRule="evenodd" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topography)" />
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.cta.title}</h2>
        <p className="text-xl text-white/80 mb-10">{t.cta.subtitle}</p>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="bg-uvac-accent hover:bg-brand-gold text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl transform hover:-translate-y-1"
        >
          {t.cta.btn}
        </button>
        <p className="text-white/60 text-sm mt-6">
          {t.cta.cancel}{" "}
          <Link 
            to="/admin"
            className="underline hover:text-white transition-colors focus:outline-none"
          >
            {t.cta.cancelLink}
          </Link>
          {t.cta.cancelSuffix}
        </p>
      </div>
    </section>
  );
}
