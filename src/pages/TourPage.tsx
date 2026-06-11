import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Clock, 
  Users, 
  Calendar, 
  Wallet, 
  MapPin, 
  ChevronDown, 
  CheckCircle2, 
  Backpack, 
  Footprints,
  Info,
  ArrowRight
} from 'lucide-react';
import { ExperienceHero } from '../components/experience/ExperienceHero';
import { Link } from 'react-router-dom';
import CTA from '../components/sections/CTA';
import AccordionItem from '../AccordionItem';
import SeoHead from '../components/SeoHead';
import UvacMap from '../components/UvacMap';

interface TourPageProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

export default function TourPage({ lang, setIsBookingOpen }: TourPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const timeline = [
    {
      time: lang === 'sr' ? '13:00' : '1:00 p.m.',
      title: lang === 'sr' ? 'Polazak sa brane Rastoke' : 'Departure from Rastoke Dam',
      description: lang === 'sr' 
        ? 'Ukrcavanje je na brani Rastoke, kod Nove Varoši. Čamac vas najpre vodi kroz otvoreni deo jezera — mirna voda, šuma sa obe strane, prostor da se smestite i uhvatite ritam. Postepeno se kanjon počinje sužavati i jezero polako otkriva prve meandre.' 
        : 'Boarding takes place at the Rastoke dam, near Nova Varoš. The boat first carries you through the open part of the lake — calm water, forest on both sides, time to settle in and find your pace. Gradually, the canyon begins to narrow, and the lake slowly reveals its first meanders.'
    },
    {
      time: lang === 'sr' ? 'Oko 14:00' : 'Around 2:00 p.m.',
      title: lang === 'sr' ? 'Ledena pećina' : 'Ice Cave',
      description: lang === 'sr' 
        ? 'Sat vremena nakon polaska, prolazeći kroz meandre, brod pristaje pred ulazom u Ledenu pećinu. Ulazite pešice, oko 600-700 metara u dubinu stene. Temperatura naglo pada — unutra je 8°C bez obzira na godišnje doba. Obilazak traje oko pola sata. \n\n*Napomena: Ulaz u Ledenu pećinu dodatno se naplaćuje (270 RSD po osobi).*' 
        : 'An hour after departure, passing through the meanders, the boat pulls up to the entrance of the Ice Cave. You continue on foot — around 600 to 700 meters into the rock. The temperature drops sharply. Inside, it\'s 8°C regardless of the season. The visit lasts about half an hour. \n\n*Note: Entrance to the Ice Cave is charged additionally (270 RSD / ~2.5€ per person).*'
    },
    {
      time: lang === 'sr' ? '14:30' : '2:30 p.m.',
      title: lang === 'sr' ? 'Polazak ka vidikovcu' : 'Departure to the Viewpoint',
      description: lang === 'sr' 
        ? 'Vraćate se na čamac i nastavljate do podnožja vidikovca. Odavde se ide pešice — 20 do 30 minuta uz blagi uspon. A kada stignete gore, razumete zašto ste došli. Meandri se otvaraju ispod vas u punom obimu: smaragdno zelena voda, litice sa obe strane, i negde visoko iznad kanjona — beloglavi supovi. Ovde se tempo prilagođava grupi. Računajte ukupno sat do sat i po za uspon, zadržavanje i silazak.' 
        : 'You return to the boat and continue to the base of the viewpoint. From here, it\'s on foot — a gentle 20 to 30-minute climb. And when you reach the top, you understand why you came. The meanders open up below you in full: emerald green water, cliffs on both sides, and somewhere high above the canyon — Griffon Vultures. The pace here adapts to the group. Estimate a total of hour to an hour and a half for the ascent, time at the top, and the return.'
    },
        {
      time: lang === 'sr' ? '16:00 – 17:00' : '4:00 – 5:00 p.m.',
      title: lang === 'sr' ? 'Povratna plovidba' : 'Return to Base',
      description: lang === 'sr' 
        ? 'Nakon obilaska vidikovca sledi opuštena povratna plovidba ka brani Rastoke. Oko 17 časova pristajete tamo gde je avantura počela — i tura se završava. \n\n**Ukupno trajanje krstarenja Uvcem: približno 4–5 sati.**' 
        : 'After the viewpoint, a relaxed cruise back to Rastoke Dam. You arrive around 5 p.m., back where the adventure began — and the tour comes to an end. \n\n**Total duration of the Uvac cruise: approximately 4–5 hours.**'
    }
  ];

  const faqItems = [
    {
      q: lang === 'sr' ? 'Da li je tura pogodna za decu i starije osobe?' : 'Is the tour suitable for children and seniors?',
      a: lang === 'sr' 
        ? 'Tura je pogodna za sve uzraste, i decu i starije osobe. Čamci su opremljeni prslucima za spasavanje svih dimenzija. Uspon do vidikovca je opcion — staza je umerene zahtevnosti, pa osobe koje ne žele pešačenje mogu ostati i uživati pored čamca u kanjonu.' 
        : 'The tour is suitable for all ages, including children and seniors. Our boats are equipped with life jackets of all sizes. The hike up to the viewpoint is optional — the trail is of moderate difficulty, so those who do not wish to hike can relax next to the boat in the canyon.'
    },
    {
      q: lang === 'sr' ? 'Da li mogu da povedem psa ili drugog kućnog ljubimca?' : 'Can I bring my dog or other pet?',
      a: lang === 'sr' 
        ? 'Da, kućni ljubimci su dobrodošli na čamcu. Molimo vas da tokom plovidbe vodite računa o njihovoj bezbednosti i udobnosti, kao i o drugim putnicima.' 
        : 'Yes, pets are absolutely welcome on board! We just ask that you ensure their safety and comfort during the cruise, while also being mindful of other passengers.'
    },
    {
      q: lang === 'sr' ? 'Koliko je zahtevno pešačenje?' : 'How demanding is the hike?',
      a: lang === 'sr' 
        ? 'Pešačenje je umereno zahtevno. Uspon do vidikovca Veliki vrh vodi preko strmijeg i kamenitog terena, dok je uspon do vidikovca Ravni krš blaži. Preporučujemo da obujete udobnu sportsku obuću.' 
        : 'The hike is moderately demanding. The ascent to the Veliki Vrh viewpoint goes over steeper and rockier terrain, while the trail to the Ravni Krš viewpoint is gentler. We recommend wearing comfortable sports shoes.'
    },
    {
      q: lang === 'sr' ? 'Šta ako pada kiša?' : 'What if it rains?',
      a: lang === 'sr' 
        ? 'Krstarenje se odvija i po kišnom vremenu. Otkazujemo isključivo u slučaju oluje ili jakog vetra, o čemu vas obaveštavamo pre polaska.' 
        : 'The cruise takes place even in rainy weather. We cancel exclusively in the event of a storm or strong wind, about which we will inform you before departure.'
    },
    {
      q: lang === 'sr' ? 'Da li je krstarenje dostupno tokom cele sezone ili ima ograničenih termina?' : 'Is the cruise available throughout the season or are there limited dates?',
      a: lang === 'sr' 
        ? 'Krstarenja se organizuju od 1. maja do 31. oktobra. Van tog perioda ture nisu dostupne.' 
        : 'Cruises are organized from May 1st to October 31st. Outside of this period, tours are not available.'
    },
    {
      q: lang === 'sr' ? 'Šta se dešava ako zakasnite na polazak?' : 'What happens if you are late for departure?',
      a: lang === 'sr' 
        ? 'Ukoliko kasnite, molimo vas da nas odmah kontaktirate telefonom ili WhatsApp-om. Čekamo do desetak minuta uz prethodnu najavu. Bez najave, brod polazi u zakazano vreme.' 
        : 'If you are late, please contact us immediately by phone or WhatsApp. We can wait for up to about ten minutes if notified in advance. Without prior announcement, the boat departs at the scheduled time.'
    }
  ];

  const infoCards = [
    { title: lang === 'sr' ? 'Trajanje' : 'Duration', value: lang === 'sr' ? '4–5 sati' : '4–5 hours', icon: Clock },
    { title: lang === 'sr' ? 'Kapacitet' : 'Capacity', value: lang === 'sr' ? 'Max 12 osoba' : 'Max 12 people', icon: Users },
    { title: lang === 'sr' ? 'Polazak' : 'Departure', value: lang === 'sr' ? '13:00 (osim ponedeljka)' : '1:00 p.m. (except Monday)', icon: Calendar },
    { title: lang === 'sr' ? 'Cena' : 'Price', value: lang === 'sr' ? '2000 RSD / osoba' : '2000 RSD / person', icon: Wallet },
    { title: lang === 'sr' ? 'Lokacija' : 'Location', value: lang === 'sr' ? 'Brana Rastoke' : 'Rastoke Dam', icon: MapPin },
    { title: lang === 'sr' ? 'Sezona' : 'Season', value: lang === 'sr' ? '1. maj – 31. okt' : 'May 1 – Oct 31', icon: Info },
  ];

  const renderWithLinks = (text: string) => {
    interface LinkItem {
      phrase: string;
      path: string;
      customRender?: (path: string, phrase: string, index: number) => React.ReactNode;
    }

    const linksMap: LinkItem[] = lang === 'sr' ? [
      { phrase: 'Ledenu pećinu', path: '/ledena-pecina' },
      { phrase: 'beloglavi supovi', path: '/beloglavi-sup' },
      {
        phrase: 'kanjon ',
        path: '/kanjon-uvca',
        customRender: (path, phrase, index) => (
          <span key={`${path}-${index}`}>
            <Link to={path} className="text-uvac-accent hover:underline font-medium">
              kanjon
            </Link>{' '}
          </span>
        )
      },
      {
        phrase: 'podnožja vidikovca',
        path: '/kanjon-uvca#vidikovci',
        customRender: (path, phrase, index) => (
          <span key={`${path}-${index}`}>
            podnožja{' '}
            <Link to={path} className="text-uvac-accent hover:underline font-medium">
              vidikovca
            </Link>
          </span>
        )
      }
    ] : [
      { phrase: 'Ice Cave', path: '/ledena-pecina' },
      { phrase: 'Griffon Vultures', path: '/beloglavi-sup' },
      {
        phrase: 'canyon ',
        path: '/kanjon-uvca',
        customRender: (path, phrase, index) => (
          <span key={`${path}-${index}`}>
            <Link to={path} className="text-uvac-accent hover:underline font-medium">
              canyon
            </Link>{' '}
          </span>
        )
      },
      {
        phrase: 'base of the viewpoint',
        path: '/kanjon-uvca#vidikovci',
        customRender: (path, phrase, index) => (
          <span key={`${path}-${index}`}>
            base of the{' '}
            <Link to={path} className="text-uvac-accent hover:underline font-medium">
              viewpoint
            </Link>
          </span>
        )
      }
    ];

    let elements: React.ReactNode[] = [text];

    linksMap.forEach(({ phrase, path, customRender }) => {
      const newElements: React.ReactNode[] = [];
      elements.forEach(item => {
        if (typeof item === 'string') {
          const parts = item.split(phrase);
          parts.forEach((part, index) => {
            if (index > 0) {
              newElements.push(
                customRender ? (
                  customRender(path, phrase, index)
                ) : (
                  <Link key={`${path}-${index}`} to={path} className="text-uvac-accent hover:underline font-medium">
                    {phrase}
                  </Link>
                )
              );
            }
            newElements.push(part);
          });
        } else {
          newElements.push(item);
        }
      });
      elements = newElements;
    });

    return elements;
  };

  const tourSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": "https://uvacgriffon.rs/tura/#trip",
        "name": lang === 'en'
          ? "Uvac Cruising — The Complete Experience"
          : "Krstarenje Uvcem — Kompletan doživljaj",
        "description": lang === 'en'
          ? "Organized boat tour through the meanders of the Uvac River, including a visit to the Ice Cave and scenic viewpoints. Departure from the Rastoke Dam every day at 1:00 p.m., except Mondays."
          : "Organizovana vožnja brodom meandrima reke Uvac uz obilazak Ledene pećine i vidikovaca. Polazak sa brane Rastoke svaki dan u 13:00, osim ponedeljka.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1779223438/tura-uvac.webp",
        "url": "https://uvacgriffon.rs/tura",
        "touristType": ["Nature Lovers", "Photographers", "Adventure travelers", "Family travelers", "Birdwatchers"],
        "duration": "PT5H",
        "maximumAttendeeCapacity": 12,
        "price": "2000",
        "priceCurrency": "RSD",
        "provider": {
          "@type": "TravelAgency",
          "@id": "https://uvacgriffon.rs/#localbusiness"
        },
        "subjectOf": {
          "@type": "WebPage",
          "@id": "https://uvacgriffon.rs/tura"
        },
        "offers": {
          "@type": "Offer",
          "name": lang === 'en' ? "Standard Uvac Cruise Ticket" : "Standardna karta za krstarenje Uvcem",
          "price": "2000",
          "priceCurrency": "RSD",
          "validFrom": "2026-05-01",
          "validThrough": "2026-10-31",
          "valueAddedTaxIncluded": true,
          "url": "https://uvacgriffon.rs/tura",
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitText": "person"
          },
          "offeredBy": {
            "@id": "https://uvacgriffon.rs/#localbusiness"
          }
        },
        "itinerary": {
          "@type": "ItemList",
          "name": lang === 'en' ? "Uvac Cruise Itinerary" : "Plan i maršruta krstarenja",
          "numberOfItems": 5,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": lang === 'en' ? "Departure from Rastoke Dam (1:00 p.m.)" : "Polazak sa brane Rastoke (13:00)",
              "item": {
                "@id": "https://uvacgriffon.rs/tura/#start"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": lang === 'en' ? "Ice Cave Exploration (2:00 p.m.)" : "Obilazak Ledene pećine (14:00)",
              "item": {
                "@id": "https://uvacgriffon.rs/ledena-pecina/#cave"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": lang === 'en' ? "Hike to Veliki Vrh Viewpoint (2:30 p.m.)" : "Uspon na vidikovac Veliki Vrh (14:30)",
              "item": {
                "@id": "https://uvacgriffon.rs/kanjon-uvca/#veliki-vrh"
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": lang === 'en' ? "Observing Griffon Vultures & View of Ravni Krš (3:30 p.m.)" : "Posmatranje beloglavih supova i vidikovac Ravni Krš (15:30)",
              "item": {
                "@id": "https://uvacgriffon.rs/kanjon-uvca/#ravni-krs"
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": lang === 'en' ? "Return Cruise to Rastoke Dam (4:00-5:00 p.m.)" : "Povratna plovidba do brane (16:00-17:00)",
              "item": {
                "@id": "https://uvacgriffon.rs/tura/#start"
              }
            }
          ]
        },
        "hasPart": [
          { "@id": "https://uvacgriffon.rs/tura/#start" },
          { "@id": "https://uvacgriffon.rs/ledena-pecina/#cave" },
          { "@id": "https://uvacgriffon.rs/kanjon-uvca/#veliki-vrh" },
          { "@id": "https://uvacgriffon.rs/kanjon-uvca/#ravni-krs" },
          { "@id": "https://uvacgriffon.rs/beloglavi-sup/#attraction" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": lang === 'sr' ? "Početna" : "Home",
            "item": "https://uvacgriffon.rs/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": lang === 'sr' ? "Tura" : "Tour",
            "item": "https://uvacgriffon.rs/tura"
          }
        ]
      },
      {
        "@type": "Park",
        "@id": "https://uvacgriffon.rs/#reserve",
        "name": lang === 'sr' ? "Specijalni rezervat prirode Uvac" : "Uvac Special Nature Reserve",
        "url": "https://uvacgriffon.rs/kanjon-uvca",
        "containsPlace": [
          { "@id": "https://uvacgriffon.rs/ledena-pecina/#cave" },
          { "@id": "https://uvacgriffon.rs/kanjon-uvca/#veliki-vrh" },
          { "@id": "https://uvacgriffon.rs/kanjon-uvca/#ravni-krs" },
          { "@id": "https://uvacgriffon.rs/beloglavi-sup/#attraction" }
        ]
      },
      {
        "@type": "Place",
        "@id": "https://uvacgriffon.rs/tura/#start",
        "name": lang === 'sr' ? "Polazna tačka – brana Rastoke" : "Starting Point – Rastoke Dam",
        "description": lang === 'sr'
          ? "Mesto ukrcavanja u čamac i početak avanture kroz meandre."
          : "Boarding place and the beginning of your meanders adventure.",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.418265,
          "longitude": 19.926270
        }
      },
      {
        "@type": ["Cave", "TouristAttraction"],
        "@id": "https://uvacgriffon.rs/ledena-pecina/#cave",
        "name": lang === 'sr' ? "Ledena pećina" : "Ice Cave",
        "description": lang === 'sr'
          ? "Skriveni dragulj Uvca do kojeg se stiže isključivo čamcem. Obilazak obuhvata oko 700 metara unutrašnjih kanala i dvorana."
          : "A hidden gem of Uvac accessible only by boat, with around 700 meters of passages open to visitors.",
        "url": "https://uvacgriffon.rs/ledena-pecina",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.357011,
          "longitude": 19.954455
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/kanjon-uvca/#veliki-vrh",
        "name": lang === 'sr' ? "Vidikovac Veliki Vrh" : "Veliki Vrh Viewpoint",
        "description": lang === 'sr'
          ? "Jedan od najpoznatijih vidikovaca sa koga se pruža nestvaran pogled na meandre i gnezda beloglavog supa."
          : "One of the most famous viewpoints offering an unreal view of the meanders and griffon vulture nests.",
        "url": "https://uvacgriffon.rs/kanjon-uvca",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.357444,
          "longitude": 19.952623
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/kanjon-uvca/#ravni-krs",
        "name": lang === 'sr' ? "Vidikovac Ravni Krš" : "Ravni Krš Viewpoint",
        "description": lang === 'sr'
          ? "Fascinantan pogled na kanjon. Mesto gde priroda ostavlja bez daha."
          : "A fascinating view of the canyon. A place where nature takes your breath away.",
        "url": "https://uvacgriffon.rs/kanjon-uvca",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.352879,
          "longitude": 19.960401
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/beloglavi-sup/#attraction",
        "name": lang === 'sr' ? "Kolonija beloglavih supova" : "Griffon Vulture Colony",
        "description": lang === 'sr'
          ? "Tokom krstarenja imaćete priliku da posmatrate beloglave supove u njihovom prirodnom staništu. Kanjon Uvca dom je jedne od najvećih kolonija ove impresivne ptice na Balkanu."
          : "During the cruise, you may observe griffon vultures in their natural habitat. The Uvac Canyon is home to one of the largest colonies of this impressive bird in the Balkans.",
        "url": "https://uvacgriffon.rs/beloglavi-sup",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.361824,
          "longitude": 19.956772
        }
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={lang === 'en'
          ? 'Uvac Canyon Boat Cruise – Tour Itinerary & Bookings | Uvac Griffon'
          : 'Krstarenje Uvcem – Plan ture, Cena i Rezervacije | Uvac Griffon'
        }
        description={lang === 'en'
          ? 'Detailed Uvac Canyon cruise itinerary. A 16 km boat tour featuring the Ice Cave, spectacular viewpoints, and griffon vulture watching. Departures at 1 PM, 4–5 hours. Book online.'
          : 'Detaljan plan krstarenja Uvcem. Ruta od 16 km, Ledena pećina, vidikovac i beloglavi supovi. Polazak 13h, trajanje 4–5 sati. Rezervišite online.'
        }
        canonicalUrl="https://uvacgriffon.rs/tura"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1779223438/tura-uvac.webp"
        schema={tourSchema}
      />
      <div className="bg-surface-page">
      <ExperienceHero 
        title={lang === 'sr' ? 'Krstarenje Uvcem' : 'Uvac Cruise'}
        subtitle={lang === 'sr' ? 'Otkrijte svaki detalj vaše avanture kroz kanjon Uvca' : 'Discover every detail of your adventure through the Uvac canyon'}
        backgroundImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1779223438/tura-uvac.webp"
        breadcrumbs={[
          { label: lang === 'sr' ? 'Početna' : 'Home', path: '/' },
          { label: lang === 'sr' ? 'Tura' : 'Tour' }
        ]}
        lang={lang}
        setIsBookingOpen={setIsBookingOpen}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Narrative Intro */}
        <div className="max-w-3xl mx-auto text-center mb-20 italic text-gray-600 leading-relaxed text-lg">
          <p>
            {lang === 'sr' 
              ? 'Meandri Uvca su jedno od najlepših čuda prirode i prepoznatljivi simbol divlje lepote Srbije. Krstarenje vas vodi tačno tuda — kroz te meandre, u unutrašnjost Ledene pećine gde vas hladnoća dočeka odmah na ulazu, pa naviše, do vidikovaca sa kojih gledate kako beloglavi supovi kruže iznad kanjona koji je oduvek bio njihov dom.'
              : 'The Uvac meanders are one of nature\'s most beautiful wonders and a defining symbol of Serbia\'s wild beauty. The cruise takes you right there — into the meanders, deep inside the Ice Cave where the cold hits you the moment you step in, and then upward, to the viewpoints where you watch Griffon Vultures circling above a canyon that has always been their home.'}
          </p>
        </div>

        {/* Info Blocks */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-10">{lang === 'sr' ? 'Osnovne informacije' : 'Basic Info'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {infoCards.map((card, i) => (
              <motion.div 
                key={i}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f8faf9] p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-uvac-primary/10 rounded-full flex items-center justify-center text-uvac-primary mb-3 group-hover:bg-uvac-primary group-hover:text-white transition-colors">
                  <card.icon size={20} />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1 font-bold">{card.title}</h4>
                <p className="text-gray-800 font-serif font-bold text-sm">{card.value}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-6">{lang === 'sr' ? 'Rezervacija je obavezna zbog ograničenog broja mesta.' : 'Reservation is mandatory due to limited space.'}</p>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-uvac-accent hover:bg-brand-gold text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              {lang === 'sr' ? 'Rezerviši mesto' : 'Book Now'}
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {lang === 'sr' ? 'Plan ture – satnica (orijentaciono)' : 'Tour Schedule (Estimated)'}
            </h2>
            <p className="text-gray-500 italic">
              {lang === 'sr' 
                ? 'Vremena su okvirna i mogu blago varirati u zavisnosti od vremenskih uslova i tempa grupe.'
                : 'Times are approximate and may vary slightly depending on weather conditions and group pace.'}
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-uvac-primary/10 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 px-8 py-4">
                    <div className={`p-6 bg-white rounded-xl border border-gray-100 shadow-sm ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-uvac-primary font-bold text-xl block mb-2">{item.time}</span>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{item.title}</h3>
                      <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.description.split('\n').map((line, idx) => {
                          const isNote = line.startsWith('*');
                          const isBold = line.startsWith('**');
                          const styleClass = isNote ? 'italic mt-2 text-uvac-dark/70' : isBold ? 'font-bold mt-4 text-gray-800' : '';
                          const cleanLine = line.replace(/\*\*|\*/g, '');

                          return (
                            <p key={idx} className={styleClass}>
                              {isNote ? cleanLine : renderWithLinks(cleanLine)}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-uvac-primary rounded-full border-4 border-white shadow-md z-10 -translate-x-1/2" />
                  
                  <div className="w-full md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation & Fitness */}
        <section className="mb-24 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#f0f4f2] p-10 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <Backpack className="text-uvac-primary" size={28} />
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                {lang === 'sr' ? 'Šta poneti' : 'What to bring'}
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                lang === 'sr' ? 'Jaknu ili duksericu (u pećini je 8°C)' : 'Jacket or sweatshirt (cave is 8°C)',
                lang === 'sr' ? 'Udobnu obuću za uspon' : 'Comfortable hiking shoes',
                lang === 'sr' ? 'Vodu' : 'Water',
                lang === 'sr' ? 'Užinu' : 'Snack',
                lang === 'sr' ? 'Fotoaparat' : 'Camera'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-uvac-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-uvac-primary/5 p-10 rounded-xl border border-uvac-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <Footprints className="text-uvac-primary" size={28} />
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                {lang === 'sr' ? 'Fizička zahtevnost' : 'Physical difficulty'}
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                lang === 'sr' ? 'Pešačenje: umerenog intenziteta' : 'Hike: moderate intensity',
                lang === 'sr' ? 'Ravni krš — blaži uspon' : 'Ravni krš — a gentler climb',
                lang === 'sr' ? 'Veliki vrh — strmiji, kameniti teren' : 'Veliki Vrh — steeper, rocky terrain',
                lang === 'sr' ? 'Nije pogodno za osobe sa teškoćama u kretanju' : 'Not suitable for people with mobility difficulties'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-uvac-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Route Map */}
        <UvacMap lang={lang} />


        {/* FAQ Section */}
        <section className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">{lang === 'sr' ? 'Česta pitanja' : 'FAQ'}</h2>
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === i}
                onToggle={toggleFaq}
                reduceMotion={shouldReduceMotion ?? false}
              />
            ))}
          </div>
        </section>
      </div>

      <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />
    </div>
    </>
  );
}
