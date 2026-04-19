import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bird, 
  Camera, 
  Map, 
  ShieldCheck, 
  Star, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  X,
  Anchor,
  Globe,
  MapPin,
  Car,
  Navigation,
  Phone,
  User
} from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import ReviewSection from './components/ReviewSection';

// Image imports
// Assets loaded externally via GitHub CDN

const translations = {
  sr: {
    nav: { tours: "Tura", experience: "Iskustvo", reviews: "Recenzije", location: "Kako do nas", book: "Rezerviši", profileTitle: "Moje rezervacije / Admin", myBookings: "Moje rezervacije" },
    hero: {
      badge: "SRPSKO ČUDO PRIRODE",
      title: "Doživite netaknutu lepotu Uvca",
      subtitle: "Krstarite veličanstvenim meandrima, istražite skrivenu ledenu pećinu i posmatrajte let retkog beloglavog supa.",
      checkAvail: "Proveri dostupnost",
      viewTours: "Pogledaj ponudu ture",
      reviews: "4.9/5 od 2.000+ recenzija"
    },
    usp: {
      title: "Zašto krstariti sa nama?",
      subtitle: "Pružamo autentično, bezbedno i nezaboravno iskustvo na reci Uvac.",
      f1Title: "Kolonija beloglavih supova",
      f1Desc: "Približite se najvećoj koloniji ovih veličanstvenih ptica na Balkanu. San svakog fotografa.",
      f2Title: "Panoramski vidikovci",
      f2Desc: "Otkrijte Ravni Krš i Veliki Vrh, gde vas očekuju nezaboravni panoramski pogledi na uvačke meandre.",
      f3Title: "Ledena pećina",
      f3Desc: "Otkrijte magični svet ledenih ukrasa i skrivenih dvorana uz pratnju iskusnih vodiča."
    },
    tours: {
      title: "Vaša avantura",
      subtitle: "Doživite Uvac i njegove meandre, posetite Ledenu pećinu i uživajte u jednom od najlepših pogleda u Srbiji. Krstarenja su dostupna tokom sezone od 1. maja do 31. oktobra, uz svakodnevne polaske u 13:00 časova (osim ponedeljkom).",
      t1Title: "Spremni za avanturu?",
      t1Price: "€35",
      t1OldPrice: "€45",
      t1Unit: "/osobi",
      t1Duration: "4-5 Sati",
      t1Max: "Maks. 12",
      t1F1: "Krstarenje meandrima",
      t1F2: "Poseta Ledenoj pećini",
      t1F3: "Pešačenje do vidikovca",
      t1F4: "Posmatranje beloglavih supova",
      selectDate: "Izaberi datum",
      t2Title: "Zora za fotografe",
      t2Price: "€65",
      t2Unit: "/osobi",
      t2Duration: "4 Sata",
      t2Max: "Zlatni sat",
      t2F1: "Polazak rano ujutru",
      t2F2: "Pešačenje do vidikovca Molitva",
      t2F3: "Produženo vreme za fotografisanje ptica"
    },
    reviews: {
      title: "Šta kažu naši gosti",
      subtitle: "Pridružite se mnogim zadovoljnim putnicima koji su sa nama otkrili magiju Uvca.",
      r1Name: "Elena",
      r1Text: "Nestvarno iskustvo! Vodič je bio fantastičan, a pogled na meandre i beloglave supove ostavlja bez daha. Preporuka svima!",
      r2Name: "Marko",
      r2Text: "Odlična organizacija, udoban čamac i prelepa priroda. Ledena pećina je bila poseban doživljaj. Vredi svakog dinara.",
      r3Name: "Ana",
      r3Text: "Savršen vikend beg iz grada. Priroda je netaknuta, a domaćini su izuzetno ljubazni. Sigurno ćemo se vratiti.",
      leaveReview: "Ostavi ocenu",
      namePlaceholder: "Tvoje ime",
      reviewPlaceholder: "Podeli svoje iskustvo sa nama...",
      submit: "Objavi recenziju",
      submitting: "Objavljivanje...",
      success: "Hvala! Vaša recenzija je objavljena.",
      error: "Došlo je do greške."
    },
    location: {
      title: "Kako do nas",
      subtitle: "Dolazak do srca Specijalnog rezervata prirode Uvac je lakši nego što mislite. Vaše putovanje će vas provesti kroz neke od najlepših predela u Srbiji — a konačna destinacija je apsolutno vredna toga.",
      meetingPoint: "Mesto polaska na krstarenje",
      meetingPointDesc: "Sve ture polaze sa brane na Uvačkom jezeru (područje Rastoka), koja je zvanično mesto sastanka za krstarenja.",
      fromZlatibor: "Iz Nove Varoši",
      fromZlatiborDesc: "Na samom ulazu u Novu Varoš skrenite levo i pratite put kroz sela Akmačići i Komarani (oko 11,5 km) sve do Uvačkog jezera.",
      fromBelgrade: "Iz Beograda / Novog Sada (3.5 - 4.5 sata)",
      fromBelgradeDesc: "Pratite autoput E763 (Miloš Veliki) ka Čačku i Požegi, zatim nastavite magistralnim putem za Užice, Zlatibor i Novu Varoš. Put je dobro obeležen.",
      openMap: "Otvori na Google Mapi",
      callSupport: "Pozovite za pomoć",
      bookTour: "Rezervišite turu",
      scenicRoute: "Ruta do rezervata"
    },
    cta: {
      title: "Spremni za vrhunac vašeg putovanja po Srbiji?",
      subtitle: "Mesta su strogo ograničena radi zaštite prirodnog staništa. Rezervišite unapred da osigurate svoje mesto.",
      btn: "Proveri dostupnost i rezerviši",
      cancel: "Otkazivanje moguće do 24 sata pre polaska putem sekcije",
      cancelLink: "Moje rezervacije",
      cancelSuffix: "."
    },
    footer: {
      desc: "Pružamo nezaboravne ture čamcem kroz veličanstvene meandre reke Uvac od 2021. godine.",
      linksTitle: "Brzi linkovi",
      l1: "Iskustvo",
      l2: "Tura",
      l3: "Recenzije",
      l4: "Kako do nas",
      contactTitle: "Kontakt",
      c1: "Nova Varoš, Srbija"
    }
  },
  en: {
    nav: { tours: "Tour", experience: "The Experience", reviews: "Reviews", location: "How to Reach Us", book: "Book Now", profileTitle: "My Bookings / Admin", myBookings: "My Bookings" },
    hero: {
      badge: "SERBIA'S NATURAL WONDER",
      title: "Experience the Untouched Beauty of Uvac",
      subtitle: "Cruise through majestic meanders, explore hidden ice cave, and witness the flight of the rare Griffon Vulture.",
      checkAvail: "Check Availability",
      viewTours: "View Tour Option",
      reviews: "4.9/5 from 2,000+ reviews"
    },
    usp: {
      title: "Why Cruise With Us?",
      subtitle: "We provide an authentic, safe and unforgettable experience on the Uvac river.",
      f1Title: "Griffon Vulture Colony",
      f1Desc: "Get up close to the largest colony of these majestic birds in the Balkans. A photographer's dream.",
      f2Title: "Panoramic Viewpoints",
      f2Desc: "Discover Ravni Krš and Veliki Vrh, where unforgettable panoramic views of the Uvac meanders await.",
      f3Title: "Ledena pećina (Ice Cave)",
      f3Desc: "Discover a magical world of icy formations and hidden chambers, with the help of experienced guides."
    },
    tours: {
      title: "Your Adventure",
      subtitle: "Experience Uvac and its meanders, visit the Ice Cave and enjoy one of the most beautiful views in Serbia. Cruises are available during the season from May 1 to October 31, with daily departures at 1:00 p.m. (except Mondays).",
      t1Title: "Ready for adventure?",
      t1Price: "€35",
      t1OldPrice: "€45",
      t1Unit: "/pp",
      t1Duration: "4-5 Hours",
      t1Max: "Max 12",
      t1F1: "Cruise through the meanders",
      t1F2: "Ice Cave visit",
      t1F3: "Hiking to the viewpoint",
      t1F4: "Griffon Vulture spotting",
      selectDate: "Select Date",
      t2Title: "Photographer's Dawn",
      t2Price: "€65",
      t2Unit: "/pp",
      t2Duration: "4 Hours",
      t2Max: "Golden Hour",
      t2F1: "Early morning departure",
      t2F2: "Hike to Molitva viewpoint",
      t2F3: "Extended time for bird photography"
    },
    reviews: {
      title: "What Our Guests Say",
      subtitle: "Join many satisfied travelers who have discovered the magic of Uvac with us.",
      r1Name: "Elena",
      r1Text: "Unreal experience! The guide was fantastic, and the view of the meanders and griffon vultures is breathtaking. Highly recommended!",
      r2Name: "Marko",
      r2Text: "Great organization, comfortable boat, and beautiful nature. The Ice Cave was a special treat. Worth every penny.",
      r3Name: "Ana",
      r3Text: "Perfect weekend getaway from the city. The nature is untouched, and the hosts are extremely kind. We will definitely come back.",
      leaveReview: "Leave a review",
      namePlaceholder: "Your name",
      reviewPlaceholder: "Share your experience with us...",
      submit: "Post review",
      submitting: "Posting...",
      success: "Thank you! Your review has been posted.",
      error: "An error occurred."
    },
    location: {
      title: "How to Reach Us",
      subtitle: "Getting to the heart of the Uvac Nature Reserve is easier than you think. Your journey will take you through some of the most beautiful landscapes in Serbia—and the final destination is absolutely worth it.",
      meetingPoint: "Cruise Departure Point",
      meetingPointDesc: "All tours depart from the dam on Uvac Lake (Rastoke area), which is the official meeting point for cruises.",
      fromZlatibor: "From Nova Varoš",
      fromZlatiborDesc: "At the very entrance to Nova Varoš, turn left and follow the road through the villages of Akmačići and Komarani (about 11.5 km) all the way to Uvac Lake.",
      fromBelgrade: "From Belgrade / Novi Sad (3.5 - 4.5 hours)",
      fromBelgradeDesc: "Follow the E763 highway (Miloš Veliki) towards Čačak and Požega, then continue on main road to Užice, Zlatibor and Nova Varoš. The route is well-marked.",
      openMap: "Open in Google Maps",
      callSupport: "Call for Support",
      bookTour: "Book a Tour",
      scenicRoute: "Scenic route to the reserve"
    },
    cta: {
      title: "Ready for the highlight of your Serbian trip?",
      subtitle: "Spots are strictly limited to protect the natural habitat. Book in advance to secure your seat.",
      btn: "Check Availability & Book Now",
      cancel: "Cancellation possible up to 24 hours before departure via",
      cancelLink: "My Bookings",
      cancelSuffix: "."
    },
    footer: {
      desc: "Providing unforgettable boat tours through the magnificent Uvac River meanders since 2021.",
      linksTitle: "Quick Links",
      l1: "The Experience",
      l2: "Tour",
      l3: "Reviews",
      l4: "How to Reach Us",
      contactTitle: "Contact",
      c1: "Nova Varoš, Serbia"
    }
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'sr' | 'en'>('sr');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Anchor className={`w-8 h-8 ${isScrolled ? 'text-uvac-primary' : 'text-white'}`} />
            <span className={`font-serif font-bold text-2xl tracking-tight ${isScrolled ? 'text-uvac-dark' : 'text-white'}`}>
              Euro Uvac
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.experience}</a>
            <a href="#tours" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.tours}</a>
            <a href="#location" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.location}</a>
            <a href="#reviews" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.reviews}</a>
            
            <div className="flex items-center gap-4 border-l border-gray-300/30 pl-4">
              <a 
                href="https://instagram.com/eurouvac_krstarenje" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors flex items-center justify-center p-2 rounded-full ${isScrolled ? 'text-gray-500 hover:text-uvac-accent hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <div className={`flex items-center gap-2 rounded-full p-1 ${isScrolled ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'}`}>
                <button 
                  onClick={() => setLang('sr')}
                  className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${lang === 'sr' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
                >
                  SR
                </button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
                >
                  EN
                </button>
              </div>
              
              <button 
                onClick={() => {
                  window.location.hash = '#admin';
                }}
                className={`transition-colors font-medium flex items-center gap-2 ${isScrolled ? 'text-gray-500 hover:text-uvac-dark' : 'text-white/90 hover:text-white'}`}
                title={t.nav.profileTitle}
                aria-label={t.nav.profileTitle}
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">{t.nav.myBookings}</span>
              </button>

              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-uvac-accent hover:bg-[#c49363] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t.nav.book}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <div className={`flex items-center gap-1 rounded-full p-1 ${isScrolled ? 'bg-gray-100' : 'bg-black/20 backdrop-blur-sm'}`}>
              <button 
                onClick={() => setLang('sr')}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === 'sr' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
              >
                SR
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-uvac-primary shadow-sm' : (isScrolled ? 'text-gray-500 hover:text-gray-800' : 'text-white hover:text-white/80')}`}
              >
                EN
              </button>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center gap-4">
            <a href="#about" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.experience}</a>
            <a href="#tours" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.tours}</a>
            <a href="#location" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.location}</a>
            <a href="#reviews" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.reviews}</a>
            <div className="w-11/12 h-px bg-gray-100 my-2"></div>
            <div className="flex justify-center gap-6 w-full">
              <a 
                href="https://instagram.com/eurouvac_krstarenje" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-uvac-accent flex items-center justify-center p-2"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <button 
                onClick={() => {
                  window.location.hash = '#admin';
                  setMobileMenuOpen(false);
                }}
                className="text-gray-500 hover:text-uvac-dark font-medium flex items-center gap-2 px-4 py-2"
                title={t.nav.profileTitle}
                aria-label={t.nav.profileTitle}
              >
                <User className="w-5 h-5" />
                <span>{t.nav.myBookings}</span>
              </button>
            </div>
            <button 
              onClick={() => {
                setIsBookingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="bg-uvac-accent hover:bg-[#c49363] text-white px-8 py-3 rounded-full font-bold w-11/12 transition-all shadow-md"
            >
              {t.nav.book}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://github.com/user-attachments/assets/c25efce2-b13d-45a0-9323-0f97ee9d9405" 
            referrerPolicy="no-referrer"
            alt="Uvac River Meanders" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1610408544955-46743b1740e7?q=80&w=2070&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium tracking-wider mb-6 border border-white/30">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-uvac-accent hover:bg-[#c49363] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:shadow-[0_0_30px_rgba(212,163,115,0.6)] transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                {t.hero.checkAvail} <ChevronRight className="w-5 h-5" />
              </button>
              <a href="#tours" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto justify-center text-center">
                {t.hero.viewTours}
              </a>
            </div>
          </motion.div>
        </div>

      </section>

      {/* USP Section */}
      <section id="about" className="py-20 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.usp.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t.usp.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.usp.f1Title,
                desc: t.usp.f1Desc,
                image: "https://github.com/user-attachments/assets/2695a433-16ff-49d0-8796-539e597cff4f"
              },
              {
                title: t.usp.f2Title,
                desc: t.usp.f2Desc,
                image: "https://github.com/user-attachments/assets/fd7c320d-db3b-4eeb-a580-c86d2c212551"
              },
              {
                title: t.usp.f3Title,
                desc: t.usp.f3Desc,
                image: "https://github.com/user-attachments/assets/b4610442-0c29-4bde-a7b6-4830f56363ab"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl h-96 shadow-lg"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-[#eef3f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.tours.title}</h2>
            <p className="text-gray-600 text-lg">{t.tours.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Tour 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 relative overflow-hidden bg-white h-64 sm:h-auto">
                <div className="absolute inset-0 p-2 sm:p-4">
                  <video 
                    src="https://github.com/user-attachments/assets/2901e8da-e646-4363-9128-3aba80786072" 
                    autoPlay 
                    muted 
                    playsInline 
                    poster="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-contain rounded-[1.5rem] overflow-hidden transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-serif font-bold text-uvac-dark">{t.tours.t1Title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t.tours.t1Duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {t.tours.t1Max}</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {[t.tours.t1F1, t.tours.t1F2, t.tours.t1F3, t.tours.t1F4].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-uvac-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-uvac-primary hover:bg-uvac-light text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {t.tours.selectDate}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach Us Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-uvac-dark mb-4">{t.location.title}</h2>
            <p className="text-lg text-gray-600">{t.location.subtitle}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Directions */}
            <div className="space-y-8">
              {/* From Belgrade */}
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-uvac-primary/10 p-2 rounded-lg">
                    <Navigation className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-uvac-dark">{t.location.fromBelgrade}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t.location.fromBelgradeDesc}
                </p>
              </div>

              {/* From Zlatibor */}
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-uvac-primary/10 p-2 rounded-lg">
                    <Car className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-uvac-dark">{t.location.fromZlatibor}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t.location.fromZlatiborDesc}
                </p>
              </div>

              {/* Meeting Point */}
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-uvac-primary/10 p-2 rounded-lg">
                    <MapPin className="w-6 h-6 text-uvac-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-uvac-dark">{t.location.meetingPoint}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t.location.meetingPointDesc}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://maps.google.com/?q=Uvac+brana" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-uvac-dark px-6 py-4 rounded-xl font-bold transition-colors border border-gray-100 shadow-sm"
                >
                  <Map className="w-5 h-5" />
                  {t.location.openMap}
                </a>
                <a 
                  href="tel:+381658862760" 
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-uvac-dark px-6 py-4 rounded-xl font-bold transition-colors border border-gray-100 shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  {t.location.callSupport}
                </a>
              </div>
            </div>

            {/* Right Column: Map and Photo */}
            <div className="space-y-6">
              {/* Google Map Embed */}
              <div className="bg-white rounded-3xl overflow-hidden h-[400px] border border-stone-200 relative shadow-inner">
                <iframe 
                  src="https://maps.google.com/maps?q=Uvac+brana&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Uvac Map"
                ></iframe>
              </div>
              
              {/* Photo of the road/dock */}
              <div className="rounded-3xl overflow-hidden relative shadow-md">
                <img 
                  src="https://github.com/user-attachments/assets/4c507830-819a-4944-919b-10410fce8cac" 
                  alt="Scenic Route to Uvac" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <p className="text-white font-medium flex items-center gap-2 z-10">
                    <MapPin className="w-4 h-4" />
                    {t.location.scenicRoute}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewSection 
        t={t.reviews} 
        fallbackReviews={[
          { id: '1', name: t.reviews.r1Name, text: t.reviews.r1Text, rating: 5 },
          { id: '2', name: t.reviews.r2Name, text: t.reviews.r2Text, rating: 5 },
          { id: '3', name: t.reviews.r3Name, text: t.reviews.r3Text, rating: 5 }
        ]} 
      />

      {/* Social Proof / CTA */}
      <section className="py-24 bg-uvac-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topography" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm0 2c15.464 0 28 12.536 28 28S45.464 58 30 58 2 45.464 2 30 14.536 2 30 2zm0 4c13.255 0 24 10.745 24 24S43.255 54 30 54 6 43.255 6 30 16.745 6 30 6zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S10 41.046 10 30 18.954 10 30 10zm0 4c8.837 0 16 7.163 16 16s-7.163 16-16 16S14 38.837 14 30 21.163 14 30 14z" fill="currentColor" fillRule="evenodd" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topography)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-white/80 mb-10">{t.cta.subtitle}</p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-uvac-accent hover:bg-[#c49363] text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl transform hover:-translate-y-1"
          >
            {t.cta.btn}
          </button>
          <p className="text-white/60 text-sm mt-6">
            {t.cta.cancel}{" "}
            <button 
              onClick={() => { window.location.hash = '#admin'; }}
              className="underline hover:text-white transition-colors focus:outline-none"
            >
              {t.cta.cancelLink}
            </button>
            {t.cta.cancelSuffix}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-uvac-dark text-white/70 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-6 h-6 text-uvac-accent" />
              <span className="font-serif font-bold text-xl text-white">Euro Uvac</span>
            </div>
            <p className="max-w-sm mb-6">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/eurouvac_krstarenje" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-uvac-accent hover:border-uvac-accent text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.linksTitle}</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">{t.footer.l1}</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">{t.footer.l2}</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">{t.footer.l4}</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">{t.footer.l3}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-2">
              <li>milivoje.ciro@gmail.com</li>
              <li>+381 65 886 2760</li>
              <li>{t.footer.c1}</li>
            </ul>
          </div>
        </div>
      </footer>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        lang={lang} 
      />
    </div>
  );
}
