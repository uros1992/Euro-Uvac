import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/privacy" element={
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center text-uvac-primary">
            Učitavanje...
          </div>
        }>
          <PrivacyPolicy />
        </Suspense>
      } />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
