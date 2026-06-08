import React from 'react';
import { motion } from 'motion/react';

interface ExperienceLeadProps {
  text: string;
}

export const ExperienceLead: React.FC<ExperienceLeadProps> = ({ text }) => {
  return (
    <section className="py-12 md:py-20 bg-surface-page">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-text leading-relaxed text-center font-light italic"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
};
