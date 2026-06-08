import React, { useRef, useEffect } from 'react';
import { Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations } from '../../lib/translations';

interface TourProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function Tour({ lang, setIsBookingOpen }: TourProps) {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Handle potential play failure
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section id="tour-section" className="py-20 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.tours.title}</h2>
          <p className="text-gray-600 text-lg">{t.tours.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col sm:flex-row group">
            <div className="sm:w-2/5 relative overflow-hidden bg-white h-64 sm:h-auto">
              <div className="absolute inset-0 p-2 sm:p-4">
                <video 
                  ref={videoRef}
                  src="https://res.cloudinary.com/dejmpunhb/video/upload/f_auto,q_auto:eco,w_500/v1777655312/uvac-krstarenje.mp4" 
                  muted 
                  playsInline
                  autoPlay 
                  preload="none"
                  className="w-full h-full object-contain rounded-[1.5rem] overflow-hidden transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4 sm:p-8 sm:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-bold text-uvac-dark">{t.tours.t1Title}</h3>
                  <div className="text-right">
                    <div className="text-uvac-primary font-bold text-xl">{t.tours.t1Price}</div>
                    <div className="text-gray-500 text-xs">{t.tours.t1Unit}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t.tours.t1Duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {t.tours.t1Max}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {[t.tours.t1F1, t.tours.t1F2, t.tours.t1F3, t.tours.t1F4].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-uvac-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-gray-400 italic mb-6 leading-tight">
                  {t.tours.priceDisclaimer}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full sm:w-1/2 bg-uvac-accent hover:bg-brand-gold text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {t.tours.selectDate}
                </button>
                <Link 
                  to="/tura" 
                  className="group inline-flex items-center gap-1 text-uvac-accent hover:text-uvac-dark font-medium transition-colors"
                >
                  {lang === 'sr' ? 'Detaljan plan ture' : 'Detailed Tour Plan'} 
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
