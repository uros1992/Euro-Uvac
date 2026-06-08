import React from 'react';
import SeoHead from '../../components/SeoHead';
import { getCloudinarySrcSet } from '../../lib/cloudinary';
import { Link } from 'react-router-dom';
import { ExperienceHero } from '../../components/experience/ExperienceHero';
import { ExperienceLead } from '../../components/experience/ExperienceLead';
import { ContentBlock } from '../../components/experience/ContentBlock';
import { InfoBox } from '../../components/experience/InfoBox';
import { RelatedCards } from '../../components/experience/RelatedCards';
import CTA from '../../components/sections/CTA';
import { motion } from 'motion/react';

interface BeloglaviSupProps {
  lang: 'sr' | 'en';
  setIsBookingOpen: (open: boolean) => void;
}

const BeloglaviSup = ({ lang, setIsBookingOpen }: BeloglaviSupProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        "@id": "https://uvacgriffon.rs/iskustvo/beloglavi-sup/#attraction",
        "name": lang === 'sr' ? "Beloglavi sup – Specijalni rezervat prirode Uvac" : "Griffon Vulture – Uvac Special Nature Reserve",
        "description": lang === 'sr'
          ? "Dom jedne od najvećih kolonija beloglavih supova na Balkanu. Posmatranje iz čamca tokom krstarenja Uvcem."
          : "Home to one of the largest colonies of griffon vultures in the Balkans. Observation from the boat during the Uvac cruise.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1778782184/Beloglavi-sup-u-letu.webp",
        "url": "https://uvacgriffon.rs/iskustvo/beloglavi-sup",
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
        "touristType": ["Nature Lovers", "Adventure Seekers", "Photographers", "Birdwatchers"],
        "containedInPlace": {
          "@type": "Park",
          "name": "Specijalni rezervat prirode Uvac",
          "url": "https://uvacgriffon.rs/iskustvo/kanjon-uvca"
        },
            "publicAccess": true
      },
      {
        "@type": "Animal",
        "name": "Beloglavi sup",
        "alternateName": "Griffon Vulture",
        "scientificName": "Gyps fulvus",
        "description": "Najveća ptica Srbije sa rasponom krila do 2,8 metara. Jedna od najvećih kolonija na Balkanu živi u kanjonu Uvca.",
        "image": "https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1778782184/Beloglavi-sup-u-letu.webp",
        "habitat": "Krečnjačke litice kanjona Uvca, jugozapadna Srbija",
        "conservationStatus": "https://schema.org/LeastConcern"
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
            "item": "https://uvacgriffon.rs/iskustvo"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": lang === 'sr' ? "Beloglavi sup" : "Griffon Vulture",
            "item": "https://uvacgriffon.rs/iskustvo/beloglavi-sup"
          }
        ]
      }
    ]
  };

  return (
    <main>
      <SeoHead 
        title={lang === 'sr' ? 'Beloglavi sup – Nebeski kralj Uvca | Uvac Griffon' : 'Griffon Vulture – Sky King of Uvac | Uvac Griffon'}
        description={lang === 'sr' ? 'Upoznajte beloglavog supa, zaštitni znak kanjona Uvca. Saznajte sve o nebeskom kralju našeg kanjona i zašto je krstarenje Uvcem jedno od najboljih mesta za njegovo posmatranje.' : 'Discover the Griffon Vulture, the defining symbol of the Uvac Canyon. Learn all about the sky king of our canyon and why a Uvac cruise is one of the best ways to observe it.'}
        canonicalUrl="https://uvacgriffon.rs/iskustvo/beloglavi-sup"
        ogImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1778782184/Beloglavi-sup-u-letu.webp"
        schema={schema}
      />

      <ExperienceHero 
        title={lang === 'sr' ? 'Beloglavi sup' : 'Griffon Vulture'}
        subtitle={lang === 'sr' ? 'Nebeski kralj Uvca' : 'Sky King of Uvac'}
        backgroundImage="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:good,w_1200/v1778782184/Beloglavi-sup-u-letu.webp"
        imagePosition="center 25%"
        breadcrumbs={[
          { label: lang === 'sr' ? 'Početna' : 'Home', path: '/' },
          { label: lang === 'sr' ? 'Otkrijte Uvac' : 'Discover Uvac', path: '/#iskustvo' },
          { label: lang === 'sr' ? 'Beloglavi sup' : 'Griffon Vulture' }
        ]}
        lang={lang}
        setIsBookingOpen={setIsBookingOpen}
      />

      <ExperienceLead text={lang === 'sr' ? 'Dok krstarite meandrima, visoko iznad kamenih litica ugledaćete najveću pticu Srbije — vrstu koja je preživela milenijume i postala zaštitni znak kanjona Uvca. Pred vama je gospodar neba, a vi ste njegovi gosti. Dobrodošli u dom beloglavog supa.' : 'As you cruise through the meanders, high above the stone cliffs you will spot Serbia\'s largest bird — a species that has survived millennia and become the symbol of the Uvac Canyon. Before you stands the master of the sky, and you are its guests. Welcome to the home of the Griffon Vulture.'} />
     
     <section className="py-20 bg-surface-page">
  <div className="container mx-auto px-4">
    
    {/* BIG STATS SEKCIJA */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-10">
      
      {/* Stat 1 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-6xl md:text-7xl font-serif font-light text-text-primary mb-2">
        {lang === 'sr' ? '2,8 m' : '2.8 m'}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
          {lang === 'sr' ? 'Raspon krila' : 'Wingspan'}
        </span>
      </motion.div>

      {/* Divider (Linija između za desktop) */}
      <div className="hidden md:block w-px h-20 bg-black/10"></div>

      {/* Stat 2 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-6xl md:text-7xl font-serif font-light text-text-primary mb-2">
        {lang === 'sr' ? '8,5 kg' : '8.5 kg'}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
          {lang === 'sr' ? 'Prosečna težina' : 'Average weight'}
        </span>
      </motion.div>

      {/* Divider (Linija između za desktop) */}
      <div className="hidden md:block w-px h-20 bg-black/10"></div>

      {/* Stat 3 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-6xl md:text-7xl font-serif font-light text-text-primary mb-2">20+</span>
        <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-semibold">
          {lang === 'sr' ? 'Godina u divljini' : 'Years in the Wild'}
        </span>
      </motion.div>

    </div>

    {/* ELEGANTNI TEKST ISPOD */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="max-w-3xl mx-auto text-center mt-12 pt-10 border-t border-black/5"
    >
      <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-light">
        {lang === 'sr' ? (
          <>
            Beloglavi sup (<em>Gyps fulvus</em>) je neprikosnoveni čuvar kanjona, biće koje nadgleda ove stene. Specijalni rezervat prirode Uvac predstavlja jedno od poslednjih utočišta ovog veličanstvenog strvinara na Balkanu. Iako svojom grandioznom pojavom podseća na opasnog predatora, on je miroljubivi letač koji nikada ne napada živi plen.
          </>
        ) : (
          <>
            The Griffon Vulture (<em>Gyps fulvus</em>) is the undisputed guardian of the canyon, a being that watches over these cliffs. The Uvac Special Nature Reserve is one of the last sanctuaries for this magnificent scavenger in the Balkans. Although its grandiose appearance resembles a fierce predator, it is a peaceful flyer that never hunts live prey.
          </>
        )}
      </p>
    </motion.div>

  </div>
</section>

      <ContentBlock 
        layout="text-image"
        title={lang === 'sr' ? 'Čuvari zdravlja prirode' : 'Nature\'s Health Guardians'}
        text={lang === 'sr' ? (
          <p>
            Miroljubiva priroda beloglavog supa ima dublju svrhu — on predstavlja ključnu kariku u održavanju zdravlja čitavog kanjona. Kao prirodni higijeničar, hrani se isključivo uginulim životinjama, čime sprečava širenje zaraza i održava ekosistem čistim. Ipak, ova dragocena uloga umalo je postala deo istorije. Devedesetih godina prošlog veka, kolonija na Uvcu bila je svedena na svega desetak preostalih parova, ostavljajući vrstu na samoj ivici nestanka. Zahvaljujući dugogodišnjim programima zaštite i organizovanom hranilištu, populacija je uspešno obnovljena. Danas je{' '}
            <Link to="/iskustvo/kanjon-uvca" className="text-uvac-accent hover:underline font-medium">
              kanjon Uvca
            </Link>{' '}
            jedno od retkih mesta u Evropi gde posetioci mogu redovno da posmatraju velike kolonije beloglavih supova u njihovom prirodnom staništu.
          </p>
        ) : (
          <p>
            The peaceful nature of the Griffon Vulture serves a deeper purpose — it represents a key link in maintaining the health of the entire canyon. As nature's hygienist, it feeds exclusively on carrion, preventing the spread of disease and keeping the ecosystem clean. Yet, this vital role nearly became a thing of the past. In the 1990s, the Uvac colony was reduced to just ten remaining pairs, leaving the species on the very brink of extinction. Thanks to long-standing conservation programs and an organized feeding station, the population has been successfully restored. Today, the{' '}
            <Link to="/iskustvo/kanjon-uvca" className="text-uvac-accent hover:underline font-medium">
              Uvac canyon
            </Link>{' '}
            is one of the rare places in Europe where visitors can regularly observe large colonies of Griffon Vultures in their natural habitat.
          </p>
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1778765965/Portret-beloglavog-supa.webp"
      />

      <ContentBlock 
        layout="image-text"
        title={lang === 'sr' ? 'Gospodari vazdušnih struja' : 'Masters of Air Currents'}
        text={lang === 'sr' ? (
          <p>
            Jedan od najuzbudljivijih trenutaka tokom{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              krstarenja Uvcem
            </Link>{' '}
            jeste susret sa beloglavim supom koji lebdi iznad kanjona bez ijednog zamaha krila. Ovi letači su istinski majstori korišćenja toplih vazdušnih struja (termala) koje se formiraju uz litice. Zahvaljujući njima, oni dostižu visine od preko 2.500 metara uz minimalan utrošak sopstvene energije. Dok mirno krstare brzinom od oko 60 km/h, njihova prava moć se vidi u obrušavanju, kada dostižu neverovatnih 160 km/h. Granice za njih gotovo da ne postoje — ptice markirane na Uvcu zabeležene su na putovanjima dugim preko 2.000 kilometara, stižući čak do Izraela, Estonije, pa i daleke Afrike.  Malo je mesta u Evropi gde se ovako impresivan susret sa divljim životinjama može doživeti sa palube čamca, u srcu netaknute prirode.
          </p>
        ) : (
          <p>
            One of the most thrilling moments during a{' '}
            <Link to="/tura" className="text-uvac-accent hover:underline font-medium">
              Uvac cruise
            </Link>{' '}
            is encountering a Griffon Vulture hovering above the canyon without a single wingbeat. These birds are true masters of thermal currents — the warm columns of air that rise along the canyon. Thanks to these, they can reach altitudes of over 2,500 meters with minimal energy expenditure. While they usually cruise at a speed of about 60 km/h, their true power is revealed in a dive, where they can reach an astonishing 160 km/h. For them, borders barely exist — birds tagged at Uvac have been recorded on journeys of over 2,000 kilometers, reaching as far as Israel, Estonia, and even distant Africa. Few places in Europe offer such an impressive wildlife encounter from the deck of a boat, in the heart of untouched nature.
          </p>
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1778786520/beloglavi-sup-u-letu-iznad-uvca.webp"
      />

      <ContentBlock 
        layout="text-image"
        title={lang === 'sr' ? 'Porodični život na liticama' : 'Family Life on the Cliffs'}
        text={lang === 'sr' ? (
          'Dok plovite kroz kanjon Uvca, obratite pažnju na skrivene pećine i nepristupačne police u stenama — tu se nalaze njihova gnezda. Beloglavi supovi stvaraju trajne partnerske veze i iz godine u godinu vraćaju se istim liticama. Njihov opstanak je dragocen i spor — ženka polaže samo jedno jaje godišnje, na kojem oba roditelja naizmenično leže sa neverovatnom posvećenošću. Mladunac provodi oko 110 dana u sigurnosti gnezda pre nego što se prvi put usudi da raširi krila iznad kanjona, krećući u život koji u prirodi može trajati i preko 20 godina. Ako budete imali sreće, tokom krstarenja možda ćete ugledati mlade supove kako uče da koriste vazdušne struje i prave prve krugove iznad litica koje će jednog dana nazivati domom.'
        ) : (
          "As you sail through the Uvac canyon, keep an eye on the hidden caves and inaccessible rocky ledges — this is where their nests are found. Griffon Vultures form lasting pair bonds and return to the same cliffs year after year. Their survival is both precious and slow — the female lays only one egg per year, which both parents take turns incubating with incredible devotion. The chick spends about 110 days in the safety of the nest before attempting its first flight over the canyon, beginning a life that can last over 20 years in the wild. If you're lucky, during the cruise you may spot young vultures learning to ride the air currents, making their first circles above the cliffs they will one day call home."
        )}
        image="https://res.cloudinary.com/dejmpunhb/image/upload/v1778786995/beloglavi-sup-i-mladunac-u-gnezdu.webp"
      />

      <ContentBlock 
        layout="full-width"
        dark
        title={lang === 'sr' ? 'Nasleđe uklesano u nebo i kamen' : 'Heritage Carved in Sky and Stone'}
        text={lang === 'sr' ? 'Beloglavi sup nije samo stanovnik litica, već ptica koja je vekovima ostavljala trag u kulturi i predanjima ovih prostora. U pojedinim tumačenjima, njegov lik prepoznaje se i u motivu dvoglavog orla, koji je krasio grbove najmoćnijih srpskih dinastija — od Nemanjića do Crnojevića. Fascinantna je teorija da je upravo specifična poza sunčanja, u kojoj sup širi krila kako bi regulisao vlagu, mogla poslužiti kao inspiracija srednjovekovnim umetnicima za stvaranje nacionalnog simbola. Njegovo prisustvo je ovekovečeno u kamenu crkve Bogorodice Ljeviške i na zidovima Lazarice, gde se i danas nalazi jedan od najbolje očuvanih grbova iz 1375. godine. Veza sa narodom nije bila samo simbolična; pastiri su vekovima od šupljih krilnih kostiju supa izrađivali frule, pretvarajući moć neba u melodiju zemlje. Dok danas krstarite kanjonom i posmatrate njihov let iznad meandara Uvca, ne gledate samo u najveću pticu Srbije. Gledate vrstu koja je vekovima bila deo istorije, verovanja i svakodnevnog života ljudi ovog kraja.' : 'The Griffon Vulture is not merely a cliff dweller — it is a bird that has left its mark on the culture and traditions of this region for centuries. In some interpretations, its image is recognized in the motif of the double-headed eagle that adorned the crests of medieval Serbian ruling dynasties, from the Nemanjić to the Crnojević. There is a fascinating theory that the bird\'s distinct sun-basking pose, where it spreads its wings to regulate moisture, could have served as an inspiration for medieval artists to create the national emblem. Its presence is immortalized in the stonework of Our Lady of Ljeviš and on the walls of the Lazarica church, which still houses one of the best-preserved crests from 1375. The bond with the people was never purely symbolic. For centuries, shepherds crafted flutes from the hollow wing bones of vultures, turning the power of the sky into the melody of the earth. As you cruise the canyon today and watch them soar above the meanders of Uvac, you are not simply looking at Serbia\'s largest bird. You are looking at a species that has been part of the history, beliefs, and everyday life of the people of this land for centuries.'}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {[
            { img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1780827235/beloglavi-sup-u-pozi-suncanja-v2.webp", caption: lang === 'sr' ? 'Beloglavi sup u pozi sunčanja' : 'A griffon vulture in a sunbathing pose' },
            { img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1779382197/dvoglavi-sup.webp", caption: lang === 'sr' ? 'Ornament na zidu crkve Lazarice' : 'Ornament on the wall of the Church of Lazarica' },
            { img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1779395107/Bogorodica-Ljeviska-1307-1310-beloglavi-sup.webp", caption: lang === 'sr' ? 'Crkva Bogorodice Ljeviške' : 'Our Lady of Ljeviš Church' }
          ].map((item, i) => {
            const opt = getCloudinarySrcSet(item.img, [400, 800]);
            return (
              <div key={i} className="text-center">
                <img 
                  src={opt.src} 
                  srcSet={opt.srcSet}
                  sizes="(max-width: 768px) 100vw, 300px"
                  alt={item.caption} 
                  className="w-full aspect-[4/5] object-cover rounded-lg shadow-lg mb-3" 
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={500}
                />
                <p className="text-white/60 text-sm italic">{item.caption}</p>
              </div>
            );
          })}
        </div>
      </ContentBlock>

     {/* ============================================ */}
{/* SEKCIJA: NARODNA VEROVANJA I LEGENDE         */}
{/* ============================================ */}

{/* 1. UVODNA SEKCIJA */}
<section className="py-20 bg-surface-page">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-5xl font-serif text-center mb-12">
      {lang === 'sr' 
        ? 'Narodna verovanja i legende' 
        : 'Folk Beliefs and Legends'}
    </h2>
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-xl text-text-muted leading-relaxed">
        {lang === 'sr' 
          ? 'Hiljadama godina ljudi su u beloglavom supu videli mnogo više od ptice. Njegov let iznad litica, pojava na mestima smrti i gotovo nestvarna sposobnost da satima lebdi nebom učinili su ga simbolom moći, zaštite, prelaska između svetova i obnove života. Od praistorijskih rituala do narodnih predanja Balkana, sup je ostavio trag duboko u ljudskoj mašti. Stojeći danas ispod litica Uvca, lako je razumeti zašto.' 
          : 'For thousands of years, people have seen much more than a bird in the Griffon Vulture. Its flight above the cliffs, its appearance at sites of death, and its almost unearthly ability to hover in the sky for hours made it a symbol of power, protection, passage between worlds, and the renewal of life. From prehistoric rituals to the folk traditions of the Balkans, the vulture has left a deep mark on the human imagination. Standing beneath the cliffs of Uvac today, it becomes easy to understand why.'}
      </p>
    </div>
  </div>
</section>

{/* 2. OD PEĆINSKIH RITUALA DO DREVNIH CIVILIZACIJA */}
<ContentBlock 
  layout="full-width"
  title={lang === 'sr' 
    ? 'Od pećinskih rituala do drevnih civilizacija' 
    : 'From Cave Rituals to Ancient Civilizations'}
  text={
    <div className="max-w-4xl mx-auto space-y-8 text-center">
      <p className="text-lg opacity-90 leading-relaxed">
        {lang === 'sr' 
          ? 'Ljudska fascinacija ovim pticama traje desetinama hiljada godina. Jedan od najstarijih poznatih tragova te veze pronađen je u pećini Hohle Fels u Nemačkoj. Tamo je otkrivena frula izrađena od krilne kosti beloglavog supa, stara između 35.000 i 40.000 godina, koja se smatra jednim od najstarijih muzičkih instrumenata ikada pronađenih. Supovi se pojavljuju i u praistorijskoj umetnosti južne Afrike, kao i u ritualnim prikazima Čatal Hujuka, povezanim sa običajima „nebeske sahrane“.'
          : 'Human fascination with these birds stretches back tens of thousands of years. One of the oldest known traces of that connection was found in the Hohle Fels cave in Germany, where a flute carved from a Griffon Vulture wing bone was discovered — estimated to be between 35,000 and 40,000 years old, and considered one of the oldest musical instruments ever found. Vultures also appear in the prehistoric art of southern Africa and in the ritual depictions of Çatalhöyük, linked to the customs of "sky burials."'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 max-w-3xl mx-auto">
        {[
          { 
            img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1779383061/hohle-fels-frula.webp", 
            caption: lang === 'sr' 
              ? 'Praistorijska frula od krilne kosti supa pronađena u pećini Hohle Fels' 
              : 'Prehistoric flute made of vulture wing bone discovered in Hohle Fels cave' 
          },
          { 
            img: "https://res.cloudinary.com/dejmpunhb/image/upload/v1779392594/beloglavi-sup-egipat.webp", 
            caption: lang === 'sr' 
              ? 'Drevni prikaz supa kao simbola božanstva u Starom Egiptu' 
              : 'Ancient depiction of the vulture as a symbol of divinity in Ancient Egypt' 
          }
        ].map((item, i) => {
          const opt = getCloudinarySrcSet(item.img, [400, 800]);
          return (
            <div key={i} className="text-center">
              <img 
                src={opt.src} 
                srcSet={opt.srcSet}
                sizes="(max-width: 768px) 100vw, 400px"
                alt={item.caption} 
                className="w-full aspect-[4/3] object-cover rounded-lg shadow-md mb-3" 
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
              />
              <p className="text-text-muted text-sm italic">{item.caption}</p>
            </div>
          );
        })}
      </div>

      <p className="text-lg opacity-90 leading-relaxed">
        {lang === 'sr' 
          ? 'Beloglavi sup ostavio je trag i u velikim civilizacijama drevnog sveta. U Starom Egiptu povezivan je sa boginjama Nekhebet i Mut, u Persiji se pojavljuje uz prikaze Ahura Mazde, dok ga nalazimo i u sumerskim zapisima, grčkim mitovima i narodnim legendama koje su opstale kroz vekove.'
          : 'The Griffon Vulture also left its mark on the great civilizations of the ancient world. In Ancient Egypt, it was associated with the goddesses Nekhbet and Mut, in Persia it appears alongside depictions of Ahura Mazda, while it can also be found in Sumerian records, Greek myths, and folk legends that have endured through the centuries.'}
      </p>
    </div>
  }
/>

{/* 3. SUP U NARODNOM VEROVANJU */}
<ContentBlock 
  layout="full-width"
  title={lang === 'sr' 
    ? 'Sup u narodnom verovanju' 
    : 'The Vulture in Folk Belief'}
  text={lang === 'sr' 
    ? 'U narodnim predanjima Balkana, beloglavi sup nije bio obična ptica. Verovalo se da predvodi oluje, rasteruje oblake i da „glavni“ sup u jatu sanja gde će pronaći hranu, pa ostale vodi do tog mesta. Meštani su izbegavali da broje supove, verujući da bi to moglo doneti uginuće stoke, dok se ubijanje ove ptice smatralo prizivanjem nesreće na kuću i porodicu. Njegovo pero vekovima je nošeno kao ukras, zaštita ili amajlija protiv zlih sila, a u narodu se govorilo da beloglavi sup može „živeti orlova veka“ — gotovo nestvarno dugo.' 
    : 'In the folk traditions of the Balkans, the Griffon Vulture was no ordinary bird. It was believed to lead storms, scatter clouds, and that the "chief" vulture in a flock would dream of where to find food, then lead the others to that place. Locals avoided counting vultures, believing it could cause livestock to perish, while killing one was considered an invitation of misfortune upon the house and family. Its feather was worn for centuries as an ornament, protection, or amulet against evil forces, and it was said among the people that the Griffon Vulture could "live an eagle\'s age" — an almost impossibly long life.'}
  
/>

      <section className="py-20 bg-uvac-sand">
        <div className="container mx-auto px-4">
          <InfoBox variant="tip" title={lang === 'sr' ? 'Savet za posetioce' : 'Visitor Tip'}>
            <p>{lang === 'sr' ? 'Ponesite dvogled. Na krilima pojedinih beloglavih supova nalaze se markice koje omogućavaju naučnicima da prate njihova putovanja širom Evrope i Afrike. Ako primetite neku od njih, možda upravo posmatrate pticu koja se vratila sa hiljadama kilometara dugog puta. Najlepši susreti sa ovim veličanstvenim letačima dešavaju se u tišini.' : 'Bring binoculars. On the wings of some Griffon Vultures, you may spot colored tags that help scientists track their journeys across Europe and Africa. If you notice one, you might be watching a bird that has just returned from a journey of thousands of kilometers. The most memorable encounters with these magnificent flyers happen in silence.'}</p>
          </InfoBox>
        </div>
      </section>

      <CTA lang={lang} setIsBookingOpen={setIsBookingOpen} />

      <RelatedCards exclude="beloglavi-sup" lang={lang} />
    </main>
  );
};

export default BeloglaviSup;
