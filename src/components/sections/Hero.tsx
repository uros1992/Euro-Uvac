import React from 'react';
import { ChevronRight } from 'lucide-react';
import { translations } from '../../lib/translations';

interface HeroProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function Hero({ lang, setIsBookingOpen }: HeroProps) {
  const t = translations[lang];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1400/v1777665113/krstarenje-uvcem-meandri.webp" 
            srcSet="
              https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_400/v1777665113/krstarenje-uvcem-meandri.webp 400w,
              https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_600/v1777665113/krstarenje-uvcem-meandri.webp 600w,
              https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1000/v1777665113/krstarenje-uvcem-meandri.webp 1000w,
              https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1400/v1777665113/krstarenje-uvcem-meandri.webp 1400w
            "
            sizes="(max-width: 600px) 400px, 100vw"
            referrerPolicy="no-referrer"
            alt="Krstarenje meandrima reke Uvac - Uvac Griffon" 
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1610408544955-46743b1740e7?q=80&w=2070&auto=format&fit=crop";
            }}
          />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div>
          <p className="inline-block py-1 px-3 rounded-full bg-black/20 text-white text-sm font-medium tracking-wider mb-6 border border-white/30">
            {t.hero.badge}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <h2 className="text-3xl font-bold text-white mb-3">
            {lang === 'sr' 
              ? 'Krstarenje meandrima Uvca brodom' 
              : 'Boat cruise through Uvac River meanders'}
          </h2>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-uvac-accent hover:bg-brand-gold text-white px-6 py-3 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:shadow-[0_0_30px_rgba(212,163,115,0.6)] transform hover:-translate-y-1 flex items-center gap-2 w-auto justify-center"
            >
              {t.hero.checkAvail} <ChevronRight className="w-5 h-5" />
            </button>
            <a href={lang === 'en' ? '#tour' : '#tura'} className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-3 rounded-full font-bold text-lg transition-all w-auto justify-center text-center">
              {t.hero.viewTours}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
