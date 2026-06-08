import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../lib/translations';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  lang: 'sr' | 'en';
}

export default function NotFound({ lang }: NotFoundProps) {
  useEffect(() => {
    if (lang === 'en') {
      document.title = '404 - Page Not Found | Uvac Griffon';
    } else {
      document.title = '404 - Stranica nije pronađena | Uvac Griffon';
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const langData = translations[lang] as any;
  const t = langData?.notFound || {
    title: lang === 'en' ? '404 – Page not found' : '404 – Stranica nije pronađena',
    message: lang === 'en' ? 'Sorry, the page you are looking for does not exist or has been moved.' : 'Žao nam je, stranica koju tražite ne postoji ili je premeštena.',
    backHome: lang === 'en' ? 'Back to Home' : 'Nazad na početnu'
  };

  return (
    <div className="pt-32 pb-24 flex items-center justify-center min-h-[60vh] bg-bg px-4" id="not-found-page">
      <div className="max-w-xl text-center" id="not-found-container">
        {/* Large stylized 404 number with a classy font */}
        <h1 
          className="font-serif italic text-9xl md:text-[12rem] text-accent font-bold tracking-tight select-none opacity-25 transition-all duration-300"
          id="not-found-title"
        >
          404
        </h1>
        
        <h2 
          className="font-serif text-3xl md:text-4xl text-primary font-semibold mt-6 tracking-tight"
          id="not-found-subtitle"
        >
          {t.title}
        </h2>
        
        <p 
          className="mt-4 text-text-muted text-base md:text-lg max-w-md mx-auto leading-relaxed"
          id="not-found-message"
        >
          {t.message}
        </p>
        
        <div className="mt-10" id="not-found-action-wrapper">
          <Link
            id="not-found-home-link"
            to="/"
            className="inline-flex items-center gap-2 bg-uvac-accent hover:bg-brand-gold text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,163,115,0.3)] hover:shadow-[0_0_25px_rgba(212,163,115,0.5)] transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
