import React from 'react';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  PlusCircle, 
  CheckCircle2, 
  Car, 
  RefreshCw,
  Layers,
  Sparkles
} from 'lucide-react';
import { Duty } from '../types';
import { DutyCard } from './DutyCard';

interface DutyExchangeProps {
  duties: Duty[];
  lang: 'en' | 'hi';
  onAcceptDuty: (dutyId: string) => void;
  onOpenBid: (duty: Duty) => void;
  onOpenWhatsApp: (duty: Duty) => void;
  onViewDutySlip: (duty: Duty) => void;
  onOpenPostDuty: () => void;
  searchFilter: { pickup: string; drop: string; category: string };
  setSearchFilter: React.Dispatch<React.SetStateAction<{ pickup: string; drop: string; category: string }>>;
}

export const DutyExchange: React.FC<DutyExchangeProps> = ({
  duties,
  lang,
  onAcceptDuty,
  onOpenBid,
  onOpenWhatsApp,
  onViewDutySlip,
  onOpenPostDuty,
  searchFilter,
  setSearchFilter,
}) => {
  const [activeTab, setActiveTab] = React.useState<'open' | 'accepted' | 'my_posts'>('open');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTripType, setSelectedTripType] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'latest' | 'payout_high' | 'distance'>('latest');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Synchronize category from hero search if set
  React.useEffect(() => {
    if (searchFilter.category && searchFilter.category !== 'All') {
      if (searchFilter.category.includes('Sedan')) setSelectedCategory('sedan');
      else if (searchFilter.category.includes('SUV')) setSelectedCategory('suv');
      else if (searchFilter.category.includes('Innova')) setSelectedCategory('innova');
      else if (searchFilter.category.includes('Tempo')) setSelectedCategory('tempo');
    }
  }, [searchFilter.category]);

  const filteredDuties = React.useMemo(() => {
    return duties.filter((duty) => {
      // Tab filter
      if (activeTab === 'open' && duty.status !== 'open') return false;
      if (activeTab === 'accepted' && duty.status !== 'accepted') return false;
      // category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'sedan' && !duty.vehicleCategory.includes('Sedan')) return false;
        if (selectedCategory === 'suv' && !duty.vehicleCategory.includes('Ertiga')) return false;
        if (selectedCategory === 'innova' && !duty.vehicleCategory.includes('Innova')) return false;
        if (selectedCategory === 'tempo' && !duty.vehicleCategory.includes('Tempo')) return false;
      }
      // trip type filter
      if (selectedTripType !== 'all' && duty.tripType !== selectedTripType) return false;
      
      // search query
      const query = searchTerm.toLowerCase();
      const pickupQuery = searchFilter.pickup.toLowerCase();
      const dropQuery = searchFilter.drop.toLowerCase();

      if (pickupQuery && !duty.pickupCity.toLowerCase().includes(pickupQuery) && !duty.pickupLocation.toLowerCase().includes(pickupQuery)) {
        return false;
      }
      if (dropQuery && !duty.dropCity.toLowerCase().includes(dropQuery) && !duty.dropLocation.toLowerCase().includes(dropQuery)) {
        return false;
      }

      if (query) {
        const matchesDutyNum = duty.dutyNumber.toLowerCase().includes(query);
        const matchesPickup = duty.pickupCity.toLowerCase().includes(query) || duty.pickupLocation.toLowerCase().includes(query);
        const matchesDrop = duty.dropCity.toLowerCase().includes(query) || duty.dropLocation.toLowerCase().includes(query);
        const matchesOperator = duty.operatorName.toLowerCase().includes(query);
        if (!matchesDutyNum && !matchesPickup && !matchesDrop && !matchesOperator) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'payout_high') return b.vendorRate - a.vendorRate;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0; // default order
    });
  }, [duties, activeTab, selectedCategory, selectedTripType, sortBy, searchTerm, searchFilter]);

  const openCount = duties.filter((d) => d.status === 'open').length;
  const acceptedCount = duties.filter((d) => d.status === 'accepted').length;

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        
        {/* Interactive Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('open')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'open'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{lang === 'en' ? 'Live Duty Board' : 'लाइव ड्यूटी बोर्ड'}</span>
            <span className="font-mono tabular-nums text-[11px] font-bold px-1.5 py-0.2 rounded bg-black/15">
              {openCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('accepted')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'accepted'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{lang === 'en' ? 'My Booked / Accepted' : 'मेरी स्वीकृत ड्यूटी'}</span>
            <span className="font-mono tabular-nums text-[11px] font-bold px-1.5 py-0.2 rounded bg-black/15">
              {acceptedCount}
            </span>
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search city, route, duty ID...' : 'शहर, रूट या ड्यूटी नंबर खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={onOpenPostDuty}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{lang === 'en' ? 'Post Duty' : '+ ड्यूटी डालें'}</span>
          </button>
        </div>

      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1">
            {lang === 'en' ? 'Category:' : 'श्रेणी:'}
          </span>
          {[
            { id: 'all', label: lang === 'en' ? 'All Cars' : 'सभी' },
            { id: 'sedan', label: 'Sedan (Dzire)' },
            { id: 'suv', label: 'SUV (Ertiga)' },
            { id: 'innova', label: 'Innova Crysta' },
            { id: 'tempo', label: 'Tempo 12-20s' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-amber-400 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort and Trip Type Filters */}
        <div className="flex items-center gap-3">
          <select
            value={selectedTripType}
            onChange={(e) => setSelectedTripType(e.target.value)}
            className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-md text-slate-300 focus:outline-none focus:border-amber-400"
          >
            <option value="all">{lang === 'en' ? 'All Trip Types' : 'सभी ट्रिप'}</option>
            <option value="oneway">{lang === 'en' ? 'One Way' : 'एक तरफ'}</option>
            <option value="roundtrip">{lang === 'en' ? 'Round Trip' : 'राउंड ट्रिप'}</option>
            <option value="airport">{lang === 'en' ? 'Airport' : 'एयरपोर्ट'}</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-md text-slate-300 focus:outline-none focus:border-amber-400"
          >
            <option value="latest">{lang === 'en' ? 'Newest First' : 'नवीनतम'}</option>
            <option value="payout_high">{lang === 'en' ? 'Highest Payout' : 'सर्वाधिक किराया'}</option>
            <option value="distance">{lang === 'en' ? 'Shortest Distance' : 'कम दूरी'}</option>
          </select>
        </div>

      </div>

      {/* Active Filter Clear banner if search query is set */}
      {(searchFilter.pickup || searchFilter.drop || searchTerm) && (
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span>
            {lang === 'en' ? 'Showing filtered results for:' : 'फ़िल्टर परिणाम:'}{' '}
            <strong className="text-amber-400">
              {[searchFilter.pickup, searchFilter.drop, searchTerm].filter(Boolean).join(' → ')}
            </strong>
          </span>
          <button
            onClick={() => {
              setSearchTerm('');
              setSearchFilter({ pickup: '', drop: '', category: 'All' });
              setSelectedCategory('all');
            }}
            className="text-amber-400 hover:underline font-semibold"
          >
            {lang === 'en' ? 'Clear All Filters' : 'फ़िल्टर हटाएं'}
          </button>
        </div>
      )}

      {/* Duties List */}
      <div className="space-y-4">
        {filteredDuties.length > 0 ? (
          filteredDuties.map((duty) => (
            <DutyCard
              key={duty.id}
              duty={duty}
              lang={lang}
              onAccept={onAcceptDuty}
              onOpenBid={onOpenBid}
              onOpenWhatsApp={onOpenWhatsApp}
              onViewDutySlip={onViewDutySlip}
              isMyPosted={activeTab === 'my_posts'}
            />
          ))
        ) : (
          <div className="py-16 text-center bg-slate-900/40 rounded-xl border border-slate-800 p-8 space-y-3">
            <Car className="w-10 h-10 text-slate-600 mx-auto" />
            <h2 className="text-base font-semibold text-slate-200">
              {lang === 'en' ? 'No matching duties found' : 'कोई ड्यूटी नहीं मिली'}
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {lang === 'en'
                ? 'Try broadening your city filters or post a new duty to broadcast it to 1,200+ operators.'
                : 'अपने शहर फ़िल्टर को बदलें या 1,200+ ऑपरेटरों को सीधे भेजने के लिए नई ड्यूटी पोस्ट करें।'}
            </p>
            <button
              onClick={onOpenPostDuty}
              className="mt-2 px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'en' ? 'Post a Duty Now' : 'अभी नई ड्यूटी पोस्ट करें'}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
