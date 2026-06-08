import React, { useState } from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';
import AccordionItem from '../../AccordionItem';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  lang: 'sr' | 'en';
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const content = {
    sr: {
      title: "Česta pitanja",
      subtitle: "Sve što treba da znate pre nego što se otisnete u avanturu meandrima Uvca.",
      disclaimer: "Imate dodatnih pitanja? Slobodno nas kontaktirajte putem telefona ili WhatsApp-a.",
      items: [
        {
          question: "Odakle tačno kreće krstarenje i kako da stignemo do tamo?",
          answer: "Sva krstarenja polaze sa brane Rastoke na Uvačkom jezeru (selo Akmačići blizu Nove Varoši), što je zvanična tačka sastanka. Na samom polazištu obezbeđen je besplatan parking za vaše vozilo. Preporučujemo da stignete najmanje 15 minuta pre zakazanog polaska."
        },
        {
          question: "Koliko traje krstarenje i šta je sve uključeno u turu?",
          answer: "Kompletno iskustvo krstarenja meandrima traje između 4 i 5 sati. Tura obuhvata vožnju čamcem kroz meandre reke, posmatranje gnezda beloglavih supova iz neposredne blizine, obilazak čuvene Ledene pećine i pešačenje do vidikovaca (Veliki Vrh ili Ravni Krš) sa kojih se pruža najlepši pogled na kanjon."
        },
        {
          question: "Kolika je cena karte i šta se dodatno plaća na licu mesta?",
          answer: "Cena krstarenja Uvcem je 2000 RSD po osobi.\n\nNapomena: Naknada za ulazak u Specijalni rezervat prirode iznosi 150 RSD po osobi i karta za posetu Ledenoj pećini iznosi 270 RSD po osobi. Obe naknade se naplaćuju odvojeno na licu mesta. Celokupno plaćanje se vrši na dan polaska."
        },
        {
          question: "Da li je rezervacija mesta obavezna i kako mogu da otkažem ili promenim termin?",
          answer: "Da, rezervacija je obavezna jer je kapacitet čamca strogo ograničen na maksimalno 12 osoba kako bismo osigurali udobnost i bezbednost. Ukoliko želite da otkažete ili promenite rezervaciju, molimo vas da nas kontaktirate putem sajta ili telefonom najkasnije 24 sata pre planiranog polaska."
        },
        {
          question: "Da li je tura naporna i šta treba poneti od opreme?",
          answer: "Tura obuhvata pešačenje do vidikovaca sa kojih se pruža spektakularan pogled, što zahteva blagi fizički napor. Preporučujemo da obujete udobnu, sportsku obuću i ponesete topliji komad odeće (jaknu ili duks) jer je temperatura unutar Ledene pećine konstantno niska (oko 8°C) tokom cele godine. Naravno, ne zaboravite fotoaparat ili telefon za fotografisanje prelepih predela i beloglavih supova!"
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before embarking on your adventure in the Uvac Canyon.",
      disclaimer: "Have more questions? Feel free to reach out to us directly via phone or WhatsApp.",
      items: [
        {
          question: "Where exactly does the cruise start and how do we get there?",
          answer: "All cruises depart from the Rastoke dam on Uvac Lake (Akmačići village near Nova Varoš, Serbia), which is the official meeting point. Free parking for your vehicle is provided right at the departure point. We recommend arriving at least 15 minutes before the scheduled departure."
        },
        {
          question: "How long does the cruise last and what is included in the tour?",
          answer: "The complete meander cruise experience lasts between 4 and 5 hours. The tour includes a boat ride through the river meanders, close-up observation of griffon vulture nesting sites, a visit to the famous Ice Cave, and hiking to the viewpoints (Veliki Vrh or Ravni Krš) offering the most beautiful views of the canyon."
        },
        {
          question: "What is the ticket price and what needs to be paid additionally on-site?",
          answer: "The price of the Uvac cruise is 2000 RSD (approx. 17€) per person.\n\nNote: The entrance fee for the Special Nature Reserve is 150 RSD (~1.5€) per person, and the Ice Cave ticket is 270 RSD (~2.5€) per person. Both fees are collected separately on-site. All payments are made in cash on the day of the tour."
        },
        {
          question: "Is seat reservation mandatory and how can I cancel or reschedule?",
          answer: "Yes, reservation is mandatory because our boat capacity is strictly limited to a maximum of 12 people to ensure comfort and safety. If you wish to cancel or reschedule, please contact us via our website or by phone at least 24 hours before your scheduled departure."
        },
        {
          question: "Is the tour strenuous and what equipment should I bring?",
          answer: "The tour includes a hike to the viewpoints with spectacular views, requiring mild physical effort. We recommend wearing comfortable sports shoes and bringing a warmer piece of clothing (jacket or sweater) as the temperature inside the Ice Cave is constantly low (around 8°C) all year round. Of course, do not forget a camera or phone to capture the beautiful scenery and griffon vultures!"
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="faq-section" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
            <HelpCircle className="w-4 h-4 text-uvac-accent" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-uvac-dark tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4 mb-12">
          {t.items.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={toggleFAQ}
            />
          ))}
        </div>

        {/* Callout box */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-brand-cream/40 border border-gray-100 rounded-2xl p-6 text-center sm:text-left shadow-sm">
          <div className="p-3 bg-uvac-accent/10 rounded-xl text-uvac-accent">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {t.disclaimer}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
