import React from 'react';
import SeoHead from '../components/SeoHead';
import { getCloudinarySrcSet } from '../lib/cloudinary';
import { Link } from 'react-router-dom';
import { ExperienceHero } from '../components/experience/ExperienceHero';
import { ExperienceLead } from '../components/experience/ExperienceLead';
import { ContentBlock } from '../components/experience/ContentBlock';
import { Gallery } from '../components/experience/Gallery';
import { InfoBox } from '../components/experience/InfoBox';
import { RelatedCards } from '../components/experience/RelatedCards';
import CTA from '../components/sections/CTA';
import { motion } from 'motion/react';

interface KanjonUvcaProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

const KanjonUvca = ({ lang, setIsBookingOpen }: KanjonUvcaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/kanjon-uvca/#attraction",
        "name": lang === 'sr' ? "Kanjon Uvca" : "Uvac Canyon",
        "description": lang === 'sr'
          ? "Specijalni rezervat prirode sa spektakularnim meandrima reke Uvac, vidikovcima Ravni Krš i Veliki Vrh i kolonijom beloglavih supova."
          : "Special nature reserve with spectacular meanders of the Uvac river, viewpoints Ravni Krš and Veliki Vrh and a colony of griffon vultures.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665114/vidikovac-ravni-krs-uvac.webp",
        "url": "https://uvacgriffon.rs/kanjon-uvca",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nova Varoš",
          "addressRegion": "Zlatiborski okrug",
          "addressCountry": "RS"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.41859,
          "longitude": 19.92684
        },
        "touristType": ["Nature Lovers", "Adventure Seekers", "Families", "Photographers", "Hikers", "Birdwatchers"],
        "isAccessibleForFree": false,
        "offers": {
          "@type": "Offer",
          "name": lang === 'sr' ? "Krstarenje Uvcem" : "Uvac Cruise",
          "price": "2000",
          "priceCurrency": "RSD",
          "url": "https://uvacgriffon.rs/tura"
        },
        "provider": {
          "@id": "https://uvacgriffon.rs/#localbusiness"
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/kanjon-uvca/#viewpoints",
        "name": lang === 'sr' ? "Vidikovci Veliki Vrh i Ravni Krš" : "Scenic Viewpoints Veliki Vrh & Ravni Krš",
        "description": lang === 'sr'
          ? "Vidikovci sa kojih se pruža spektakularan pogled na meandre."
          : "Viewpoints with a spectacular view of the meanders.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/v1777665114/vidikovac-ravni-krs-uvac.webp",
        "isPartOf": {
          "@id": "https://uvacgriffon.rs/kanjon-uvca/#attraction"
        }
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
            "name": lang === 'sr' ? "Otkrijte Uvac" : "Discover Uvac",
            "item": "https://uvacgriffon.rs/#otkrijte-uvac"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": lang === 'sr' ? "Kanjon Uvca" : "Uvac Canyon",
            "item": "https://uvacgriffon.rs/kanjon-uvca"
          }
        ]
      }
    ]
  };

  return (
    <main>
      <SeoHead 
        title={lang === 'sr' ? 'Kanjon Uvca – Krstarenje, Vidikovci i Beloglavi Sup | Uvac Griffon' : 'Uvac Canyon Boat Tour – Griffon Vultures & Meanders | Uvac Griffon'}
        description={lang === 'sr' ? 'Kanjon reke Uvac sa svojim meandrima predstavlja spektakularan prirodni fenomen i srce Specijalnog rezervata prirode.' : 'The Uvac River Canyon with its meanders represents a spectacular natural phenomenon and the heart of the Special Nature Reserve.'}
        canonicalUrl="https://uvacgriffon.rs/kanjon-uvca"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665114/vidikovac-ravni-krs-uvac.webp"
        schema={schema}
      />

      <ExperienceHero 
        title={lang === 'sr' ? 'Kanjon Uvca' : 'Uvac Canyon'}
        subtitle={lang === 'sr' ? 'Dom beloglavog supa' : 'Home of the Griffon Vulture'}
        backgroundImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665114/vidikovac-ravni-krs-uvac.webp"
        breadcrumbs={[
          { label: lang === 'sr' ? 'Početna' : 'Home', path: '/' },
          { label: lang === 'sr' ? 'Otkrijte Uvac' : 'Discover Uvac', path: '/#otkrijte-uvac' },
          { label: lang === 'sr' ? 'Kanjon Uvca' : 'Uvac Canyon' }
        ]}
        lang={lang}
        setIsBookingOpen={setIsBookingOpen}
      />

      <ExperienceLead text={lang === 'sr' ? 'Malo gde je moć vode ostavila tako dramatičan trag kao u kanjonu Uvca. Milionima godina, reka je uporno usecala svoj put kroz tvrdi krečnjak, ostavljajući iza sebe pejzaž koji prkosi logici. Smaragdna voda, meandri gotovo savršene geometrije i litice sa kojih poleću beloglavi supovi čine srce Specijalnog rezervata prirode Uvac — prostor gde divljina i dalje diktira sopstveni ritam.' : 'Few places bear witness to the power of water quite like the Uvac Canyon. For millions of years, the river carved its way relentlessly through hard limestone, leaving behind a landscape that defies logic. Emerald water, meanders of almost perfect geometry, and cliffs from which Griffon Vultures take flight form the heart of the Uvac Special Nature Reserve — a place where wilderness still sets its own pace.'} />
      
      {/* QUOTE DIVIDER */}
<div className="flex flex-col items-center text-center gap-8 py-16 px-4 bg-uvac-primary">

  <svg width="220" height="28" viewBox="0 0 220 28" fill="none" aria-hidden="true">
    <path
      d="M0 14 C18 14, 18 4, 36 4 S54 24, 72 24 S90 4, 108 4 S126 24, 144 24 S162 4, 180 4 S198 14, 220 14"
      stroke="#6aafd6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>

  <p className="font-serif font-light italic text-2xl md:text-3xl text-white leading-relaxed max-w-2xl tracking-wide">
    {lang === 'sr'
      ? '"Pravi doživljaj Uvca počinje kada se otisnete na vodu."'
      : '"The Uvac experience truly begins the moment you push off from shore."'}
  </p>

  <svg width="220" height="28" viewBox="0 0 220 28" fill="none" aria-hidden="true">
    <path
      d="M0 14 C18 14, 18 4, 36 4 S54 24, 72 24 S90 4, 108 4 S126 24, 144 24 S162 4, 180 4 S198 14, 220 14"
      stroke="#6aafd6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>

</div>

      {/* INTRO SPEECH SECTION */}
      <section className="py-20 bg-surface-page text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
              {lang === 'sr'
                ? 'Krstarenje Uvcem otkriva ovaj prostor iz ugla koji je nemoguće doživeti sa kopna. Dok čamac prolazi kroz srce rezervata, iza svakog zavoja otkriva se novi deo ovog jedinstvenog pejzaža. Ono što počinje kao vožnja čamcem ubrzo prerasta u putovanje kroz prirodu, istoriju i prizore po kojima je Uvac poznat širom Evrope.'
                : 'Uvac Cruising reveals this area from an angle that is impossible to experience from land. As the boat passes through the heart of the reserve, a new section of this unique landscape is revealed around every bend. What begins as a boat ride soon turns into a journey through nature, history, and the sights for which Uvac is known throughout Europe.'}
            </p>
          </div>
        </div>
      </section>

      <ContentBlock 
        layout="image-text"
        title={lang === 'sr' ? 'Meandri Uvca — Svetski fenomen' : 'Uvac Meanders — A World Phenomenon'}
        text={lang === 'sr' ? 'Najveća atrakcija kanjona su njegovi meandri – niz oštrih, gotovo nerealnih zavoja reke koji su zvanično uvršteni u Inventar geonasleđa Srbije. Ovde se reka Uvac uvija, pravi oštre zaokrete i skoro se vraća u sopstveni tok. Ništa slično ne postoji nigde drugde na Balkanu. Na pojedinim mestima, zidovi kanjona se uzdižu i do 350 metara, dok su njegove strane često potpuno vertikalne. Krstareći ovim vodama, prolazite kroz predele gde se strme sive litice spajaju sa smaragdnom vodom, stvarajući kontraste koje nijedna fotografija ne može da prenese. Morate biti tu, na vodi, kako biste u potpunosti doživeli ovaj jedinstveni pejzaž.' : 'The canyon\'s greatest draw is its meanders — a series of sharp, almost surreal river bends officially included in the Inventory of Serbia\'s Geoheritage. Here, the Uvac River twists, turns, and nearly doubles back on itself. Nothing quite like it exists anywhere else in the Balkans. In places, the canyon walls rise to 350 meters, often completely vertical. Cruising these waters, you pass through landscapes where sheer grey cliffs meet emerald green, creating contrasts that no photograph quite captures. You need to be there, on the water, to truly experience this unique landscape.'}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1778790228/meandri-uvca-fenomen.webp"
      />

      <ContentBlock 
        layout="text-image"
        title={lang === 'sr' ? 'Čuvari neba iznad kanjona' : 'Guardians of the Sky Above the Canyon'}
        text={lang === 'sr' ? (
          <p>
            Meandri i litice nisu jedino po čemu je kanjon Uvca poznat. Ovo je dom jedne od najvećih kolonija{' '}
            <Link to="/beloglavi-sup" className="text-uvac-accent hover:underline font-medium">
              beloglavih supova
            </Link>{' '}
            u Evropi — ptica čiji raspon krila može dostići gotovo tri metra. Let ovih veličanstvenih ptica iznad meandara postao je jedan od simbola rezervata. Posmatrati ih kako bez napora jedre iznad smaragdne reke iskustvo je koje se retko zaboravlja, bilo da ih posmatrate sa čamca tokom krstarenja ili sa nekog od vidikovaca iznad kanjona.
          </p>
        ) : (
          <p>
            The meanders and cliffs are not the only reason the Uvac Canyon is known across Europe. This is home to one of the largest{' '}
            <Link to="/beloglavi-sup" className="text-uvac-accent hover:underline font-medium">
              Griffon Vulture
            </Link>{' '}
            colonies on the continent — birds whose wingspan can reach nearly three metres. Watching them soar effortlessly above the emerald river is an experience that stays with you long after you leave, whether you see them from the boat during a cruise or from one of the viewpoints high above the canyon.
          </p>
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1780843363/silueta-beloglavog-supa-iznad-kanjona-uvca.webp"
      />

      <section className="py-20 bg-bg" id="vidikovci">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">{lang === 'sr' ? 'Vidikovci sa kojih zastaje dah' : 'Breathtaking Viewpoints'}</h2>
          <p className="text-center text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            {lang === 'sr'
              ? 'Da biste zaista razumeli razmeru i lepotu ovog predela, morate ga pogledati i sa visine. Vidikovci Veliki vrh i Ravni krš nude upravo to — sa ovih tačaka, meandri Uvca se otvaraju u svom punom sjaju, dok iznad vas krstare beloglavi supovi, čuvari ovog rezervata. To je jedinstvena prilika da doživite savršenu harmoniju između rečnog toka, strmih litica i neba kojim gospodare ove veličanstvene ptice.'
              : 'To truly grasp the scale and beauty of this landscape, you need to see it from above as well. Veliki Vrh and Ravni Krš viewpoints offer exactly that — from these vantage points, the Uvac meanders unfold in their full splendour, while Griffon Vultures circle overhead, guardians of this reserve. It is a unique opportunity to experience the perfect harmony between river, steep cliffs and sky dominated by these magnificent birds.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: lang === 'sr' ? "Veliki vrh" : "Veliki Vrh", desc: lang === 'sr' ? "Vidikovac sa kojeg se pruža legendarni pogled na „potkovice“ Uvca. Uspon do ove tačke vodi preko strmijeg i kamenitog terena, ali prizor koji čeka na vrhu opravdava svaki korak." : "Veliki Vrh offers the legendary view of Uvac's 'horseshoe' bends. The trail up is steeper and rocky in places, but the sight waiting at the top makes every step worth it.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1777665113/krstarenje-uvcem-meandri.webp" },
              { name: lang === 'sr' ? "Ravni krš" : "Ravni Krš", desc: lang === 'sr' ? "Ravni krš nudi drugačiju, ali podjednako impresivnu perspektivu. Staza je umerenija i vodi do mesta sa koga u tišini možete posmatrati let beloglavih supova." : "Ravni Krš offers a different, yet equally impressive perspective. The trail is more gradual, leading to a quiet vantage point where you can watch Griffon Vultures in flight undisturbed.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1777665114/vidikovac-ravni-krs-uvac.webp" }
            ].map((v, i) => {
              const opt = getCloudinarySrcSet(v.img, [400, 800]);
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg group"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={opt.src} 
                      srcSet={opt.srcSet}
                      sizes="(max-width: 768px) 100vw, 500px"
                      alt={v.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif mb-4">{v.name}</h3>
                    <p className="text-text-muted leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ContentBlock 
        layout="text-image"
        title={lang === 'sr' ? 'Tragovi istorije na liticama' : 'Traces of History on the Cliffs'}
        text={lang === 'sr' ? (
          <p>
            Svako{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              krstarenje Uvcem
            </Link>{' '}
            je ujedno i putovanje kroz vreme. Dok plovite od brane Rastoke ka meandrima, ispod vas se krije potopljena tajna — na dubini od preko 60 metara, u tišini jezera, i dalje prkosi vremenu kameni Most na Žvalama iz 16. veka. A na samom ulasku u meandre, na jednom od prvih rtova dočekaće vas ostaci srednjovekovnog utvrđenja poznatog kao Jerinin grad, starog više od šest vekova. U to doba, ovaj kanjon nije bio samo netaknuta divljina, već je kroz njega prolazio karavanski put koji je spajao Dubrovnik sa Carigradom. Upravo su ova tvrđava i potopljeni most nekada bili stanice na tom drevnom putu.
          </p>
        ) : (
          <p>
            Every{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              cruise along the Uvac
            </Link>{' '}
            is also a journey through time. As you sail from Rastoke Dam toward the meanders, a submerged secret lies beneath you — at a depth of over 60 meters, in the silence of the lake, the stone Bridge at Žvale from the 16th century still holds its ground. And at the very entrance to the meanders, on one of the first capes you pass, the remains of a medieval fortification known as Jerinin Grad await you, more than six centuries old. In that era, this canyon was far from untouched wilderness — a caravan route connecting Dubrovnik with Constantinople passed directly through it. Both the fortification and the submerged bridge were once stations along that ancient road.
          </p>
        )}
        image={[
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779463489/most-na-zvalama-uvac.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779476291/jerinin-grad-uvac-v1.webp"
        ]}
      />

      <section className="py-20 bg-uvac-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">{lang === 'sr' ? 'Međunarodni značaj' : 'International Significance'}</h2>
          <p className="text-white/70 mb-16 max-w-2xl mx-auto">{lang === 'sr' ? 'Zbog očuvanosti svojih ekosistema, Kanjon Uvca nije samo lokalno blago, već tačka od međunarodnog značaja. On je deo Emerald mreže i uvršten je na listu najvažnijih staništa za ptice, biljke i leptire na celom kontinentu. Ovo je dom brojnim retkim i ugroženim vrstama koje su u kanjonu pronašle svoje utočište. Zahvaljujući strogo kontrolisanim zonama zaštite, priroda Uvca ostaje čista i netaknuta – upravo onakva kakvu su je viđali putnici vekovima pre nas.' : 'Thanks to the preservation of its ecosystems, the Uvac Canyon is not just a local treasure — it is a site of international significance. It is part of the Emerald Network and has been included on the list of the most important habitats for birds, plants, and butterflies on the continent. This is home to numerous rare and endangered species that have found their refuge in the canyon. Thanks to strictly controlled protection zones, the nature of Uvac remains clean and untouched — exactly as travellers have found it for centuries before us.'}</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Emerald", full: lang === 'sr' ? "Emerald mreža" : "Emerald Network", desc: lang === 'sr' ? "Evropska mreža područja od posebnog značaja za zaštitu prirode, ustanovljena Bernskom konvencijom Saveta Evrope." : "A European network of areas of special interest for nature conservation, established under the Bern Convention of the Council of Europe." },
              { label: "IBA", full: "Important Bird and Biodiversity Areas", desc: lang === 'sr' ? "BirdLife International prepoznao je Uvac kao međunarodno važno stanište ptica, posebno zbog kolonije beloglavog supa." : "BirdLife International has recognised Uvac as an internationally important bird habitat, particularly due to its Griffon Vulture colony." },
              { label: "IPA", full: "Important Plant Area", desc: lang === 'sr' ? "Status koji potvrđuje izuzetno botaničko bogatstvo krečnjačkih litica, klisura i retkih biljnih zajednica." : "A designation confirming the exceptional botanical richness of the limestone cliffs, gorges, and rare plant communities." },
              { label: "PBA", full: "Prime Butterfly Area", desc: lang === 'sr' ? "Prioritetno područje za očuvanje leptira i njihovih staništa, posebno važno u vreme kada brojnost ovih vrsta opada širom Evrope." : "A priority area for the conservation of butterflies and their habitats, of particular importance at a time when butterfly populations across Europe are in serious decline." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-auto lg:flex-1 max-w-[280px]"
              >
                <div className="flex flex-col items-center">
                   <div className="w-32 h-32 rounded-full bg-uvac-dark border-4 border-uvac-accent flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-uvac-accent font-serif text-3xl font-bold">{item.label}</span>
                  </div>
                  <h4 className="text-xl font-serif mb-2">{item.full}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery 
        title={lang === 'sr' ? 'Galerija' : 'Gallery'}
        intro={lang === 'sr' 
          ? 'Fotografije mogu da prikažu lepotu Uvca, ali ne i osećaj plovidbe kroz kanjon, pogled sa vidikovaca ili let beloglavih supova iznad meandara. To su uspomene koje ostaju dugo nakon povratka.' 
          : 'Photos can capture the beauty of Uvac, but not the feeling of sailing through the canyon, the view from the viewpoints, or the flight of Griffon Vultures above the meanders. These are memories that stay with you long after your return.'
        }
        images={[
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779476579/plovidba-kanjonom-uvca.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779476752/ulaz-u-kanjon-uvca.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779476985/uspon-ka-vidikovcu-veliki-vrh.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779477379/plovidba-u-kanjon-uvca.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779477579/stene-kanjona-uvca.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779477971/meandri.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779478302/prelepi-meandri.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779478649/brana-rastoke.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779478897/veliki-vrh-vidikovac.webp"
        ]} 
      />

      <section className="py-20 bg-uvac-sand">
        <div className="container mx-auto px-4">
          <InfoBox variant="tip" title={lang === 'sr' ? 'Saveti za posetioce' : 'Visitor Tips'}>
            <p>{lang === 'sr' ? 'Najbolje vreme za posetu Uvcu je između maja i oktobra, kada se organizuju krstarenja i vremenski uslovi su najpovoljniji za obilazak rezervata. Za obilazak vidikovaca preporučuje se udobna obuća, jer su pojedini delovi staza kameniti. Tokom toplijih dana ponesite dovoljno vode i zaštitu od sunca. Radi bezbednosti i očuvanja prirode, krećite se označenim stazama i izbegavajte približavanje ivicama litica.' : 'The most rewarding time to visit Uvac is between May and October, when boat tours operate and conditions are ideal for exploring the nature reserve. Comfortable footwear is recommended for visiting the viewpoints, as some parts of the trails can be rocky. During warmer days, bring plenty of water and sun protection. For your safety and to help preserve the reserve, stay on marked trails and avoid getting too close to the edges of the cliffs.'}</p>
          </InfoBox>
        </div>
      </section>

      <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />

      <RelatedCards exclude="kanjon-uvca" lang={lang} />
    </main>
  );
};

export default KanjonUvca;
