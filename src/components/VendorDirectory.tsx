import React from 'react';
import { 
  Building2, 
  Phone, 
  Share2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Car, 
  Search, 
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { VendorPartner } from '../types';

interface VendorDirectoryProps {
  vendors: VendorPartner[];
  lang: 'en' | 'hi';
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({ vendors, lang }) => {
  const [cityFilter, setCityFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredVendors = vendors.filter((v) => {
    if (cityFilter !== 'all' && !v.city.toLowerCase().includes(cityFilter.toLowerCase())) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        v.companyName.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>{lang === 'en' ? 'Verified B2B Taxi Operators & Travel Agents' : 'सत्यापित B2B टैक्सी ऑपरेटर डायरेक्टरी'}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'en'
            ? 'Connect directly with 1,200+ fleet owners, travel agencies, and union partners across North India. No middlemen, direct operator-to-operator trust.'
            : 'उत्तर भारत के सत्यापित टैक्सी ऑपरेटरों, ट्रैवल्स और फ्लीट मालिकों से सीधे संपर्क करें। कोई बिचौलिया नहीं।'}
        </p>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium">
            {lang === 'en' ? 'Hub City:' : 'मुख्य शहर:'}
          </span>
          {['all', 'Delhi', 'Jaipur', 'Chandigarh', 'Dehradun', 'Agra'].map((city) => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                cityFilter === city
                  ? 'bg-slate-800 text-amber-400 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {city === 'all' ? (lang === 'en' ? 'All Hubs' : 'सभी शहर') : city}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search company or owner...' : 'कंपनी या ऑपरेटर का नाम खोजें...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">
                    {vendor.companyName}
                  </h2>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{vendor.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{vendor.rating}</span>
                </div>
              </div>

              {/* Verified badge and stats */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified B2B Partner</span>
                </div>
                <div className="font-mono tabular-nums text-slate-300">
                  {vendor.tripsCompleted.toLocaleString('en-IN')}+ Trips
                </div>
              </div>

              {/* Fleet & Contact details */}
              <div className="p-3 mt-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Contact Person:</span>
                  <span className="font-semibold text-slate-200">{vendor.ownerName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Attached Fleet:</span>
                  <span className="font-mono text-amber-400 font-semibold">{vendor.fleetSize} Commercial Cabs</span>
                </div>
              </div>

              {/* Specialities tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {vendor.specialities.map((spec, i) => (
                  <span key={i} className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${vendor.phone}`}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Call' : 'कॉल करें'}</span>
              </a>

              <a
                href={`https://wa.me/${vendor.whatsapp}?text=Namaste%20Ji,%20I%20found%20your%20fleet%20on%20SafarIndiaCabs%20Vendors.%20Looking%20for%20B2B%20cab%20exchange.`}
                target="_blank"
                rel="noreferrer"
                className="py-1.5 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-800/60 font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
