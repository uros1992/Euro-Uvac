import React from 'react';
import { motion } from 'motion/react';
import { getCloudinarySrcSet } from '../../lib/cloudinary';

interface GalleryProps {
  images: string[];
  title?: string;
  intro?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, title, intro }) => {
  return (
    <section className="py-16 md:py-24 bg-bg">
      <div className="container mx-auto px-4">
        {(title || intro) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-serif mb-4 text-text-primary">{title}</h2>}
            {intro && <p className="text-lg text-text-muted leading-relaxed font-light">{intro}</p>}
          </div>
        )}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => {
            const opt = getCloudinarySrcSet(image, [400, 800]);
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <img 
                  src={opt.src} 
                  srcSet={opt.srcSet}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  alt={`Galerija ${index + 1}`} 
                  className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
