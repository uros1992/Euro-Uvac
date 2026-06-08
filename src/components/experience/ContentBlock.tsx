import React from 'react';
import { motion } from 'motion/react';
import { getCloudinarySrcSet } from '../../lib/cloudinary';

interface ContentBlockProps {
  layout?: 'text-image' | 'image-text' | 'full-width';
  title?: string;
  text: string | React.ReactNode;
  image?: string | string[];
  dark?: boolean;
  bgVariant?: 'white' | 'sand' | 'dark' | 'bg';
  children?: React.ReactNode;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ 
  layout = 'text-image', 
  title, 
  text, 
  image, 
  dark = false, 
  bgVariant,
  children 
}) => {
  const isImageRight = layout === 'text-image';
  const isFullWidth = layout === 'full-width';

  const getBgClass = () => {
    if (bgVariant === 'sand') return 'bg-uvac-sand text-text';
    if (bgVariant === 'bg') return 'bg-bg text-text';
    if (bgVariant === 'dark' || dark) return 'bg-primary text-white';
    if (bgVariant === 'white') return 'bg-surface-page text-text';
    return dark ? 'bg-primary text-white' : 'bg-surface-page text-text';
  };

  const bgClass = getBgClass();

  if (isFullWidth) {
    return (
      <section className={`py-16 md:py-24 ${bgClass}`}>
        <div className="container mx-auto px-4 text-center">
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif mb-8 max-w-3xl mx-auto"
            >
              {title}
            </motion.h2>
          )}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {typeof text === 'string' ? <p>{text}</p> : text}
          </motion.div>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isImageRight ? '' : 'lg:flex-row-reverse'}`}>
          <motion.div 
            initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`order-2 ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {title && <h2 className="text-3xl md:text-4xl font-serif mb-6">{title}</h2>}
            <div className="text-lg opacity-90 leading-relaxed space-y-4">
              {typeof text === 'string' ? <p>{text}</p> : text}
            </div>
            {children}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`order-1 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {Array.isArray(image) ? (
              <div className="grid grid-cols-2 gap-4">
                {image.map((img, idx) => {
                  const opt = getCloudinarySrcSet(img, [400, 800]);
                  return (
                    <img 
                      key={idx} 
                      src={opt.src} 
                      srcSet={opt.srcSet}
                      sizes="(max-width: 768px) 100vw, 400px"
                      alt={`${title} ${idx + 1}`} 
                      className={`rounded-lg shadow-xl w-full h-64 object-cover ${idx === 2 ? 'col-span-2' : ''}`}
                      loading="lazy"
                      decoding="async"
                      width={idx === 2 ? 800 : 400}
                      height={idx === 2 ? 500 : 256}
                    />
                  );
                })}
              </div>
            ) : (
              image && (() => {
                const opt = getCloudinarySrcSet(image, [500, 800, 1200]);
                return (
                  <img 
                    src={opt.src} 
                    srcSet={opt.srcSet}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    alt={title} 
                    className="rounded-lg shadow-2xl w-full object-cover max-h-[500px]"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                  />
                );
              })()
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
