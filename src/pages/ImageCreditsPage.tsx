import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';

interface CreditItem {
  subject: { sr: string; en: string };
  author: string;
  license: string;
  licenseUrl?: string;
  originalUrl: string;
}

const creditItems: CreditItem[] = [
    {
    subject: {
      sr: "Rhinolophus hipposideros",
      en: "Rhinolophus hipposideros"
    },
    author: "Lylambda / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    originalUrl: "https://en.wikipedia.org/wiki/File:Bat(20070605).jpg"
  },
  {
    subject: {
      sr: "Myotis emarginatus",
      en: "Myotis emarginatus"
    },
    author: "Rémi Bigonneau / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    originalUrl: "https://sr.wikipedia.org/wiki/%D0%94%D0%B0%D1%82%D0%BE%D1%82%D0%B5%D0%BA%D0%B0:Myotis_emarginatus.jpg"
  },
  {
    subject: {
      sr: "Pipistrellus pipistrellus",
      en: "Pipistrellus pipistrellus"
    },
    author: "Drahkrub / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    originalUrl: "https://en.wikipedia.org/wiki/File:Pipistrellus_female-1.jpg"
  },
  {
    subject: {
      sr: "Miniopterus schreibersii",
      en: "Miniopterus schreibersii"
    },
    author: "Raffaele Maiorano / Wikimedia Commons",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Miniopterus_schreibersii_450099632.jpg"
  },
  {
    subject: {
      sr: "Hohle Fels frula",
      en: "Hohle Fels flute"
    },
    author: "Tomatenpflanze / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Fl%C3%B6te_aus_G%C3%A4nsegeierknochen_vom_Hohle_Fels_im_urmu.jpg"
  },
  {
    subject: {
      sr: "Porodični život na liticama",
      en: "Cliff-side Family Life"
    },
    author: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Gryphon_vulture_(Gyps_fulvus)_and_chick_in_nest.jpg"
  },
  {
    subject: {
      sr: "Hero slika beloglavog supa",
      en: "Hero Image - Flying Griffon Vulture"
    },
    author: "Artemy Voikhansky / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Flying_griffon_vulture.jpg"
  },
  {
    subject: {
      sr: "Čuvari zdravlja prirode",
      en: "Stewards of Nature's Health"
    },
    author: "Artemy Voikhansky / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_griffon_vulture.jpg"
  },
  {
    subject: {
      sr: "Gospodari vazdušnih struja",
      en: "Masters of Wind Currents"
    },
    author: "Ivanbuki / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Eurasian_griffon_vulture_flying_over_nature_reserve_Uvac,_Serbia_02.jpg"
  },
  {
    subject: {
      sr: "Beloglavi sup u pozi sunčanja",
      en: "Griffon Vulture Sunbathing"
    },
    author: "Meine Mutter (Erlaubnis liegt vor) / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:2012-09-15_Tierpark_Berlin_48.jpg"
  },
  {
    subject: {
      sr: "Čuvari neba iznad kanjona",
      en: "Sky Guardians Above the Canyon"
    },
    author: "Thomas Quine / Wikimedia Commons",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:Silhouette_of_a_vulture_(25985116121).jpg"
  },
  {
    subject: {
      sr: "Most na reci Uvac - Žvale",
      en: "Bridge on the Uvac River - Žvale"
    },
    author: "Mirko.Kovacevic / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
    originalUrl: "https://commons.wikimedia.org/wiki/File:%D0%9C%D0%BE%D1%81%D1%82_%D0%BD%D0%B0_%D1%80%D0%B5%D1%86%D0%B8_%D0%A3%D0%B2%D0%B0%D1%86_-_%D0%96%D0%B2%D0%B0%D0%BB%D0%B5.jpg"
  },
  {
    subject: {
      sr: "Meandri Uvca — Svetski fenomen",
      en: "Uvac Meanders — World Phenomenon"
    },
    author: "Anton Lukin / Unsplash",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    originalUrl: "https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-surrounded-by-land-Er_hANfSZ6g"
  }
];

const translations = {
  sr: {
    title: "Zasluge i licence za slike",
    intro: "Ova web stranica koristi fotografije i ilustracije preuzete od trećih strana pod licencama koje dozvoljavaju njihovu upotrebu. U nastavku je navedena lista svih slika sa odgovarajućim informacijama o autorima, izvorima i licencama.",
    colSubject: "Slika / Tema",
    colAuthor: "Autor / Izvor",
    colLicense: "Licenca",
    colUrl: "Originalni link",
    disclaimerTitle: "Važna napomena",
    disclaimerText: "Svi žigovi, fotografije i zaštićeni materijali ostaju vlasništvo njihovih autora i vlasnika. Slike se koriste u skladu sa uslovima pripadajućih licenci. Ako ste vlasnik autorskih prava i smatrate da su informacije o zaslugama netačne ili nepotpune, molimo vas da nas kontaktirate i mi ćemo odmah pregledati i ažurirati podatke.",
    backToHome: "Nazad na početnu",
    licenseText: "Poseti stranicu licence",
    viewOriginal: "Pogledaj"
  },
  en: {
    title: "Image Credits & Licenses",
    intro: "This website uses photographs and illustrations obtained from third-party sources under licenses that permit their use. Below is a list of these images along with proper attribution to their respective authors, sources, and applicable licenses.",
    colSubject: "Image / Subject",
    colAuthor: "Author / Source",
    colLicense: "License",
    colUrl: "Original URL",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "All trademarks, photographs, and copyrighted materials remain the property of their respective owners. Images are used in accordance with the terms of their respective licenses. If you are a copyright holder and believe any attribution is incorrect, please contact us and we will promptly review and update the information.",
    backToHome: "Back to Home",
    licenseText: "View license details",
    viewOriginal: "View file"
  }
};

interface ImageCreditsPageProps {
  lang: 'sr' | 'en';
}

export default function ImageCreditsPage({ lang }: ImageCreditsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = translations[lang];

  return (
    <div className="pt-28 pb-16 min-h-screen bg-stone-50 text-gray-800 font-sans">
      <SeoHead 
        title={lang === 'sr' ? 'Zasluge za slike – Uvac Griffon' : 'Image Credits – Uvac Griffon'}
        description={lang === 'sr' ? 'Detaljan pregled autorskih prava, licenci i zasluga za korišćene slike na sajtu Uvac Griffon.' : 'Detailed list of image credits, licenses, and attributions used on the Uvac Griffon website.'}
        canonicalUrl="https://uvacgriffon.rs/image-credits"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-serif font-bold text-uvac-dark mb-4">{t.title}</h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {t.intro}
          </p>
        </div>

        {/* Clean card container for responsive table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-cream/25 border-b border-gray-100 text-uvac-dark font-serif font-bold text-sm md:text-base">
                  <th className="p-4 md:p-6">{t.colSubject}</th>
                  <th className="p-4 md:p-6">{t.colAuthor}</th>
                  <th className="p-4 md:p-6">{t.colLicense}</th>
                  <th className="p-4 md:p-6">{t.colUrl}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                {creditItems.map((item, index) => (
                  <tr key={index} className="hover:bg-stone-50/50 transition">
                    {/* Subject */}
                    <td className="p-4 md:p-6 font-medium text-gray-900 font-serif">
                      {item.subject[lang]}
                    </td>
                    
                    {/* Author & Source */}
                    <td className="p-4 md:p-6 text-gray-600">
                      {item.author}
                    </td>
                    
                    {/* License */}
                    <td className="p-4 md:p-6">
                      {item.licenseUrl ? (
                        <a 
                          href={item.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-uvac-accent font-medium hover:underline inline-flex items-center"
                          title={t.licenseText}
                        >
                          {item.license}
                        </a>
                      ) : (
                        <span className="text-gray-500">{item.license}</span>
                      )}
                    </td>
                    
                    {/* Original URL */}
                    <td className="p-4 md:p-6">
                      <a 
                        href={item.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-uvac-accent hover:text-uvac-accent/80 hover:underline font-medium break-all"
                      >
                        {t.viewOriginal}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-brand-cream/30 border border-uvac-accent/30 rounded-2xl p-6 md:p-8 max-w-4xl">
          <h2 className="text-lg md:text-xl font-serif font-bold text-uvac-dark mb-3">
            {t.disclaimerTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {t.disclaimerText}
          </p>
        </div>
      </div>
    </div>
  );
}
