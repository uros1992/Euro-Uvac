import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  dateSr?: string;
  dateEn?: string;
}

export default function ReviewSection({ t, lang }: { t: any, lang: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formatReviewDate = (timestamp: any) => {
    const date = timestamp ? timestamp.toDate() : new Date();
    const monthsSR = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return {
      sr: `${monthsSR[date.getMonth()]} ${date.getFullYear()}.`,
      en: `${monthsEN[date.getMonth()]} ${date.getFullYear()}`
    };
  };

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews: Review[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const formattedDate = formatReviewDate(data.createdAt);
        fetchedReviews.push({
          id: doc.id,
          name: data.name,
          text: data.text,
          rating: data.rating,
          dateSr: formattedDate.sr,
          dateEn: formattedDate.en
        });
      });
      setReviews(fetchedReviews);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim() || newRating < 1 || newRating > 5) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      await addDoc(collection(db, 'reviews'), {
        name: newName.trim(),
        text: newText.trim(),
        rating: newRating,
        createdAt: serverTimestamp()
      });
      setNewName('');
      setNewText('');
      setNewRating(5);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setSubmitError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-uvac-dark mb-4">{t.title}</h2>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Existing / Fetched Reviews */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reviews.slice(0, 9).map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
              <div className="font-bold text-uvac-dark">{review.name}</div>
              {(review.dateSr || review.dateEn) && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {lang === 'sr' ? review.dateSr : review.dateEn}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h3 className="text-2xl font-serif font-bold text-uvac-dark mb-6 text-center">{t.leaveReview}</h3>
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium">
              {t.success}
            </div>
          )}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-center font-medium">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                maxLength={50}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-uvac-accent text-gray-800"
              />
            </div>
            <div>
              <textarea
                placeholder={t.reviewPlaceholder}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
                maxLength={1000}
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-uvac-accent text-gray-800 resize-none"
              ></textarea>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`focus:outline-none transition-colors ${star <= newRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-uvac-primary hover:bg-uvac-light text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
