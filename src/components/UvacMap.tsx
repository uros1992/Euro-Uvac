import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BRAND_COLOR = '#0ea5e9'; // Ovu boju kasnije poveži sa našom uvac-primary bojom

const customIcon = L.divIcon({
  className: 'custom-icon-wrapper',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${BRAND_COLOR}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3));">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface LocationItem {
  id: string;
  position: [number, number];
  title: { sr: string; en: string };
  desc: { sr: string; en: string };
}

interface UvacMapProps {
  lang?: 'sr' | 'en';
}

export default function UvacMap({ lang = 'sr' }: UvacMapProps) {
  const mapBounds: [[number, number], [number, number]] = [
    [43.345, 19.910],
    [43.425, 19.975], 
  ];

  const locations: LocationItem[] = [
    {
      id: 'start',
      position: [43.418265, 19.926270],
      title: { sr: 'Polazna tačka', en: 'Starting Point' },
      desc: { sr: 'Mesto ukrcavanja u čamac i početak avanture kroz meandre.', en: 'Boarding place and the beginning of your meanders adventure.' }
    },
    {
      id: 'veliki_vrh',
      position: [43.357444, 19.952623],
      title: { sr: 'Vidikovac Veliki Vrh', en: 'Veliki Vrh Viewpoint' },
      desc: { sr: 'Jedan od najpoznatijih vidikovaca sa koga se pruža nestvaran pogled na meandre i gnezda beloglavog supa.', en: 'One of the most famous viewpoints offering an unreal view of the meanders and griffon vulture nests.' }
    },
    {
      id: 'ravni_krs',
      position: [43.352879, 19.960401],
      title: { sr: 'Vidikovac Ravni Krš', en: 'Ravni Krš Viewpoint' },
      desc: { sr: 'Fascinantan pogled na kanjon. Mesto gde priroda ostavlja bez daha.', en: 'A fascinating view of the canyon. A place where nature takes your breath away.' }
    },
    {
      id: 'ledena_pecina',
      position: [43.357011, 19.954455],
      title: { sr: 'Ledena pećina', en: 'Ice Cave' },
      desc: { sr: 'Skriveni dragulj Uvca do kojeg se stiže isključivo čamcem. Obilazak obuhvata oko 700 metara unutrašnjih kanala i dvorana.', en: 'A hidden gem of Uvac accessible only by boat, with around 700 meters of passages open to visitors.' }
    },
    {
  id: 'griffon',
  position: [43.361824, 19.956772],
  title: { sr: 'Kolonija beloglavih supova', en: 'Griffon Vulture Colony' },
  desc: { sr: 'Tokom krstarenja imaćete priliku da posmatrate beloglave supove u njihovom prirodnom staništu. Kanjon Uvca dom je jedne od najvećih kolonija ove impresivne ptice na Balkanu.', en: 'During the cruise, you may observe griffon vultures in their natural habitat. The Uvac Canyon is home to one of the largest colonies of this impressive bird in the Balkans.' }
}
  ];

  return (
    <section className="mb-24 text-center">
      <h2 className="text-3xl font-serif font-bold mb-10">
        {lang === 'sr' ? 'Mapa krstarenja Uvcem' : 'Uvac Cruise Map'}
      </h2>
      
        <p className="text-gray-600 max-w-3xl mx-auto mb-10 px-4 leading-relaxed">
        {lang === 'sr' 
          ? 'Tokom krstarenja prolazimo kroz najupečatljivije delove Specijalnog rezervata prirode Uvac. Na mapi su označene ključne tačke ture – polazna lokacija, Ledena pećina i vidikovci Veliki Vrh i Ravni Krš, sa kojih se pruža nezaboravan pogled na meandre Uvca i stanište beloglavog supa.'
          : 'During the cruise, we visit the most remarkable parts of the Uvac Special Nature Reserve. The map highlights the key points of the tour, including the departure location, the Ice Cave, and the viewpoints Veliki Vrh and Ravni Krš, offering unforgettable views of the Uvac meanders and the habitat of the griffon vulture.'}
      </p>

      <div className="max-w-5xl mx-auto h-[500px] lg:aspect-[16/9] lg:h-auto bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative z-0">
        <MapContainer 
          bounds={mapBounds} 
          boundsOptions={{ padding: [30, 30] }}
          scrollWheelZoom={false} 
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc) => (
            <Marker key={loc.id} position={loc.position} icon={customIcon}>
              <Popup className="rounded-lg">
                <div className="text-left min-w-[180px]">
                  <h3 className="font-bold text-gray-900 text-base mb-1 border-b pb-1">
                    {loc.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 m-0 leading-snug">
                    {loc.desc[lang]}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <p className="mt-5 text-sm text-gray-500 max-w-2xl mx-auto px-4">
        {lang === 'sr' 
          ? 'Kliknite na markere (ikonice) na mapi kako biste pročitali više o ključnim tačkama naše ture.' 
          : 'Click the markers (icons) on the map to read more about the key points of our tour.'}
      </p>
    </section>
  );
}
