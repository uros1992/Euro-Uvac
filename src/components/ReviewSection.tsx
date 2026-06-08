import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReviews } from '../context/ReviewsContext';

export default function ReviewSection(
  { t, lang }: { t: any, lang: string }
) {
  const { reviews, loaded } = useReviews();
  const loading = !loaded;
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Carousel and responsive state
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeHeight, setActiveHeight] = useState<number | undefined>(undefined);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleCount = windowWidth >= 1024 ? 3 : (windowWidth >= 640 ? 2 : 1);

  // Divide the limited (or all) reviews into chunks
  const displayedReviews = reviews.slice(0, 9);
  
  const chunkReviews = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groups = chunkReviews(displayedReviews, visibleCount);

  // Auto scroll bounds adjustment
  useEffect(() => {
    if (currentGroupIndex >= groups.length && groups.length > 0) {
      setCurrentGroupIndex(groups.length - 1);
    }
  }, [groups.length, currentGroupIndex]);

  // Height dynamic adjustment
  useEffect(() => {
    const el = groupRefs.current[currentGroupIndex];
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        setActiveHeight(entries[0].contentRect.height);
      }
    });
    observer.observe(el);
    setActiveHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, [currentGroupIndex, reviews, loaded, visibleCount]);

  const prevGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const nextGroup = () => {
    if (currentGroupIndex < groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };

  // Dynamic average and count calculations
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 
    ? Math.round((reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviewsCount) * 10) / 10 
    : 0;

  const getReviewWordSr = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'recenzija';
    }
    if (lastDigit === 1) {
      return 'recenziji';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'recenzije';
    }
    return 'recenzija';
  };

  const renderAverageStars = (avg: number) => {
    return (
      <div className="flex gap-1 text-yellow-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const fillAmount = Math.max(0, Math.min(1, avg - (starIndex - 1)));
          return (
            <div key={starIndex} className="relative w-6 h-6 flex-shrink-0">
              <Star className="w-6 h-6 text-stone-200" />
              <div 
                className="absolute top-0 left-0 overflow-hidden h-full" 
                style={{ width: `${fillAmount * 100}%` }}
              >
                <Star className="w-6 h-6 fill-current text-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim() || 
        newRating < 1 || newRating > 5) return;
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
      setCurrentGroupIndex(0); // Reset to page 1 to see the new review
    } catch (err) {
      console.error(err);
      setSubmitError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showControls = groups.length > 1 && !loading;

  return (
    <section id="reviews" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Title and Subtitle */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-serif font-bold text-uvac-dark mb-4">{t.title}</h2>
            <p className="text-lg text-gray-600">{t.subtitle}</p>
          </div>
        </div>

        {/* Dynamic Summary Bar */}
        {!loading && totalReviewsCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-4 px-8 mb-12 bg-white rounded-2xl sm:rounded-full border border-stone-200 shadow-sm max-w-xl mx-auto text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-serif text-uvac-dark leading-none">{averageRating.toFixed(1)}</span>
              {renderAverageStars(averageRating)}
            </div>
            <div className="hidden sm:block w-px h-8 bg-stone-200" />
            <div className="text-stone-600 font-medium tracking-wide">
              {lang === 'sr' 
                ? `Zasnovano na ${totalReviewsCount} ${getReviewWordSr(totalReviewsCount)}` 
                : `Based on ${totalReviewsCount} ${totalReviewsCount === 1 ? 'review' : 'reviews'}`
              }
            </div>
          </div>
        )}

        {/* Carousel Wrapper with Dynamic Outside Overlapping Navigation Controls */}
        <div className="relative mb-16 px-4 md:px-12">
          {showControls && (
            <>
              <button 
                onClick={prevGroup}
                disabled={currentGroupIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md focus:outline-none"
                aria-label={lang === 'sr' ? 'Prethodna stranica' : 'Previous page'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextGroup}
                disabled={currentGroupIndex === groups.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md focus:outline-none"
                aria-label={lang === 'sr' ? 'Sledeća stranica' : 'Next page'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-500 italic">
              {lang === 'sr' ? 'Učitavanje recenzija...' : 'Loading reviews...'}
            </div>
          ) : groups.length === 0 ? (
            <div className="py-12 text-center text-gray-500 italic">
              {lang === 'sr' ? 'Nema dostupnih recenzija.' : 'No reviews available.'}
            </div>
          ) : (
            <div 
              className="relative overflow-hidden w-full transition-all duration-300"
              style={{ height: activeHeight ? `${activeHeight}px` : 'auto' }}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out items-start"
                style={{ transform: `translateX(-${currentGroupIndex * 100}%)` }}
              >
                {groups.map((group, groupIndex) => (
                  <div 
                    key={groupIndex}
                    ref={(el) => { groupRefs.current[groupIndex] = el; }}
                    className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch px-1 pb-4 pt-2"
                  >
                    {group.map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]"
                      >
                        <div>
                          <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                        </div>
                        
                        <div>
                          <div className="font-bold text-uvac-dark">{review.name}</div>
                          {(review.dateSr || review.dateEn) && (
                            <p className="text-sm text-gray-400 mt-0.5">
                              {lang === 'sr' ? review.dateSr : review.dateEn}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-stone-100">
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
                style={{ fontSize: '16px' }}
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
                style={{ fontSize: '16px' }}
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
