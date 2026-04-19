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
  Globe
} from 'lucide-react';

const translations = {
  sr: {
    nav: { tours: "Tura", experience: "Iskustvo", reviews: "Recenzije", book: "Rezerviši" },
    hero: {
      badge: "NAJBOLJE ČUVANA TAJNA SRBIJE",
      title: "Doživite netaknutu lepotu Uvca",
      subtitle: "Krstarite veličanstvenim meandrima, istražite skrivene ledene pećine i posmatrajte let retkog beloglavog supa.",
      checkAvail: "Proveri dostupnost",
      viewTours: "Pogledaj ponudu tura",
      reviews: "4.9/5 od 2.000+ recenzija"
    },
    usp: {
      title: "Zašto krstariti sa nama?",
      subtitle: "Pružamo najautentičnije, najbezbednije i najlepše iskustvo na reci Uvac.",
      f1Title: "Kolonija beloglavih supova",
      f1Desc: "Približite se najvećoj koloniji ovih veličanstvenih ptica na Balkanu. San svakog fotografa.",
      f2Title: "Ekskluzivni vidikovci",
      f2Desc: "Vodimo vas do vidikovaca Ravni Krš i Veliki Vrh za onaj prepoznatljivi, panoramski snimak meandara.",
      f3Title: "Ledena pećina",
      f3Desc: "Otkrijte magični svet ledenih ukrasa i skrivenih dvorana uz pratnju iskusnih vodiča."
    },
    tours: {
      title: "Vaša avantura",
      subtitle: "Doživite Uvac i njegove meandre, posetite Ledenu pećinu i uživajte u jednom od najlepših pogleda u Srbiji.",
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
    cta: {
      title: "Spremni za vrhunac vašeg putovanja po Srbiji?",
      subtitle: "Mesta su strogo ograničena radi zaštite prirodnog staništa. Rezervišite unapred da osigurate svoje mesto.",
      btn: "Proveri dostupnost i rezerviši",
      cancel: "Besplatno otkazivanje do 24 sata pre polaska."
    },
    footer: {
      desc: "Pružamo nezaboravne ture čamcem kroz veličanstvene meandre reke Uvac od 2021. godine.",
      linksTitle: "Brzi linkovi",
      l1: "Sve ture",
      l2: "O rezervatu",
      l3: "Česta pitanja",
      l4: "Kontaktirajte nas",
      contactTitle: "Kontakt",
      c1: "Nova Varoš, Srbija"
    }
  },
  en: {
    nav: { tours: "Tour", experience: "The Experience", reviews: "Reviews", book: "Book Now" },
    hero: {
      badge: "SERBIA'S BEST KEPT SECRET",
      title: "Experience the Untouched Beauty of Uvac",
      subtitle: "Cruise through majestic meanders, explore hidden ice caves, and witness the flight of the rare Griffon Vulture.",
      checkAvail: "Check Availability",
      viewTours: "View Tour Options",
      reviews: "4.9/5 from 2,000+ reviews"
    },
    usp: {
      title: "Why Cruise With Us?",
      subtitle: "We provide the most authentic, safe, and breathtaking experience on the Uvac River.",
      f1Title: "Griffon Vulture Colony",
      f1Desc: "Get up close to the largest colony of these majestic birds in the Balkans. A photographer's dream.",
      f2Title: "Exclusive Viewpoints",
      f2Desc: "We take you to the Ravni Krš and Veliki Vrh viewpoints for that iconic, panoramic shot of the meanders.",
      f3Title: "Ledena pećina (Ice Cave)",
      f3Desc: "Discover a magical world of icy formations and hidden chambers, with the help of experienced guides."
    },
    tours: {
      title: "Your Adventure",
      subtitle: "Experience Uvac and its meanders, visit the Ice Cave and enjoy one of the most beautiful views in Serbia.",
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
    cta: {
      title: "Ready for the highlight of your Serbian trip?",
      subtitle: "Spots are strictly limited to protect the natural habitat. Book in advance to secure your seat.",
      btn: "Check Availability & Book Now",
      cancel: "Free cancellation up to 24 hours before departure."
    },
    footer: {
      desc: "Providing unforgettable boat tours through the magnificent Uvac River meanders since 2021.",
      linksTitle: "Quick Links",
      l1: "All Tours",
      l2: "About the Reserve",
      l3: "FAQ",
      l4: "Contact Us",
      contactTitle: "Contact",
      c1: "Nova Varoš, Serbia"
    }
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'sr' | 'en'>('sr');

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <a href="#tours" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.tours}</a>
            <a href="#about" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.experience}</a>
            <a href="#reviews" className={`font-medium transition-colors hover:text-uvac-accent ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>{t.nav.reviews}</a>
            
            <div className="flex items-center gap-4 border-l border-gray-300/30 pl-4">
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
              
              <button className="bg-uvac-accent hover:bg-[#c49363] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
            <a href="#tours" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.tours}</a>
            <a href="#about" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.experience}</a>
            <a href="#reviews" className="text-gray-800 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.reviews}</a>
            <button className="bg-uvac-primary text-white px-8 py-3 rounded-full font-semibold w-11/12">
              {t.nav.book}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/uvac-hero.jpg" 
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
              <button className="bg-uvac-accent hover:bg-[#c49363] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:shadow-[0_0_30px_rgba(212,163,115,0.6)] transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
                {t.hero.checkAvail} <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto justify-center">
                {t.hero.viewTours}
              </button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* USP Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.usp.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t.usp.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Bird className="w-8 h-8 text-uvac-accent" />,
                title: t.usp.f1Title,
                desc: t.usp.f1Desc
              },
              {
                icon: <Map className="w-8 h-8 text-uvac-accent" />,
                title: t.usp.f2Title,
                desc: t.usp.f2Desc
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-uvac-accent" />,
                title: t.usp.f3Title,
                desc: t.usp.f3Desc
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-uvac-sand/30 p-8 rounded-2xl border border-uvac-sand/50 text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-uvac-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-uvac-dark mb-4">{t.tours.title}</h2>
              <p className="text-gray-600 text-lg max-w-xl">{t.tours.subtitle}</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Tour 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop" 
                  alt="Classic Tour" 
                  className="w-full h-64 sm:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-serif font-bold text-uvac-dark">{t.tours.t1Title}</h3>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 line-through">{t.tours.t1OldPrice}</span>
                      <div className="text-2xl font-bold text-uvac-primary">{t.tours.t1Price}<span className="text-sm font-normal text-gray-500">{t.tours.t1Unit}</span></div>
                    </div>
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
                <button className="w-full bg-uvac-primary hover:bg-uvac-light text-white py-3 rounded-xl font-bold transition-colors">
                  {t.tours.selectDate}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <button className="bg-uvac-accent hover:bg-[#c49363] text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl transform hover:-translate-y-1">
            {t.cta.btn}
          </button>
          <p className="text-white/60 text-sm mt-6">{t.cta.cancel}</p>
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
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.linksTitle}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.l1}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.l2}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.l3}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.l4}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-2">
              <li>info@uvaccruises.rs</li>
              <li>+381 60 123 4567</li>
              <li>{t.footer.c1}</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
