import React from 'react';
import { motion } from 'motion/react';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface InfoBoxProps {
  variant?: 'tip' | 'warning' | 'info';
  title: string;
  children: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ variant = 'info', title, children }) => {
  const configs = {
    tip: {
      icon: <Lightbulb className="text-[#c9a24a]" />,
      bg: 'bg-[#c9a24a]',
      border: 'border-[#c9a24a]/20',
      textColor: 'text-white',
      titleColor: 'text-white'
    },
    warning: {
      icon: <AlertTriangle className="text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100',
      textColor: 'text-text/80',
      titleColor: 'text-text'
    },
    info: {
      icon: <Info className="text-primary" />,
      bg: 'bg-primary/5',
      border: 'border-primary/20',
      textColor: 'text-text/80',
      titleColor: 'text-text'
    }
  };

  const config = configs[variant];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-8 md:p-10 rounded-xl border ${config.border} ${config.bg} max-w-4xl mx-auto my-12`}
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-white rounded-full shadow-sm">
          {config.icon}
        </div>
        <h3 className={`text-2xl font-serif ${config.titleColor}`}>{title}</h3>
      </div>
      <div className={`${config.textColor} leading-relaxed text-lg italic`}>
        {children}
      </div>
    </motion.div>
  );
};
