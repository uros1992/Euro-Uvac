import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { ReviewsProvider } from './ReviewsContext';

// Helper function to retry lazy loading chunks when a new deployment renders them obsolete
function lazyWithRetry<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(() =>
    importFn().catch((error) => {
      const errorMsg = error?.message || '';
      const isChunkError = 
        errorMsg.includes('Failed to fetch') ||
        errorMsg.includes('ChunkLoadError') ||
        errorMsg.includes('Loading chunk') ||
        errorMsg.includes('dynamically imported module') ||
        errorMsg.includes('error loading');
      
      if (isChunkError) {
        const lastReload = sessionStorage.getItem('chunk_error_reload');
        const timeNow = Date.now();
        if (!lastReload || timeNow - parseInt(lastReload, 10) > 10000) {
          sessionStorage.setItem('chunk_error_reload', timeNow.toString());
          window.location.reload();
          return new Promise(() => {}); // Return a pending promise to prevent rendering broken state before reload
        }
      }
      throw error;
    })
  );
}

// Lazy load components
const BookingModal = lazyWithRetry(() => import('./components/BookingModal'));
const AdminDashboard = lazyWithRetry(() => import('./components/AdminDashboard'));
const TourPage = lazyWithRetry(() => import('./pages/TourPage'));
const ReviewsPage = lazyWithRetry(() => import('./pages/ReviewsPage'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));
const ExperiencePage = lazyWithRetry(() => import('./pages/ExperiencePage'));

// Specific Experience Spoke Pages
const BeloglaviSup = lazyWithRetry(() => import('./pages/BeloglaviSup'));
const KanjonUvca = lazyWithRetry(() => import('./pages/KanjonUvca'));
const LedenaPecina = lazyWithRetry(() => import('./pages/LedenaPecina'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'));
const ImageCreditsPage = lazyWithRetry(() => import('./pages/ImageCreditsPage'));

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<'sr' | 'en'>('sr');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();

  // Handle scroll to hash on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        let hashValue = location.hash.slice(1);
        if (hashValue === 'tour' || hashValue === 'tura') {
          hashValue = 'tour-section';
        }
        const element = document.getElementById(hashValue);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Language persistent state
  useEffect(() => {
    const saved = localStorage.getItem('uvac-lang');
    if (saved === 'sr' || saved === 'en') setLang(saved);
  }, []);

  // Synchronize document language attribute with language state (BCP 47 language code)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll visibility logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PageFallback = <div className="h-screen flex items-center justify-center text-primary font-serif italic">Učitavanje...</div>;

  return (
    <>
      <Layout 
        isScrolled={isScrolled} 
        setIsScrolled={setIsScrolled}
        lang={lang} 
        setLang={setLang}
        setIsBookingOpen={setIsBookingOpen}
      >
        <Suspense fallback={PageFallback}>
          <Routes>
            <Route path="/" element={
              <ReviewsProvider>
                <Home lang={lang} setIsBookingOpen={setIsBookingOpen} />
              </ReviewsProvider>
            } />
            <Route path="/iskustvo" element={<ExperiencePage lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            
            {/* Experience Spoke Pages */}
            <Route path="/beloglavi-sup" element={<BeloglaviSup lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/kanjon-uvca" element={<KanjonUvca lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/ledena-pecina" element={<LedenaPecina lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            
            <Route path="/tura" element={<TourPage lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/recenzije" element={
              <ReviewsProvider>
                <ReviewsPage lang={lang} setIsBookingOpen={setIsBookingOpen} />
              </ReviewsProvider>
            } />
            <Route path="/privacy" element={<PrivacyPolicy lang={lang} />} />
            <Route path="/image-credits" element={<ImageCreditsPage lang={lang} />} />
            <Route path="/admin" element={
              <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-serif italic">Učitavanje...</div>}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="*" element={<NotFound lang={lang} />} />
          </Routes>
        </Suspense>
      </Layout>

      <Suspense fallback={null}>
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          lang={lang} 
        />
      </Suspense>
    </>
  );
}
