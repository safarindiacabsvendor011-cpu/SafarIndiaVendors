import React from 'react';
import { X, Fuel, Navigation, Clock, CheckCircle2, MapPin, Gauge } from 'lucide-react';

interface CngFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CngFinderModal: React.FC<CngFinderModalProps> = ({ isOpen, onClose }) => {
  const [selectedCorridor, setSelectedCorridor] = React.useState('yamuna');

  if (!isOpen) return null;

  const corridors = [
    { id: 'yamuna', name: 'Delhi ⟶ Agra (Yamuna Expressway)' },
    { id: 'jaipur', name: 'Delhi ⟶ Jaipur (NH-48)' },
    { id: 'chandigarh', name: 'Delhi ⟶ Chandigarh (NH-44)' },
    { id: 'dehradun', name: 'Delhi ⟶ Haridwar / Dehradun' },
  ];

  const stationsData: Record<string, any[]> = {
    yamuna: [
      {
        name: 'IndianOil CNG & AutoLPG Hub',
        location: 'KM 0, Zero Point Greater Noida (Entry)',
        pressure: '210 Bar (Full Pressure)',
        status: 'Open 24x7',
        queue: 'Low (~5 mins)',
        distance: 'At Expressway Entry',
      },
      {
        name: 'HPCL Green Gas Station',
        location: 'KM 65, Jewar Toll Plaza Service Area',
        pressure: '195 Bar (Good)',
        status: 'Open 24x7',
        queue: 'Quick (~8 mins)',
        distance: '65 KM from Zero Point',
      },
      {
        name: 'Adani Total Gas Station',
        location: 'KM 130, Mathura Toll Exit',
        pressure: '205 Bar (High)',
        status: 'Open 24x7',
        queue: 'No Queue',
        distance: '130 KM',
      },
      {
        name: 'Bharat Petroleum Highway CNG',
        location: 'Khandari Flyover, Agra City Entry',
        pressure: '200 Bar (Good)',
        status: 'Open 24x7',
        queue: '10 mins',
        distance: 'Agra City Gate',
      },
    ],
    jaipur: [
      {
        name: 'Torrent Gas CNG Station',
        location: 'Dharuhera Industrial Area, NH-48',
        pressure: '210 Bar',
        status: 'Open 24x7',
        queue: '5 mins',
        distance: '45 KM from Gurgaon',
      },
      {
        name: 'Indraprastha Gas Neemrana Hub',
        location: 'Neemrana Japanese Zone Flyover',
        pressure: '200 Bar',
        status: 'Open 24x7',
        queue: 'No Queue',
        distance: '115 KM from Delhi',
      },
      {
        name: 'Rajasthan State Gas Shahpura',
        location: 'Shahpura Midway Bypass, NH-48',
        pressure: '190 Bar',
        status: 'Open 24x7',
        queue: '8 mins',
        distance: '190 KM from Delhi',
      },
    ],
    chandigarh: [
      {
        name: 'HPCL Murthal Highway CNG',
        location: 'Near Sukhdev Dhaba, Murthal NH-44',
        pressure: '220 Bar (Excellent)',
        status: 'Open 24x7',
        queue: '5-10 mins',
        distance: '48 KM from Delhi',
      },
      {
        name: 'IndianOil Karnal Bypass CNG',
        location: 'Karnal Oasis Midway, NH-44',
        pressure: '205 Bar',
        status: 'Open 24x7',
        queue: 'Quick (~4 mins)',
        distance: '120 KM',
      },
      {
        name: 'Adani Gas Ambala Cantt Highway',
        location: 'Ambala Bypass Ring Road',
        pressure: '200 Bar',
        status: 'Open 24x7',
        queue: 'No Queue',
        distance: '195 KM',
      },
    ],
    dehradun: [
      {
        name: 'IGL Meerut Expressway CNG',
        location: 'Kashi Toll Plaza, Delhi-Meerut Exp',
        pressure: '215 Bar',
        status: 'Open 24x7',
        queue: 'No Queue',
        distance: '32 KM',
      },
      {
        name: 'Torrent Gas Muzaffarnagar Bypass',
        location: 'Rampur Tiraha, NH-58',
        pressure: '200 Bar',
        status: 'Open 24x7',
        queue: '5 mins',
        distance: '115 KM',
      },
      {
        name: 'Haridwar Natural Gas Roorkee Rd',
        location: 'Bahadrabad Bypass, Haridwar',
        pressure: '195 Bar',
        status: 'Open 24x7',
        queue: 'Quick (~6 mins)',
        distance: '190 KM',
      },
    ],
  };

  const currentStations = stationsData[selectedCorridor] || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Fuel className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Highway 24x7 CNG Station Finder
              </h2>
              <p className="text-xs text-slate-500">
                Live gas pressure & shortest queue guide
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corridor Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Select Highway Route (हाईवे रूट चुनें)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {corridors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCorridor(c.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                  selectedCorridor === c.id
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stations List */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {currentStations.map((st, i) => (
            <div
              key={i}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {st.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-0.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{st.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    {st.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Pressure:</span>
                  <strong className="text-slate-800 font-mono">{st.pressure}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Queue:</span>
                  <strong className="text-emerald-700">{st.queue}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Distance:</span>
                  <strong className="text-slate-800">{st.distance}</strong>
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.name + ' ' + st.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate in Google Maps</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
