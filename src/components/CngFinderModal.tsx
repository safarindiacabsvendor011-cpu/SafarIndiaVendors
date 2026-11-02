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
  Filter,
  Check,
  Zap,
  TrendingUp,
  Radio
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
  distanceFromHighwayKm: number;
  pressure: number; // in Bar
  status: 'Operating 24x7' | 'Open (Day Time)' | 'Temporary Offline';
  queueTime: string;
  gasStock: 'Full (100%)' | 'Available (75%)' | 'Low Stock (20%)' | 'Dry';
  lastReportedBy: string;
  lastReportedTime: string;
  votesAvailable: number;
  votesHighPressure: number;
  votesLongQueue: number;
  votesLowPressure: number;
  userVoted?: string;
}

const INITIAL_STATIONS: Record<string, CngStation[]> = {
  haldwani: [
    {
      id: 'h-1',
      name: 'IGL Mega CNG Terminal Hapur Bypass',
      location: 'KM 52, NH-9 Delhi-Moradabad Expressway',
      highwayKm: 'KM 52',
      distanceFromHighwayKm: 0.2,
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'Low (~4 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Tarun (Dzire)',
      lastReportedTime: '6 mins ago',
      votesAvailable: 19,
      votesHighPressure: 15,
      votesLongQueue: 2,
      votesLowPressure: 1,
    },
    {
      id: 'h-2',
      name: 'Torrent Gas High-Pressure Hub Moradabad',
      location: 'Pakbara Bypass, NH-9 Moradabad Outer',
      highwayKm: 'KM 148',
      distanceFromHighwayKm: 0.5,
      pressure: 210,
      status: 'Operating 24x7',
      queueTime: 'Quick (~6 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Kuldeep (Ertiga)',
      lastReportedTime: '14 mins ago',
      votesAvailable: 24,
      votesHighPressure: 18,
      votesLongQueue: 3,
      votesLowPressure: 2,
    },
    {
      id: 'h-3',
      name: 'HPCL Green Gas Highway Terminal Rampur',
      location: 'Rampur Bypass Flyover, NH-9 Junction',
      highwayKm: 'KM 186',
      distanceFromHighwayKm: 0.8,
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'No Waiting (0 min)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Naresh (Crysta)',
      lastReportedTime: '22 mins ago',
      votesAvailable: 16,
      votesHighPressure: 11,
      votesLongQueue: 1,
      votesLowPressure: 0,
    },
    {
      id: 'h-4',
      name: 'Adani Total Gas Rudrapur-Haldwani Entry',
      location: 'KM 240, Tanda Forest Highway, Rudrapur Entry',
      highwayKm: 'KM 240',
      distanceFromHighwayKm: 1.2,
      pressure: 220,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Bipin (Dzire Tour)',
      lastReportedTime: '10 mins ago',
      votesAvailable: 28,
      votesHighPressure: 22,
      votesLongQueue: 4,
      votesLowPressure: 1,
    },
  ],
  yamuna: [
    {
      id: 'y-1',
      name: 'IndianOil Mega CNG & AutoLPG Hub',
      location: 'Zero Point Entry, Greater Noida (KM 0)',
      highwayKm: 'KM 0.5',
      distanceFromHighwayKm: 0.1,
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'Low (~4 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Baljeet (Dzire)',
      lastReportedTime: '10 mins ago',
      votesAvailable: 31,
      votesHighPressure: 26,
      votesLongQueue: 3,
      votesLowPressure: 1,
    },
    {
      id: 'y-2',
      name: 'HPCL Green Gas Highway Station',
      location: 'KM 65, Jewar Toll Plaza Service Area',
      highwayKm: 'KM 65',
      distanceFromHighwayKm: 0.0,
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'Quick (~6 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Driver Satish (Ertiga)',
      lastReportedTime: '18 mins ago',
      votesAvailable: 22,
      votesHighPressure: 17,
      votesLongQueue: 2,
      votesLowPressure: 0,
    },
    {
      id: 'y-3',
      name: 'Adani Total Gas Expressway Terminal',
      location: 'KM 130, Mathura Toll Exit Service Lane',
      highwayKm: 'KM 130',
      distanceFromHighwayKm: 0.4,
      pressure: 210,
      status: 'Operating 24x7',
      queueTime: 'No Waiting (0 min)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Rakesh (Crysta)',
      lastReportedTime: '25 mins ago',
      votesAvailable: 19,
      votesHighPressure: 14,
      votesLongQueue: 1,
      votesLowPressure: 1,
    },
    {
      id: 'y-4',
      name: 'Bharat Petroleum Highway CNG',
      location: 'Khandari Flyover, Agra City Entry Gate',
      highwayKm: 'KM 165',
      distanceFromHighwayKm: 1.5,
      pressure: 195,
      status: 'Operating 24x7',
      queueTime: 'Moderate (~10 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Manoj (Dzire)',
      lastReportedTime: '40 mins ago',
      votesAvailable: 15,
      votesHighPressure: 9,
      votesLongQueue: 5,
      votesLowPressure: 3,
    },
  ],
  jaipur: [
    {
      id: 'j-1',
      name: 'Torrent Gas High-Pressure Hub',
      location: 'Dharuhera Industrial Area, NH-48 Bypass',
      highwayKm: 'KM 45',
      distanceFromHighwayKm: 0.3,
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Vijay',
      lastReportedTime: '12 mins ago',
      votesAvailable: 21,
      votesHighPressure: 16,
      votesLongQueue: 2,
      votesLowPressure: 0,
    },
    {
      id: 'j-2',
      name: 'Indraprastha Gas Neemrana Japanese Zone',
      location: 'Neemrana Midway Flyover, NH-48',
      highwayKm: 'KM 115',
      distanceFromHighwayKm: 0.6,
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Gurpreet',
      lastReportedTime: '15 mins ago',
      votesAvailable: 18,
      votesHighPressure: 13,
      votesLongQueue: 1,
      votesLowPressure: 1,
    },
    {
      id: 'j-3',
      name: 'Rajasthan State Gas Shahpura Station',
      location: 'Shahpura Midway Bypass, NH-48',
      highwayKm: 'KM 190',
      distanceFromHighwayKm: 1.1,
      pressure: 195,
      status: 'Operating 24x7',
      queueTime: 'Quick (~8 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Sunil',
      lastReportedTime: '30 mins ago',
      votesAvailable: 14,
      votesHighPressure: 8,
      votesLongQueue: 4,
      votesLowPressure: 2,
    },
  ],
  chandigarh: [
    {
      id: 'c-1',
      name: 'HPCL Murthal Highway CNG (Near Sukhdev)',
      location: 'Murthal Toll Milestone, NH-44',
      highwayKm: 'KM 48',
      distanceFromHighwayKm: 0.2,
      pressure: 220,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Harpreet (Innova)',
      lastReportedTime: '8 mins ago',
      votesAvailable: 35,
      votesHighPressure: 29,
      votesLongQueue: 3,
      votesLowPressure: 1,
    },
    {
      id: 'c-2',
      name: 'IndianOil Oasis Midway CNG',
      location: 'Karnal Oasis Midway Complex, NH-44',
      highwayKm: 'KM 124',
      distanceFromHighwayKm: 0.0,
      pressure: 210,
      status: 'Operating 24x7',
      queueTime: 'Quick (~4 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Jagtar',
      lastReportedTime: '14 mins ago',
      votesAvailable: 27,
      votesHighPressure: 21,
      votesLongQueue: 2,
      votesLowPressure: 0,
    },
    {
      id: 'c-3',
      name: 'Adani Total Gas Ambala Cantt Bypass',
      location: 'Ambala Ring Road Highway Flyover',
      highwayKm: 'KM 195',
      distanceFromHighwayKm: 1.0,
      pressure: 200,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Devinder',
      lastReportedTime: '22 mins ago',
      votesAvailable: 19,
      votesHighPressure: 15,
      votesLongQueue: 1,
      votesLowPressure: 1,
    },
  ],
  dehradun: [
    {
      id: 'd-1',
      name: 'IGL Meerut Expressway Terminal',
      location: 'Kashi Toll Plaza, Delhi-Meerut Exp',
      highwayKm: 'KM 32',
      distanceFromHighwayKm: 0.1,
      pressure: 215,
      status: 'Operating 24x7',
      queueTime: 'No Waiting',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Pilot Deepak',
      lastReportedTime: '5 mins ago',
      votesAvailable: 25,
      votesHighPressure: 20,
      votesLongQueue: 1,
      votesLowPressure: 0,
    },
    {
      id: 'd-2',
      name: 'Torrent Gas Muzaffarnagar Bypass',
      location: 'Rampur Tiraha Highway Rest Area, NH-58',
      highwayKm: 'KM 118',
      distanceFromHighwayKm: 0.4,
      pressure: 205,
      status: 'Operating 24x7',
      queueTime: 'Low (~5 mins)',
      gasStock: 'Full (100%)',
      lastReportedBy: 'Driver Sachin',
      lastReportedTime: '20 mins ago',
      votesAvailable: 17,
      votesHighPressure: 12,
      votesLongQueue: 2,
      votesLowPressure: 1,
    },
    {
      id: 'd-3',
      name: 'Haridwar Natural Gas Roorkee Highway',
      location: 'Bahadrabad Bypass, Haridwar Entry',
      highwayKm: 'KM 192',
      distanceFromHighwayKm: 0.9,
      pressure: 200,
      status: 'Operating 24x7',
      queueTime: 'Quick (~6 mins)',
      gasStock: 'Available (75%)',
      lastReportedBy: 'Pilot Rawat',
      lastReportedTime: '18 mins ago',
      votesAvailable: 15,
      votesHighPressure: 11,
      votesLongQueue: 2,
      votesLowPressure: 1,
    },
  ],
};

export const CngFinderModal: React.FC<CngFinderModalProps> = ({ isOpen, onClose }) => {
  const [selectedCorridor, setSelectedCorridor] = useState('haldwani');
  const [filterMode, setFilterMode] = useState<'all' | 'high_pressure' | 'low_queue'>('all');
  const [radiusFilter, setRadiusFilter] = useState<'all' | '3km' | '5km'>('all');
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const corridors = [
    { id: 'haldwani', name: 'Delhi ⟶ Haldwani / Nainital (NH-9 Corridor)', tag: '275 KM' },
    { id: 'yamuna', name: 'Delhi ⟶ Agra (Yamuna Expressway)', tag: '165 KM' },
    { id: 'jaipur', name: 'Delhi ⟶ Jaipur (NH-48 Corridor)', tag: '260 KM' },
    { id: 'chandigarh', name: 'Delhi ⟶ Chandigarh (NH-44 Corridor)', tag: '240 KM' },
    { id: 'dehradun', name: 'Delhi ⟶ Haridwar / Dehradun (NH-58)', tag: '235 KM' },
  ];

  const currentStations = (stations[selectedCorridor] || []).filter((st) => {
    if (filterMode === 'high_pressure' && st.pressure < 200) return false;
    if (filterMode === 'low_queue' && !(st.queueTime.includes('No') || st.queueTime.includes('Low') || st.queueTime.includes('Quick'))) return false;
    if (radiusFilter === '3km' && st.distanceFromHighwayKm > 3) return false;
    if (radiusFilter === '5km' && st.distanceFromHighwayKm > 5) return false;
    return true;
  });

  // Handle 1-Tap Driver Crowdsourced Vote
  const handleVote = (
    stationId: string, 
    voteType: 'available' | 'high_pressure' | 'long_queue' | 'low_pressure'
  ) => {
    setStations((prev) => ({
      ...prev,
      [selectedCorridor]: prev[selectedCorridor].map((s) => {
        if (s.id !== stationId) return s;
        
        let newVotesAvailable = s.votesAvailable;
        let newVotesHighPressure = s.votesHighPressure;
        let newVotesLongQueue = s.votesLongQueue;
        let newVotesLowPressure = s.votesLowPressure;
        let newPressure = s.pressure;
        let newStock = s.gasStock;
        let newQueue = s.queueTime;

        if (voteType === 'available') {
          newVotesAvailable += 1;
          newStock = 'Full (100%)';
        } else if (voteType === 'high_pressure') {
          newVotesHighPressure += 1;
          newPressure = Math.max(210, s.pressure);
        } else if (voteType === 'long_queue') {
          newVotesLongQueue += 1;
          newQueue = 'Long Queue (15-25 mins)';
        } else if (voteType === 'low_pressure') {
          newVotesLowPressure += 1;
          newPressure = Math.min(180, s.pressure);
        }

        return {
          ...s,
          pressure: newPressure,
          gasStock: newStock,
          queueTime: newQueue,
          votesAvailable: newVotesAvailable,
          votesHighPressure: newVotesHighPressure,
          votesLongQueue: newVotesLongQueue,
          votesLowPressure: newVotesLowPressure,
          lastReportedBy: 'You (Safar Pilot)',
          lastReportedTime: 'Just now',
          userVoted: voteType,
        };
      })
    }));

    const voteLabels: Record<string, string> = {
      available: 'Gas Available confirmed',
      high_pressure: 'High Pressure (200+ Bar) verified',
      long_queue: 'Long Queue reported',
      low_pressure: 'Low Pressure reported',
    };

    setFeedbackToast(`Thanks Pilot! "${voteLabels[voteType]}" broadcasted to highway drivers.`);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/80 relative text-slate-800 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-4 relative shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
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
              <span className="text-[10px] text-emerald-700 font-bold">5 Major Corridors</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {corridors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCorridor(c.id)}
                  className={`p-2 rounded-xl border text-left font-bold text-xs transition-all ${
                    selectedCorridor === c.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="truncate font-black">{c.name.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-500 flex justify-between mt-0.5">
                    <span className="truncate">{c.name.includes('(') ? `(${c.name.split('(')[1]}` : ''}</span>
                    <span className="font-mono text-emerald-700 font-bold shrink-0 ml-1">{c.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filters Bar: Category & Route Radius */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="text-slate-400 font-semibold flex items-center gap-0.5">
                  <Filter className="w-3 h-3" />
                  Filter:
                </span>
                {[
                  { id: 'all', label: 'All Active' },
                  { id: 'high_pressure', label: 'High Pressure (200+ Bar)' },
                  { id: 'low_queue', label: 'Low Queue (< 15 mins)' },
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

            {/* Radius Filter Chips */}
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span className="text-slate-400 font-semibold">Corridor Radius:</span>
              {[
                { id: 'all', label: 'All Along Corridor' },
                { id: '3km', label: '&lt; 3 KM Off Highway' },
                { id: '5km', label: '&lt; 5 KM Off Highway' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRadiusFilter(r.id as any)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                    radiusFilter === r.id 
                      ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  dangerouslySetInnerHTML={{ __html: r.label }}
                />
              ))}
            </div>
          </div>

          {/* Feedback Toast */}
          {feedbackToast && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackToast}</span>
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

                  {/* Real-time status badges */}
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

                    {/* Badge 3: Low Queue (< 15 mins) */}
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-bold text-[10px] flex items-center gap-1 border border-purple-200">
                      <span>Queue: {st.queueTime}</span>
                    </span>

                    {/* Badge 4: Gas Stock */}
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold text-[10px] border border-amber-200">
                      Stock: {st.gasStock}
                    </span>
                  </div>

                  {/* 1-Tap Driver Crowdsourced Feedback Buttons (Mandated in Prompt) */}
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>Pilot Live Vote • 1-Tap Updates:</span>
                      </span>
                      <span className="text-slate-400 font-mono">Reported by {st.lastReportedBy} ({st.lastReportedTime})</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleVote(st.id, 'available')}
                        className={`py-1 px-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                          st.userVoted === 'available'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        <span>✓ Gas Available</span>
                        <span className="font-mono font-black">({st.votesAvailable})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVote(st.id, 'high_pressure')}
                        className={`py-1 px-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                          st.userVoted === 'high_pressure'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                        }`}
                      >
                        <span>⚡ 200+ Bar</span>
                        <span className="font-mono font-black">({st.votesHighPressure})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVote(st.id, 'long_queue')}
                        className={`py-1 px-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                          st.userVoted === 'long_queue'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <span>⏳ Long Line</span>
                        <span className="font-mono font-black">({st.votesLongQueue})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVote(st.id, 'low_pressure')}
                        className={`py-1 px-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                          st.userVoted === 'low_pressure'
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        <span>⚠️ Low Pressure</span>
                        <span className="font-mono font-black">({st.votesLowPressure})</span>
                      </button>
                    </div>
                  </div>

                  {/* Direct Navigation */}
                  <div className="flex justify-end pt-1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.name + ' ' + st.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-2xs text-[11px] transition-transform active:scale-95"
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
    </div>
  );
};
