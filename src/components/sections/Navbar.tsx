import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../../lib/translations';

interface NavbarProps {
  isScrolled: boolean;
  lang: 'sr' | 'en';
  setLang: (lang: 'sr' | 'en') => void;
  setIsBookingOpen: (open: boolean) => void;
}

export default function Navbar({ isScrolled, lang, setLang, setIsBookingOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpDropdownOpen, setIsExpDropdownOpen] = useState(false);
  const [isExpAccordionOpen, setIsExpAccordionOpen] = useState(false);
  const [isTourDropdownOpen, setIsTourDropdownOpen] = useState(false);
  const [isTourAccordionOpen, setIsTourAccordionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tourDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const t = translations[lang];
  const location = useLocation();
  const normalizedPath = location.pathname.endsWith('/') && location.pathname !== '/' 
    ? location.pathname.slice(0, -1) 
    : location.pathname;
  
  // List of routes that start with a full-screen hero image and should have a transparent navbar at the top
  const heroRoutes = [
    '/', 
    '/iskustvo', 
    '/beloglavi-sup', 
    '/kanjon-uvca', 
    '/ledena-pecina',
    '/tura'
  ];
  const isHeroPage = heroRoutes.includes(normalizedPath);

  const handleLangChange = (newLang: 'sr' | 'en') => {
    setLang(newLang);
    localStorage.setItem('uvac-lang', newLang);
  };

  const experienceLinks = [
    { name: t.usp.f1Title, path: '/beloglavi-sup' },
    { name: t.usp.f2Title, path: '/kanjon-uvca' },
    { name: t.usp.f3Title, path: '/ledena-pecina' },
  ];

  const navLinks = [
    { name: t.nav.location, path: '/#location' },
    { name: t.nav.reviews, path: '/recenzije' },
  ];

  const handleTourClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const hash = lang === 'en' ? '#tour' : '#tura';
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      navigate('/' + hash);
      const el = document.getElementById('tour-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsTourDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpDropdownOpen(false);
      }
      if (tourDropdownRef.current && !tourDropdownRef.current.contains(event.target as Node)) {
        setIsTourDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHeroPage ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo(0, 0)}>
          <img 
            src="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_220/v1777665116/uvac-griffon.webp" 
            alt="Uvac Griffon - Krstarenje Uvcem" 
            className={`h-14 sm:h-16 w-auto object-contain transition-all duration-300 drop-shadow-md ${(isScrolled || !isHeroPage) ? '' : 'brightness-0 invert'}`}
          />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Special "Iskustvo" Dropdown */}
          <div 
            className="relative group" 
            ref={dropdownRef}
            onMouseEnter={() => setIsExpDropdownOpen(true)}
            onMouseLeave={() => setIsExpDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <Link 
                to="/#iskustvo"
                className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90'}`}
              >
                {t.nav.experience}
              </Link>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isExpDropdownOpen ? 'rotate-180' : ''} ${isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90'}`}
              />
            </div>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 transition-all duration-200 origin-top ${isExpDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="bg-white shadow-dropdown rounded-lg py-2 min-w-[280px] overflow-hidden border border-gray-100">
                {experienceLinks.map((sublink) => (
                  <Link
                    key={sublink.path}
                    to={sublink.path}
                    className="block px-6 py-3 text-text hover:bg-accent/10 hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-accent"
                    onClick={() => setIsExpDropdownOpen(false)}
                  >
                    {sublink.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Special "Tura" Dropdown */}
          <div 
            className="relative group" 
            ref={tourDropdownRef}
            onMouseEnter={() => setIsTourDropdownOpen(true)}
            onMouseLeave={() => setIsTourDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <Link 
                to={lang === 'en' ? '/#tour' : '/#tura'}
                onClick={handleTourClick}
                className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90'}`}
              >
                {t.nav.tours}
              </Link>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isTourDropdownOpen ? 'rotate-180' : ''} ${isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90'}`}
              />
            </div>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-2 transition-all duration-200 origin-top ${isTourDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="bg-white shadow-dropdown rounded-lg py-2 min-w-[280px] overflow-hidden border border-gray-100">
                <Link
                  to="/tura"
                  className="block px-6 py-3 text-text hover:bg-accent/10 hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-accent"
                  onClick={() => setIsTourDropdownOpen(false)}
                >
                  {lang === 'sr' ? 'Krstarenje Uvcem' : 'Uvac Cruise'}
                </Link>
              </div>
            </div>
          </div>

          {navLinks.map((link) => {
            if (link.path === '/#location') {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90'}`}
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => 
                  `font-medium transition-colors hover:text-uvac-accent ${isActive ? 'text-uvac-accent' : (isScrolled || !isHeroPage ? 'text-gray-600' : 'text-white/90')}`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
          
          <div className="flex items-center gap-4 border-l border-gray-300/30 pl-4">
            <div className={`flex items-center gap-2 rounded-full p-1 ${isScrolled || !isHeroPage ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'}`}>
              <button 
                onClick={() => handleLangChange('sr')}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${lang === 'sr' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled || !isHeroPage ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
              >
                SR
              </button>
              <button 
                onClick={() => handleLangChange('en')}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled || !isHeroPage ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
              >
                EN
              </button>
            </div>
            
            <Link 
              to="/admin"
              className={`transition-colors font-medium flex items-center gap-2 ${isScrolled || !isHeroPage ? 'text-gray-500 hover:text-uvac-dark' : 'text-white/90 hover:text-white'}`}
              title={t.nav.profileTitle}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">{t.nav.myBookings}</span>
            </Link>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-uvac-accent hover:bg-brand-gold text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.nav.book}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <div className={`flex items-center gap-1 rounded-full p-1.5 ${isScrolled || !isHeroPage ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'}`}>
            <button 
              onClick={() => handleLangChange('sr')}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang === 'sr' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled || !isHeroPage ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
            >
              SR
            </button>
            <button 
              onClick={() => handleLangChange('en')}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled || !isHeroPage ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
            >
              EN
            </button>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHeroPage ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHeroPage ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center gap-2 transition-all duration-300 ease-in-out">
          {/* Mobile "Iskustvo" Accordion */}
          <div className="w-full flex flex-col items-center">
            <button 
              onClick={() => setIsExpAccordionOpen(!isExpAccordionOpen)}
              className="w-full flex items-center justify-center gap-2 min-h-[44px] py-3 font-medium text-gray-800"
            >
              <span>{t.nav.experience}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isExpAccordionOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`w-full bg-gray-50 flex flex-col items-center overflow-hidden transition-all duration-300 ${isExpAccordionOpen ? 'max-h-60 py-2' : 'max-h-0'}`}>
              <Link 
                to="/#iskustvo" 
                className="min-h-[44px] flex items-center justify-center w-full py-2 text-gray-600 text-sm hover:bg-gray-100/50"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsExpAccordionOpen(false);
                }}
              >
                {lang === 'sr' ? 'Šta ćete otkriti na krstarenju' : 'Wonders Awaiting You'}
              </Link>
              {experienceLinks.map((sublink) => (
                <Link
                  key={sublink.path}
                  to={sublink.path}
                  className="min-h-[44px] flex items-center justify-center py-3 text-gray-800 font-medium w-full text-center hover:bg-gray-100"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsExpAccordionOpen(false);
                  }}
                >
                  {sublink.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile "Tura" Accordion */}
          <div className="w-full flex flex-col items-center">
            <button 
              onClick={() => setIsTourAccordionOpen(!isTourAccordionOpen)}
              className="w-full flex items-center justify-center gap-2 min-h-[44px] py-3 font-medium text-gray-800"
            >
              <span>{t.nav.tours}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isTourAccordionOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`w-full bg-gray-50 flex flex-col items-center overflow-hidden transition-all duration-300 ${isTourAccordionOpen ? 'max-h-60 py-2' : 'max-h-0'}`}>
              <button 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setIsTourAccordionOpen(false);
                  handleTourClick(e);
                }}
                className="min-h-[44px] flex items-center justify-center py-2 text-gray-600 text-sm w-full text-center hover:bg-gray-100 block"
              >
                {lang === 'sr' ? 'Vaša avantura' : 'Your Adventure'}
              </button>
              <Link
                to="/tura"
                className="min-h-[44px] flex items-center justify-center py-3 text-gray-800 font-medium w-full text-center hover:bg-gray-100 block"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTourAccordionOpen(false);
                }}
              >
                {lang === 'sr' ? 'Krstarenje Uvcem' : 'Uvac Cruise'}
              </Link>
            </div>
          </div>

          {navLinks.map((link) => {
            if (link.path === '/#location') {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-medium transition-colors text-gray-800 min-h-[44px] py-3 w-full text-center hover:bg-gray-50 flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => 
                  `font-medium transition-colors min-h-[44px] py-3 w-full text-center hover:bg-gray-50 flex items-center justify-center ${isActive ? 'text-uvac-accent' : 'text-gray-800'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            );
          })}
          <div className="w-11/12 h-px bg-gray-100 my-2"></div>
          <div className="flex justify-center items-center gap-6 w-full">
            <Link 
              to="/admin"
              className="text-gray-500 hover:text-uvac-dark font-medium flex items-center justify-center gap-2 px-4 py-2 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>{t.nav.myBookings}</span>
            </Link>
          </div>
          <button 
            onClick={() => {
              setIsBookingOpen(true);
              setMobileMenuOpen(false);
            }}
            className="bg-uvac-accent hover:bg-brand-gold text-white px-8 py-3 rounded-full font-bold w-11/12 transition-all shadow-md min-h-[44px] flex items-center justify-center"
          >
            {t.nav.book}
          </button>
        </div>
      )}
    </nav>
  );
}
