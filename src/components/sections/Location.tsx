import React from 'react';
import { Navigation, Car, MapPin, Map, Phone, MessageCircle } from 'lucide-react';
import { translations } from '../../lib/translations';

interface LocationProps {
  lang: 'sr' | 'en';
}

export default function Location({ lang }: LocationProps) {
  const t = translations[lang];

  return (
    <section id="location" className="py-24 bg-surface-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-uvac-dark mb-4">{t.location.title}</h2>
          <p className="text-lg text-gray-600">{t.location.subtitle}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-uvac-primary/10 p-2 rounded-lg">
                  <Navigation className="w-6 h-6 text-uvac-primary" />
                </div>
                <h3 className="text-xl font-bold text-uvac-dark">{t.location.fromBelgrade}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.location.fromBelgradeDesc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-uvac-primary/10 p-2 rounded-lg">
                  <Car className="w-6 h-6 text-uvac-primary" />
                </div>
                <h3 className="text-xl font-bold text-uvac-dark">{t.location.fromZlatibor}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.location.fromZlatiborDesc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-uvac-primary/10 p-2 rounded-lg">
                  <MapPin className="w-6 h-6 text-uvac-primary" />
                </div>
                <h3 className="text-xl font-bold text-uvac-dark">{t.location.meetingPoint}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t.location.meetingPointDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://www.google.com/maps?q=43.41859265482159,19.926836899441174" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-uvac-dark px-6 py-4 rounded-xl font-bold transition-colors border border-gray-100 shadow-sm"
              >
                <Map className="w-5 h-5" />
                {t.location.openMap}
              </a>
              <a 
                href="tel:+381658862760" 
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-uvac-dark px-6 py-4 rounded-xl font-bold transition-colors border border-gray-100 shadow-sm"
              >
                <Phone className="w-5 h-5" />
                {t.location.callSupport}
              </a>
              <a 
                href="https://wa.me/381658862760" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-social-whatsapp hover:bg-social-whatsapp-hover text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl overflow-hidden aspect-video border border-stone-200 relative shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2898.018849082935!2d19.926278999999997!3d43.41843289999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757efaea5130991%3A0x2b36bb83993b9c02!2sKrstarenje%20Euro%20Uvac!5e0!3m2!1ssr!2srs!4v1776958686675!5m2!1ssr!2srs" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Krstarenje Uvac Griffon - Google Maps"
              ></iframe>
            </div>
            
            <div className="rounded-xl overflow-hidden relative shadow-md aspect-video">
              <img 
                src="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_700/v1777665114/uvac-meandri.webp" 
                alt="Put do brane Rastoke i polazišta za krstarenje Uvcem" 
                className="w-full h-full object-cover block"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5 text-white" />
                <span className="font-bold text-base sm:text-lg tracking-wide select-none">
                  {lang === 'sr' ? 'Avantura je tu!' : 'Adventure is here!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
