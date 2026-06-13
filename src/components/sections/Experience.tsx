import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { translations } from '../../lib/translations';

interface ExperienceProps {
  lang: 'sr' | 'en';
}

export default function Experience({ lang }: ExperienceProps) {
  const t = translations[lang];

  const experienceData = [
    {
      title: t.usp.f1Title,
      desc: t.usp.f1Desc,
      slug: 'beloglavi-sup',
      image: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1778782184/Beloglavi-sup-u-letu.webp",
      srcSet: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_400/v1778782184/Beloglavi-sup-u-letu.webp 400w, https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1778782184/Beloglavi-sup-u-letu.webp 700w"
    },
    {
      title: t.usp.f2Title,
      desc: t.usp.f2Desc,
      slug: 'kanjon-uvca',
      image: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665114/vidikovac-ravni-krs-uvac.webp",
      srcSet: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_400/v1777665114/vidikovac-ravni-krs-uvac.webp 400w, https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665114/vidikovac-ravni-krs-uvac.webp 700w"
    },
    {
      title: t.usp.f3Title,
      desc: t.usp.f3Desc,
      slug: 'ledena-pecina',
      image: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665120/ledena-pecina-uvac.webp",
      srcSet: "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_400/v1777665120/ledena-pecina-uvac.webp 400w, https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665120/ledena-pecina-uvac.webp 700w"
    }
  ];

  return (
    <section id="otkrijte-uvac" className="py-20 bg-surface-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.usp.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t.usp.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experienceData.map((feature, idx) => (
            <Link 
              key={idx}
              to={`/${feature.slug}`}
              className="group relative overflow-hidden rounded-xl h-96 shadow-lg transform transition-all duration-300 hover:-translate-y-1.5 opacity-100 block"
            >
              <img 
                src={feature.image} 
                srcSet={feature.srcSet}
                sizes="(max-width: 768px) 100vw, 33vw"
                alt={idx === 0 ? "Beloglavi sup u letu iznad kanjona Uvca" : idx === 1 ? "Vidikovac Ravni Krš pogled na meandre Uvca" : "Ledeni ukrasi u Ledenoj pećini Uvac"} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm mb-6">{feature.desc}</p>
                
                <div className="mt-2">
                  <span className="inline-flex items-center text-accent font-medium pointer-events-none">
                    {lang === 'sr' ? 'Istražite više' : 'Explore more'}
                    <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
