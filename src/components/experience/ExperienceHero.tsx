import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCloudinarySrcSet } from '../../lib/cloudinary';
import { translations } from '../../lib/translations';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface ExperienceHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
  imagePosition?: string;
  lang?: 'sr' | 'en';
  setIsBookingOpen?: (open: boolean) => void;
}

export const ExperienceHero: React.FC<ExperienceHeroProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  breadcrumbs,
  imagePosition = 'center',
  lang = 'sr',
  setIsBookingOpen
}) => {
  const { srcSet, src } = getCloudinarySrcSet(backgroundImage);
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative h-[65vh] md:h-[70vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={src} 
          srcSet={srcSet}
          sizes="100vw"
          alt={title} 
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black/45 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.nav 
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="breadcrumb" 
          className="mb-6"
        >
          <ol className="flex items-center justify-center space-x-2 text-white/80 text-sm">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                <li>
                  {item.path ? (
                    <Link to={item.path} className="hover:text-accent transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={14} className="text-white/40" />
                )}
              </React.Fragment>
            ))}
          </ol>
        </motion.nav>

        <motion.h1 
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>

        {setIsBookingOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-uvac-accent hover:bg-brand-gold text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform active:translate-y-0 flex items-center gap-2 justify-center cursor-pointer w-fit sm:w-auto sm:whitespace-nowrap"
            >
              {lang === 'sr' ? 'Rezerviši krstarenje' : t.hero.checkAvail} <ChevronRight className="w-5 h-5" />
            </button>
            <Link 
              to={lang === 'en' ? '/#tour' : '/#tura'}
              className="bg-white/11 hover:bg-white/20 text-white border border-white/25 px-6 py-3 rounded-full font-bold text-lg transition-all w-fit sm:w-auto justify-center text-center backdrop-blur-sm shadow-md sm:whitespace-nowrap"
            >
              {t.hero.viewTours}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
