import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCloudinarySrcSet } from '../../lib/cloudinary';

interface RelatedCardsProps {
  exclude: string;
  lang: 'sr' | 'en';
}

export const RelatedCards: React.FC<RelatedCardsProps> = ({ exclude, lang }) => {
  const allExperiences = [
    {
      title: lang === 'sr' ? 'Beloglavi sup' : 'Griffon Vulture',
      slug: 'beloglavi-sup',
      image: 'https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1778782184/Beloglavi-sup-u-letu.webp',
      description: lang === 'sr' ? 'Nebeski kralj Uvca i najveća ptica Srbije.' : 'The sky king of Uvac and the largest bird in Serbia.'
    },
    {
      title: lang === 'sr' ? 'Kanjon Uvca' : 'Uvac Canyon',
      slug: 'kanjon-uvca',
      image: 'https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665114/vidikovac-ravni-krs-uvac.webp',
      description: lang === 'sr' ? 'Spektakularni meandri skriveni u jugozapadnoj Srbiji.' : 'Spectacular meanders hidden in southwestern Serbia.'
    },
    {
      title: lang === 'sr' ? 'Ledena pećina' : 'Ice Cave',
      slug: 'ledena-pecina',
      image: 'https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_700/v1777665120/ledena-pecina-uvac.webp',
      description: lang === 'sr' ? 'Skriveni dragulj sa stalnom temperaturom od 8°C.' : 'A hidden gem with a constant temperature of 8°C.'
    }
  ];

  const filtered = allExperiences.filter(exp => exp.slug !== exclude);

  return (
    <section className="py-20 bg-surface-page">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">{lang === 'sr' ? 'Istražite više' : 'More to explore'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filtered.map((item, index) => {
            const opt = getCloudinarySrcSet(item.image, [400, 800]);
            return (
              <Link 
                key={item.slug} 
                to={`/${item.slug}`}
                className="group relative h-[400px] overflow-hidden rounded-xl shadow-lg"
              >
                <img 
                  src={opt.src} 
                  srcSet={opt.srcSet}
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 mb-4 font-light">{item.description}</p>
                  <div className="inline-flex items-center text-accent font-medium">
                    {lang === 'sr' ? 'Istraži' : 'Explore'} <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
