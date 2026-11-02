import React, { useState } from 'react';
import { 
  X, 
  Fuel, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Gauge, 
  Sparkles, 
  ThumbsUp, 
  Users, 
  AlertCircle,
  Filter
} from 'lucide-react';

interface CngFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CngStation {
  id: string;
  name: string;
  location: string;
  highwayKm: string;
  pressure: number; // in Bar
  status: 'Operating 24x7' | 'Open (Day Time)' | 'Temporary Offline';
  queueTime: string;
  gasStock: 'Full (100%)' | 'Available (75%)' | 'Low Stock (20%)' | 'Dry';
  lastReportedBy: string;
  lastReportedTime: string;
}

const INITIAL_STATIONS: Record<string, CngStation[]> = {
  yamuna: [
    {
      id: 'y-1',
      name: 'IndianOil Mega CNG & AutoLPG Hub',
      location: 'Zero Point Entry, Greater Noida (KM 0)',
      highwayKm: 'KM 0.5',
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'Low (~4 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Baljeet (Dzire)',
      lastReportedTime: '10 mins ago',
    },
    {
      id: 'y-2',
      name: 'HPCL Green Gas Highway Station',
      location: 'KM 65, Jewar Toll Plaza Service Area',
      highwayKm: 'KM 65',
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'Quick (~6 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Driver Satish (Ertiga)',
      lastReportedTime: '18 mins ago',
    },
    {
      id: 'y-3',
      name: 'Adani Total Gas Expressway Terminal',
      location: 'KM 130, Mathura Toll Exit Service Lane',
      highwayKm: 'KM 130',
      pressure: 210,
      status: 'Operating 24x7',
      queueTime: 'No Waiting (0 min)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Rakesh (Crysta)',
      lastReportedTime: '25 mins ago',
    },
    {
      id: 'y-4',
      name: 'Bharat Petroleum Highway CNG',
      location: 'Khandari Flyover, Agra City Entry Gate',
      highwayKm: 'KM 165',
      pressure: 195,
      status: 'Operating 24x7',
      queueTime: 'Moderate (~10 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Manoj (Dzire)',
      lastReportedTime: '40 mins ago',
    },
  ],
  jaipur: [
    {
      id: 'j-1',
      name: 'Torrent Gas High-Pressure Hub',
      location: 'Dharuhera Industrial Area, NH-48 Bypass',
      highwayKm: 'KM 45',
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Vijay',
      lastReportedTime: '12 mins ago',
    },
    {
      id: 'j-2',
      name: 'Indraprastha Gas Neemrana Japanese Zone',
      location: 'Neemrana Midway Flyover, NH-48',
      highwayKm: 'KM 115',
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Gurpreet',
      lastReportedTime: '15 mins ago',
    },
    {
      id: 'j-3',
      name: 'Rajasthan State Gas Shahpura Station',
      location: 'Shahpura Midway Bypass, NH-48',
      highwayKm: 'KM 190',
      pressure: 195,
      status: 'Operating 24x7',
      queueTime: 'Quick (~8 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Sunil',
      lastReportedTime: '30 mins ago',
    },
  ],
  chandigarh: [
    {
      id: 'c-1',
      name: 'HPCL Murthal Highway CNG (Near Sukhdev)',
      location: 'Murthal Toll Milestone, NH-44',
      highwayKm: 'KM 48',
      pressure: 220,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Harpreet (Innova)',
      lastReportedTime: '8 mins ago',
    },
    {
      id: 'c-2',
      name: 'IndianOil Oasis Midway CNG',
      location: 'Karnal Oasis Midway Complex, NH-44',
      highwayKm: 'KM 124',
      pressure: 210,
      status: 'Operating 24x7',
      queueTime: 'Quick (~4 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Jagtar',
      lastReportedTime: '14 mins ago',
    },
    {
      id: 'c-3',
      name: 'Adani Total Gas Ambala Cantt Bypass',
      location: 'Ambala Ring Road Highway Flyover',
      highwayKm: 'KM 195',
      pressure: 200,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Devinder',
      lastReportedTime: '22 mins ago',
    },
  ],
  dehradun: [
    {
      id: 'd-1',
      name: 'IGL Meerut Expressway Terminal',
      location: 'Kashi Toll Plaza, Delhi-Meerut Exp',
      highwayKm: 'KM 32',
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Deepak',
      lastReportedTime: '5 mins ago',
    },
    {
      id: 'd-2',
      name: 'Torrent Gas Muzaffarnagar Bypass',
      location: 'Rampur Tiraha Highway Rest Area, NH-58',
      highwayKm: 'KM 118',
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Sachin',
      lastReportedTime: '20 mins ago',
    },
    {
      id: 'd-3',
      name: 'Haridwar Natural Gas Roorkee Highway',
      location: 'Bahadrabad Bypass, Haridwar Entry',
      highwayKm: 'KM 192',
      pressure: 200,
      status: 'Operating 24x7',
      queueTime: 'Quick (~6 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Rawat',
      lastReportedTime: '18 mins ago',
    },
  ],
};

export const CngFinderModal: React.FC<CngFinderModalProps> = ({ isOpen, onClose }) => {
  const [selectedCorridor, setSelectedCorridor] = useState('yamuna');
  const [filterMode, setFilterMode] = useState<'all' | 'high_pressure' | 'low_queue'>('all');
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [reportingStation, setReportingStation] = useState<CngStation | null>(null);
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const corridors = [
    { id: 'yamuna', name: 'Delhi ⟶ Agra (Yamuna Expressway)', tag: '165 KM' },
    { id: 'jaipur', name: 'Delhi ⟶ Jaipur (NH-48 Corridor)', tag: '260 KM' },
    { id: 'chandigarh', name: 'Delhi ⟶ Chandigarh (NH-44 Corridor)', tag: '240 KM' },
    { id: 'dehradun', name: 'Delhi ⟶ Haridwar / Dehradun (NH-58)', tag: '235 KM' },
  ];

  const currentStations = (stations[selectedCorridor] || []).filter((st) => {
    if (filterMode === 'high_pressure') return st.pressure >= 200;
    if (filterMode === 'low_queue') return st.queueTime.includes('No') || st.queueTime.includes('Low');
    return true;
  });

  const handleUpdateStation = (stId: string, pressureVal: number, stockVal: CngStation['gasStock']) => {
    setStations((prev) => ({
      ...prev,
      [selectedCorridor]: prev[selectedCorridor].map((s) =>
        s.id === stId
          ? {
              ...s,
              pressure: pressureVal,
              gasStock: stockVal,
              lastReportedBy: 'You (Safar Partner)',
              lastReportedTime: 'Just now',
            }
          : s
      ),
    }));

    setReportingStation(null);
    setReportSuccessMsg('Thanks! Your live CNG report has been broadcasted to nearby cab drivers.');
    setTimeout(() => setReportSuccessMsg(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/80 relative text-slate-800 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-4 relative shrink-0">
          <button onClick={onClose} className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
              <Fuel className="w-3 h-3 text-emerald-400" />
              Live Highway Gas Pressure Radar
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white mt-1">
            Highway 24x7 CNG Pump & Pressure Finder
          </h2>
          <p className="text-xs text-slate-300">
            Real-time pressure readings, crowdsourced wait times, and gas stock status.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
          
          {/* Corridor Selection Tabs */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">Select Highway Route</label>
              <span className="text-[10px] text-slate-400">Tap to switch corridor</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {corridors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCorridor(c.id)}
                  className={`p-2.5 rounded-xl border text-left font-bold text-xs transition-all ${
                    selectedCorridor === c.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="truncate font-black">{c.name.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-500 flex justify-between mt-0.5">
                    <span>{c.name.includes('(') ? `(${c.name.split('(')[1]}` : ''}</span>
                    <span className="font-mono text-emerald-700 font-bold">{c.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-semibold flex items-center gap-0.5">
                <Filter className="w-3 h-3" />
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Active' },
                { id: 'high_pressure', label: 'High Pressure (200+ bar)' },
                { id: 'low_queue', label: 'Low Waiting Time' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterMode(f.id as any)}
                  className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-all ${
                    filterMode === f.id
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Success Banner */}
          {reportSuccessMsg && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{reportSuccessMsg}</span>
            </div>
          )}

          {/* Station Cards */}
          <div className="space-y-3">
            {currentStations.map((st) => {
              const isHighPressure = st.pressure >= 200;

              return (
                <div
                  key={st.id}
                  className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-2.5 shadow-2xs hover:border-slate-300 transition-all text-xs"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-sm">
                          {st.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{st.location}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full">
                        {st.highwayKm}
                      </span>
                    </div>
                  </div>

                  {/* Real-time status badges (Mandated in brief) */}
                  <div className="flex flex-wrap gap-1.5">
                    {/* Badge 1: Operating 24x7 */}
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[10px] flex items-center gap-1 border border-emerald-200">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{st.status}</span>
                    </span>

                    {/* Badge 2: High Pressure (200+ bar) */}
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 border ${
                      isHighPressure
                        ? 'bg-blue-100 text-blue-900 border-blue-200'
                        : 'bg-amber-100 text-amber-900 border-amber-200'
                    }`}>
                      <Gauge className="w-3 h-3 text-blue-600" />
                      <span>{st.pressure} Bar {isHighPressure ? '(High Pressure 200+)' : ''}</span>
                    </span>

                    {/* Badge 3: Low Waiting Time */}
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-bold text-[10px] flex items-center gap-1 border border-purple-200">
                      <span>Queue: {st.queueTime}</span>
                    </span>

                    {/* Badge 4: Gas Stock */}
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold text-[10px] border border-amber-200">
                      Stock: {st.gasStock}
                    </span>
                  </div>

                  {/* Crowdsourced verification info */}
                  <div className="p-2 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 truncate">
                      <Users className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">Reported by <strong>{st.lastReportedBy}</strong> ({st.lastReportedTime})</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReportingStation(st)}
                      className="text-emerald-700 font-bold hover:underline shrink-0 ml-2"
                    >
                      Update Status ✎
                    </button>
                  </div>

                  {/* Direct Navigation */}
                  <div className="flex justify-end pt-1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.name + ' ' + st.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-2xs text-[11px]"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Navigate via Google Maps</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Crowdsource Update Modal */}
      {reportingStation && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xs w-full p-4 space-y-3 shadow-2xl text-xs animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Crowdsource Live Status</h3>
              <button onClick={() => setReportingStation(null)} className="text-slate-400">✕</button>
            </div>

            <p className="text-[11px] text-slate-500">
              Help fellow pilots on the highway. Report live pressure & gas stock at <strong>{reportingStation.name}</strong>:
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Pressure Reading</label>
                <div className="grid grid-cols-3 gap-1 text-center font-mono font-bold">
                  {[220, 210, 195].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleUpdateStation(reportingStation.id, p, 'Full (100%)')}
                      className="py-1.5 bg-slate-100 hover:bg-emerald-500 hover:text-white rounded-lg border border-slate-200"
                    >
                      {p} Bar
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Stock Availability</label>
                <div className="grid grid-cols-2 gap-1 text-center font-bold">
                  <button
                    type="button"
                    onClick={() => handleUpdateStation(reportingStation.id, 210, 'Full (100%)')}
                    className="py-1.5 bg-emerald-100 text-emerald-900 rounded-lg hover:bg-emerald-200"
                  >
                    Full Stock ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStation(reportingStation.id, 180, 'Low Stock (20%)')}
                    className="py-1.5 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200"
                  >
                    Low / Moderate
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReportingStation(null)}
              className="w-full py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
