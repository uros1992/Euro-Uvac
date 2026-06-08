import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy load components
const BookingModal = lazy(() => import('./components/BookingModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const TourPage = lazy(() => import('./pages/TourPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));

// Specific Experience Spoke Pages
const BeloglaviSup = lazy(() => import('./pages/experience/BeloglaviSup'));
const KanjonUvca = lazy(() => import('./pages/experience/KanjonUvca'));
const LedenaPecina = lazy(() => import('./pages/experience/LedenaPecina'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ImageCreditsPage = lazy(() => import('./pages/ImageCreditsPage'));

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
            <Route path="/" element={<Home lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/iskustvo" element={<ExperiencePage lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            
            {/* Experience Spoke Pages */}
            <Route path="/iskustvo/beloglavi-sup" element={<BeloglaviSup lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/iskustvo/kanjon-uvca" element={<KanjonUvca lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/iskustvo/ledena-pecina" element={<LedenaPecina lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            
            <Route path="/tura" element={<TourPage lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
            <Route path="/recenzije" element={<ReviewsPage lang={lang} setIsBookingOpen={setIsBookingOpen} />} />
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
