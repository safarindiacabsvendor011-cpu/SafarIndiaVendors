import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  FileCheck, 
  Fuel, 
  AlertCircle, 
  Car, 
  Phone, 
  Share2, 
  Clock, 
  MapPin, 
  X,
  Heart,
  Sparkles,
  Headphones
} from 'lucide-react';
import { Booking, FreeVehicle } from '../types';
import { BookingCard } from './BookingCard';

interface MarketTabProps {
  bookings: Booking[];
  freeVehicles: FreeVehicle[];
  onOpenChat: (booking: Booking) => void;
  onShareWhatsApp: (booking: Booking) => void;
  onOpenCommissionPay: (booking: Booking) => void;
  onOpenFilterModal: () => void;
  onOpenFreeVehShare: (vehicle: FreeVehicle) => void;
  activeFilterChips: string[];
  onRemoveFilterChip: (chip: string) => void;
  onOpenInsurance: () => void;
  onOpenStateTax: () => void;
  onOpenCngFinder: () => void;
  onOpenHelpRules: () => void;
}

export const MarketTab: React.FC<MarketTabProps> = ({
  bookings,
  freeVehicles,
  onOpenChat,
  onShareWhatsApp,
  onOpenCommissionPay,
  onOpenFilterModal,
  onOpenFreeVehShare,
  activeFilterChips,
  onRemoveFilterChip,
  onOpenInsurance,
  onOpenStateTax,
  onOpenCngFinder,
  onOpenHelpRules,
}) => {
  const [marketSubTab, setMarketSubTab] = React.useState<'bookings' | 'free_vehicles'>('bookings');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBookings = bookings.filter((b) => {
    if (b.status === 'Cancelled') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchPickup = b.pickupLocation.toLowerCase().includes(q);
      const matchDrop = b.dropLocation.toLowerCase().includes(q);
      const matchCar = b.vehicleType.toLowerCase().includes(q);
      if (!matchId && !matchPickup && !matchDrop && !matchCar) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      
      {/* 1. Distinctive Sub Tabs: Duty Leads | Khali Gaadi */}
      <div className="bg-slate-100 p-1.5 rounded-full flex items-center justify-between gap-1 shadow-inner max-w-md mx-auto">
        <button
          onClick={() => setMarketSubTab('bookings')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            marketSubTab === 'bookings'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Duty Leads
        </button>

        <button
          onClick={() => setMarketSubTab('free_vehicles')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            marketSubTab === 'free_vehicles'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Khali Gaadi (Return Cabs)
        </button>
      </div>

      {/* 2. Search Bar + Filter Icon Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search city, route, booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
          />
        </div>

        <button
          onClick={onOpenFilterModal}
          className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl text-rose-500 shadow-2xs transition-colors shrink-0"
          title="Filter Route or Vehicle"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Filter Chips Row */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {activeFilterChips.map((chip, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold shadow-2xs"
            >
              <span>{chip}</span>
              <button
                onClick={() => onRemoveFilterChip(chip)}
                className="hover:text-amber-200"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Three High-Utility Highway Cards (3-Month Insurance, Permit Tax, CNG Finder) */}
      <div className="grid grid-cols-3 gap-2.5">
        
        {/* Card 1: 3-Month Insurance */}
        <div 
          onClick={onOpenInsurance}
          className="bg-white rounded-2xl border border-slate-200/80 p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-1.5">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            3-Mo. Insurance
          </span>
          <span className="text-[9px] text-amber-600 font-bold mt-0.5">Starts ₹1,499</span>
        </div>

        {/* Card 2: State Permit Tax */}
        <div 
          onClick={onOpenStateTax}
          className="bg-white rounded-2xl border border-slate-200/80 p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
            <FileCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Border Permit Tax
          </span>
          <span className="text-[9px] text-blue-600 font-bold mt-0.5">UP, RJ, HR, UK</span>
        </div>

        {/* Card 3: Highway CNG Finder */}
        <div 
          onClick={onOpenCngFinder}
          className="bg-white rounded-2xl border border-slate-200/80 p-3 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
            <Fuel className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 leading-tight">
            Highway CNG Finder
          </span>
          <span className="text-[9px] text-emerald-600 font-bold mt-0.5">24x7 Stations</span>
        </div>

      </div>

      {/* 5. Booking Cards List with Embedded Partner Appreciation Banner between cards */}
      {marketSubTab === 'bookings' && (
        <div className="space-y-3.5">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, idx) => (
              <React.Fragment key={booking.id}>
                <BookingCard
                  booking={booking}
                  onOpenChat={onOpenChat}
                  onShareWhatsApp={onShareWhatsApp}
                  onOpenCommissionPay={onOpenCommissionPay}
                />

                {/* EMBEDDED BANNER AFTER 2ND BOOKING (Exact user request) */}
                {idx === 1 && (
                  <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md my-4">
                    <img
                      src="/assets/aistudio/IMG-20261029-WA0000_12601531.jpg"
                      alt="Safar India Cabs - You are our Partners"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover"
                    />
                    
                    <div className="p-4 space-y-2 bg-gradient-to-b from-white to-amber-50/40">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                        <span>SafarIndiaCabs</span>
                        <span className="text-amber-500">"You are our</span>
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <span className="text-amber-500">Partners"</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        सफ़र इंडिया कैब्स परिवार का हिस्सा बनने के लिए धन्यवाद। हर सफ़र सुरक्षित, हर ऑपरेटर समृद्ध। 
                        हमारे सभी टूर एंड ट्रैवल्स पार्टनर्स के लिए 24x7 सपोर्ट उपलब्ध है।
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <a
                          href="tel:8506046346"
                          className="font-mono text-amber-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Helpline: 8506046346</span>
                        </a>

                        <button
                          onClick={onOpenHelpRules}
                          className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Partner Benefits</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2">
              <Car className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No active duty leads matching filters</p>
              <p className="text-xs text-slate-500">Clear filters or post a new booking lead using the (+) button below.</p>
            </div>
          )}
        </div>
      )}

      {/* 6. Khali Gaadi (Return Cabs) List */}
      {marketSubTab === 'free_vehicles' && (
        <div className="space-y-3.5">
          {freeVehicles.map((fv) => (
            <div
              key={fv.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-mono text-slate-800">
                    {fv.vehicleNumber}
                  </span>
                  <div className="text-xs text-slate-500">{fv.postedAt}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Demanded Price</div>
                  <div className="text-base font-black text-amber-600 font-mono">
                    ₹{fv.demandedPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1 border-y border-slate-100">
                <div className="font-semibold text-slate-800">{fv.currentLocation}</div>
                <div className="text-amber-500 font-bold">•••••• Khali Gaadi ••••••▶</div>
                <div className="font-semibold text-slate-800">{fv.destinationLocation}</div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{fv.availableDate}</span>
                </div>
                <span>{fv.seats} Seats Available</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${fv.driverPhone}`}
                  className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Call Driver</span>
                </a>

                <button
                  onClick={() => onOpenFreeVehShare(fv)}
                  className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
