import React, { useState } from 'react';
import SeoHead from '../components/SeoHead';
import { getCloudinarySrcSet } from '../lib/cloudinary';
import { Link } from 'react-router-dom';
import { ExperienceHero } from '../components/experience/ExperienceHero';
import { ExperienceLead } from '../components/experience/ExperienceLead';
import { ContentBlock } from '../components/experience/ContentBlock';
import { InfoBox } from '../components/experience/InfoBox';
import { RelatedCards } from '../components/experience/RelatedCards';
import CTA from '../components/sections/CTA';
import { motion } from 'motion/react';

interface LedenaPecinaProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

const LedenaPecina = ({ lang, setIsBookingOpen }: LedenaPecinaProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TouristAttraction", "Cave"],
        "@id": "https://uvacgriffon.rs/ledena-pecina/#cave",
        "name": lang === 'sr' ? "Ledena pećina" : "Ice Cave",
        "description": lang === 'sr'
          ? "Jedina pećina u Srbiji dostupna isključivo čamcem. Deo Ušačkog pećinskog sistema, duga 2,5 km sa stalnom temperaturom od 8°C."
          : "The only cave in Serbia accessible only by boat. Part of the Ušak cave system, 2.5 km long with a constant temperature of 8°C.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665120/ledena-pecina-uvac.webp",
        "url": "https://uvacgriffon.rs/ledena-pecina",
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
        "touristType": ["Nature Lovers", "Adventure Seekers", "Adventure travelers", "Spelunkers", "Families"],
        "isAccessibleForFree": false,
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": lang === 'sr' ? "Temperatura" : "Temperature",
            "value": lang === 'sr' ? "8°C konstantno" : "8°C constant"
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": lang === 'sr' ? "Dužina staze" : "Trail length",
            "value": lang === 'sr' ? "700 metara" : "700 meters"
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": lang === 'sr' ? "Pristup" : "Access",
            "value": lang === 'sr' ? "Isključivo čamcem" : "Exclusively by boat"
          }
        ],
        "containedInPlace": {
          "@type": "Park",
          "name": lang === 'sr' ? "Specijalni rezervat prirode Uvac" : "Uvac Special Nature Reserve",
          "url": "https://uvacgriffon.rs/kanjon-uvca"
        },
        "offers": {
          "@type": "Offer",
          "price": "270",
          "priceCurrency": "RSD",
          "name": lang === 'sr' ? "Ulaznica za Ledenu pećinu" : "Ice Cave Entry Ticket"
        }
      }
    ]
  };

  return (
    <main>
      <SeoHead 
        title={lang === 'sr' ? 'Ledena pećina – Krstarenje Uvcem | Uvac Griffon' : 'Ice Cave – Uvac Cruise | Uvac Griffon'}
        description={lang === 'sr' ? 'Istražite Ledenu pećinu, skriveni dragulj kanjona Uvca sa stalnom temperaturom od 8°C i fascinantnim pećinskim nakitom.' : 'Explore the Ice Cave, a hidden gem of the Uvac Canyon with a constant temperature of 8°C and fascinating cave jewelry.'}
        canonicalUrl="https://uvacgriffon.rs/ledena-pecina"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665120/ledena-pecina-uvac.webp"
        schema={schema}
      />

      <ExperienceHero 
        title={lang === 'sr' ? 'Ledena pećina' : 'Ice Cave'}
        subtitle={lang === 'sr' ? 'Skriveni dragulj kanjona Uvca' : 'Hidden Gem of Uvac Canyon'}
        backgroundImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1777665120/ledena-pecina-uvac.webp"
        breadcrumbs={[
          { label: lang === 'sr' ? 'Početna' : 'Home', path: '/' },
          { label: lang === 'sr' ? 'Otkrijte Uvac' : 'Discover Uvac', path: '/#otkrijte-uvac' },
          { label: lang === 'sr' ? 'Ledena pećina' : 'Ice Cave' }
        ]}
        lang={lang}
        setIsBookingOpen={setIsBookingOpen}
      />

      <ExperienceLead text={lang === 'sr' ? 'Do Ledene pećine, skrivene duboko u liticama kanjona Uvca u Srbiji, ne vode ni putevi ni staze – njenom tajnom ulazu može se prići isključivo sa vode. Predstavlja najimpozantniji deo Ušačkog pećinskog sistema, 2,5 kilometra dug podzemni svet u kome priroda milenijumima oblikuje stubove, draperije i pećinski nakit u potpunom mraku. Ovde, na konstantnih 8°C, vreme se meri odjecima vaših koraka.' : 'No roads or trails lead to the Ice Cave, hidden deep within the cliffs of Uvac canyon in Serbia—its secret entrance is accessible only from the water. It stands as the most imposing part of the Ušak cave system, a 2.5-kilometer-long underground world where nature has spent millennia patiently sculpting white pillars and ornate draperies in total darkness. Here, at a constant 8°C, time is measured by the echoes of your footsteps.'} />
      

      <ContentBlock 
        layout="image-text"
        title={lang === 'sr' ? 'Jedinstven pristup i lokacija' : 'Unique Access and Location'}
        text={lang === 'sr' ? (
          <p>
            Vaša ekspedicija počinje tokom{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              krstarenja Uvcem
            </Link>
            , na smaragdnoj vodi, gde se meandri sužavaju, a litice postaju sve strmije. Skriveni ulaz u pećinu otvara se visoko u krševitoj steni, na mestu gde se reka oštro lomi. Dok se čamcem približavate obali u srcu{' '}
            <Link to="/kanjon-uvca" className="text-uvac-accent hover:underline font-medium">
              kanjona Uvca
            </Link>
            , direktno preko puta vas naziru se sivi kameni ostaci Jerininog grada — tvrđave koja vekovima čuva ovaj ulaz. Taj susret istorije na liticama i nepoznatog u podzemlju stvoriće u vama osećaj istinske avanture i pre nego što zakoračite u prvu dvoranu.
          </p>
        ) : (
          <p>
            Your expedition begins during the{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              Uvac cruise
            </Link>
            , on emerald water where the meanders narrow and the cliffs grow steeper. A hidden entrance to the cave opens high in the craggy rock, at the point where the river makes a sharp turn. As you approach the shore in the heart of the{' '}
            <Link to="/kanjon-uvca" className="text-uvac-accent hover:underline font-medium">
              Uvac Canyon
            </Link>
            , directly across from you, the gray stone remains of Jerinin grad come into view — a fortress that has guarded this entrance for centuries. This meeting of history on the cliffs and the unknown underground will create a sense of true adventure within you even before you step into the first chamber.
          </p>
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1779348726/ulaz-u-ledenu-pecinu.webp"
      />

      <ContentBlock 
        layout="text-image"
        title={lang === 'sr' ? 'Bogatstvo pećinskog nakita' : 'Rich Cave Formations'}
        text={lang === 'sr' ? 'Unutrašnjost Ledene pećine čini niz povezanih dvorana ispunjenih najfinijim pećinskim ukrasom. Njenim enterijerom dominiraju vitki beli stubovi i masivne draperije koje poput okamenjenih zavesa padaju sa svodova. Dok prolazite kroz ovaj hladni kameni svet, okruženi ste formacijama koje pod svetlima lampi izazivaju divljenje. Svaki korak dublje u pećinu, na uređenoj stazi dugoj skoro 700 metara, otkriva novi sloj nakita koji je priroda strpljivo vajala, kap po kap, u potpunoj tišini i mraku.' : 'The interior of the Ice Cave consists of a series of interconnected chambers filled with the finest cave decorations. The caverns are dominated by slender white pillars and massive draperies that hang from the ceilings like petrified curtains. As you pass through this cool stone world, you are surrounded by formations that inspire awe under the lantern light. Each step deeper into the cave, along a maintained path nearly 700 meters long, reveals a new layer of jewelry that nature has patiently sculpted, drop by drop, in total silence and darkness.'}
        image={[
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779351152/ledena-pecina-1.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779351616/ledena-pecina-2.webp",
          "https://res.cloudinary.com/dejmpunhb/image/upload/v1779349409/ledena-pecina-3.webp"
        ]}
      />

      <ContentBlock 
        layout="image-text"
        title={lang === 'sr' ? 'Drevna istorija i nastanak' : 'Ancient History and Origin'}
        text={lang === 'sr' ? (
          <p>
            Dok hodate kroz Ledenu pećinu, koračate kroz dvorane koje su počele da se formiraju pre neverovatnih 2,5 miliona godina, u osvit pleistocena. Ona je zapravo fosilizovano korito drevne reke koja je nekada tekla ovuda. Dok se kanjon Uvca milenijumima produbljivao, reka je polako napuštala ove kanale i povlačila se u dublje nivoe, ostavljajući za sobom svet koji je ostao netaknut i skriven, dok su se na površini iznad njega menjale epohe i civilizacije.
          </p>
        ) : (
          <p>
            As you walk through the Ice Cave, you are walking through chambers that began forming an incredible 2.5 million years ago, at the dawn of the Pleistocene. It is, in fact, the fossilized riverbed of an ancient river that once flowed through here. As the Uvac canyon deepened over millennia, the river slowly abandoned these channels and withdrew to deeper levels, leaving behind a world that remained untouched and hidden, while epochs and civilizations changed on the surface above it.
          </p>
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1779356090/ledena-pecina-istorija.webp"
      />

      <section className="py-20 bg-uvac-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-white">{lang === 'sr' ? 'Skriveni stanovnici' : 'Hidden Inhabitants'}</h2>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            {lang === 'sr' ? (
              <>
                Ono što su{' '}
                <Link to="/beloglavi-sup" className="text-uvac-accent hover:underline font-medium">
                  beloglavi supovi
                </Link>{' '}
                za nebo iznad kanjona, to su njeni skriveni stanovnici za tišinu Ledene pećine — njeni najvažniji i najverniji čuvari. Dok supovi gospodare liticama, u dubini mraka život pulsira na potpuno drugačiji, skriveni način. Pećina nije samo prirodni muzej, već strogo zaštićeno utočište za kolonije slepih miševa i retku pećinsku stonogu, endemsku vrstu koja nastanjuje samo ove prostore. Njihovo prisustvo nam govori da je ovaj podzemni svet ostao čist, netaknut i jednako važan za prirodu kao i same litice iznad njega.
              </>
            ) : (
              <>
                What the{' '}
                <Link to="/beloglavi-sup" className="text-uvac-accent hover:underline font-medium">
                  Griffon Vultures
                </Link>{' '}
                are to the skies above the canyon, its hidden inhabitants are to the silence of the Ice Cave — its most vital and loyal guardians. While the vultures rule the cliffs, life pulses in a completely different, hidden way within the depths of the darkness. The cave is not merely a natural museum, but a strictly protected sanctuary for colonies of bats and a rare cave centipede, an endemic species that inhabits only this space. Their presence tells us that this underground world has remained pure, untouched, and just as important to nature as the very cliffs above it.
              </>
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: lang === 'sr' ? "Mali potkovičar" : "Lesser Horseshoe Bat", latin: "Rhinolophus hipposideros", desc: lang === 'sr' ? "Zimi spava u pećinama, leta provodi u manjim kolonijama." : "Sleeps in caves in winter, spends the summer in smaller colonies.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1778793641/Rhinolophus-hipposideros.webp" },
              { name: lang === 'sr' ? "Riđi večernjak" : "Geoffroy's Bat", latin: "Myotis emarginatus", desc: lang === 'sr' ? "Preferira hladne i vlažne prostore." : "Prefers cold and moist spaces.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1778793874/Myotis-emarginatus.webp" },
              { name: lang === 'sr' ? "Obični slepi mišić" : "Common Pipistrelle", latin: "Pipistrellus pipistrellus", desc: lang === 'sr' ? "Najmanji kod nas, veoma okretan." : "Our smallest bat, very agile.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1778871353/Pipistrellus-pipistrellus.webp" },
              { name: lang === 'sr' ? "Evropski dugokrilaš" : "Schreibers's Long-fingered Bat", latin: "Miniopterus schreibersii", desc: lang === 'sr' ? "Brzi letač, hrani se insektima." : "A fast flier, feeds on insects.", img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1780831798/Miniopterus-schreibersii.webp" },
              { 
                name: lang === 'sr' ? "Pećinska stonoga" : "Cave Centipede", 
                latin: "Haasea lacusnigiri microcorna", 
                desc: lang === 'sr' ? "Endemska vrsta specifična za ovaj kraj." : "An endemic species specific to this region.", 
                img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1778872888/Haasea-lacusnigiri-microcorna.webp",
                isWide: true 
              }
            ].map((item, i) => {
              const opt = getCloudinarySrcSet(item.img, item.isWide ? [160, 320] : [100, 200]);
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 p-6 rounded-xl text-center overflow-hidden border border-white/5"
                >
                  <img 
                    src={opt.src} 
                    srcSet={opt.srcSet}
                    sizes={item.isWide ? "160px" : "96px"}
                    alt={item.name} 
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    className={`mx-auto mb-4 object-cover border-4 border-white/20 shadow-md transition-transform duration-300 ease-in-out cursor-pointer relative ${
                      item.isWide ? "w-40 h-24 rounded-xl" : "w-24 h-24 rounded-full"
                    } ${expandedIndex === i ? "scale-150 z-50" : "hover:scale-150 z-10"}`} 
                    loading="lazy"
                    decoding="async"
                    width={item.isWide ? 160 : 96}
                    height={96}
                  />
                  <h4 className="font-bold text-white mb-1">{item.name}</h4>
                  <p className="text-xs italic text-uvac-accent mb-3">{item.latin}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALLOUT SECTION */}
      <section className="py-20 bg-surface-page text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
              {lang === 'sr'
                ? 'Doživite Uvac iz potpuno drugačije perspektive — sa vode, iz vazduha kroz poglede na beloglave supove i ispod zemlje u fascinantnom svetu Ledene pećine. Rezervišite svoje krstarenje Uvcem i otkrijte jedno od najskrivenijih prirodnih blaga Srbije.'
                : 'Experience Uvac from a completely different perspective — from the water, from the air through views of Griffon Vultures, and underground in the fascinating world of the Ice Cave. Book your Uvac cruise and discover one of Serbia\'s most hidden natural treasures.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-uvac-sand">
        <div className="container mx-auto px-4">
          <InfoBox variant="tip" title={lang === 'sr' ? 'Saveti za posetioce' : 'Visitor Tips'}>
            <p>{lang === 'sr' ? 'Dok prolazite kroz Ledenu pećinu, krećete se kroz osetljiv prirodni ambijent koji je nastajao milionima godina. Na pojedinim delovima staze podloga može biti klizava, pa hodajte pažljivo. Pećinske formacije su izuzetno krhke i strogo zaštićene, zbog čega ih nije dozvoljeno dodirivati niti oštećivati. Tišina je ovde deo doživljaja i važna je za očuvanje kolonija slepih miševa koje pećinu smatraju svojim domom.' : 'As you explore the Ice Cave, you are moving through a delicate natural environment shaped over millions of years. Some sections of the trail may be slippery, so please walk carefully. The cave formations are extremely fragile and strictly protected, and must not be touched or damaged. Silence is part of the experience here and plays an important role in protecting the bat colonies that call this cave home.'}</p>
          </InfoBox>
        </div>
      </section>

      <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />

      <RelatedCards exclude="ledena-pecina" lang={lang} />
    </main>
  );
};

export default LedenaPecina;
