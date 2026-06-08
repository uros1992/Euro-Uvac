import React, { ReactNode } from 'react';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

interface LayoutProps {
  children: ReactNode;
  isScrolled: boolean;
  setIsScrolled: (val: boolean) => void;
  lang: 'sr' | 'en';
  setLang: (lang: 'sr' | 'en') => void;
  setIsBookingOpen: (open: boolean) => void;
}

export default function Layout({ 
  children, 
  isScrolled, 
  setIsScrolled, 
  lang, 
  setLang,
  setIsBookingOpen
}: LayoutProps) {
  return (
    <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden">
      <Navbar 
        isScrolled={isScrolled} 
        lang={lang} 
        setLang={setLang} 
        setIsBookingOpen={setIsBookingOpen} 
      />
      <main>{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
