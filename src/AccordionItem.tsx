import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  reduceMotion?: boolean;
}

export default function AccordionItem({ 
  question, 
  answer, 
  index, 
  isOpen, 
  onToggle,
  reduceMotion = false
}: AccordionItemProps) {
  return (
    <div className={`border rounded-2xl transition duration-300 overflow-hidden ${
      isOpen 
        ? 'border-uvac-accent bg-brand-cream/30 shadow-md' 
        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
    }`}>
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${index}`}
        id={`accordion-btn-${index}`}
      >
        <span className="font-serif font-bold text-gray-900 md:text-lg pr-4 select-none">
          {question}
        </span>
        <div className={`p-1.5 rounded-full transition-all duration-300 ${
          isOpen ? 'bg-uvac-accent text-white rotate-180' : 'bg-gray-100 text-gray-500'
        }`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${index}`}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed max-w-3xl text-sm md:text-base border-t border-gray-100/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
