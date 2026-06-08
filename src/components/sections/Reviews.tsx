import React from 'react';
import ReviewSection from '../ReviewSection';
import { translations } from '../../lib/translations';

interface ReviewsProps {
  lang: 'sr' | 'en';
}

export default function Reviews({ lang }: ReviewsProps) {
  const t = translations[lang];

  return (
    <section id="reviews">
      <ReviewSection t={t.reviews} lang={lang} />
    </section>
  );
}
