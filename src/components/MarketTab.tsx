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
  Headphones,
  RotateCw,
  ArrowDown
} from 'lucide-react';
import { Booking, FreeVehicle, VehicleCategory, DutyAlertCriteria } from '../types';
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
  attachedVehicleCategory?: VehicleCategory;
  onRefresh?: () => void;
  onOpenNotificationCenter?: () => void;
  alertCriteria?: DutyAlertCriteria;
  onRateBooking?: (booking: Booking) => void;
  onOpenVendorTrust?: (vendor: Booking['postedBy']) => void;
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
  attachedVehicleCategory = 'Sedan',
  onRefresh,
  onOpenNotificationCenter,
  alertCriteria,
  onRateBooking,
  onOpenVendorTrust,
}) => {
  const [marketSubTab, setMarketSubTab] = React.useState<'bookings' | 'free_vehicles'>('bookings');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedVehicleFilter, setSelectedVehicleFilter] = React.useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastRefreshedText, setLastRefreshedText] = React.useState('Updated: Just now');
  
  // Pull-to-refresh state using the actual scrolling container (<main>)
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isPulling, setIsPulling] = React.useState(false);
  const touchStartY = React.useRef(0);

  const getScrollTop = React.useCallback(() => {
    const scrollEl = containerRef.current?.closest('main') || document.querySelector('main');
    return scrollEl ? scrollEl.scrollTop : (window.scrollY || 0);
  }, []);

  const handleTriggerRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setPullDistance(54); // keep indicator open while refreshing
    if (onRefresh) onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
      setPullDistance(0);
      setLastRefreshedText('Updated: Just now');
    }, 750);
  }, [onRefresh]);

  // Touch Handlers for Mobile Pull-to-Refresh
  const handleTouchStart = (e: React.TouchEvent) => {
    if (getScrollTop() <= 4) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    
    // Only pull down if at the very top of the scroll container
    if (diff > 0 && getScrollTop() <= 4) {
      // Gentle rubber-band damping
      const distance = Math.min(80, Math.pow(diff, 0.82));
      setPullDistance(distance);
    } else {
      setPullDistance(0);
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling) return;
    setIsPulling(false);
    if (pullDistance >= 48 && !isRefreshing) {
      handleTriggerRefresh();
    } else {
      setPullDistance(0);
    }
  };

  // Optional mouse drag/wheel down at top for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (getScrollTop() <= 2 && e.deltaY < -28 && !isRefreshing) {
      handleTriggerRefresh();
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (b.status === 'Cancelled') return false;

    // Vehicle Category Filter
    if (selectedVehicleFilter !== 'ALL') {
      const target = selectedVehicleFilter.toLowerCase();
      const bType = b.vehicleType.toLowerCase();
      if (!bType.includes(target) && !target.includes(bType)) {
        return false;
      }
    }

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
    <div 
      ref={containerRef}
      className="space-y-4 pb-20 relative select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* 0. Fluid Scroll / Pull-to-Refresh Indicator Banner */}
      <div 
        className="overflow-hidden transition-all duration-300 flex flex-col items-center justify-center text-xs pointer-events-none"
        style={{ 
          height: isRefreshing ? '54px' : pullDistance > 0 ? `${pullDistance}px` : '0px',
          opacity: isRefreshing || pullDistance > 10 ? 1 : 0
        }}
      >
        <div className="flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 text-amber-950 shadow-md font-bold text-[11px] animate-in fade-in duration-150">
          {isRefreshing ? (
            <>
              <RotateCw className="w-4 h-4 text-amber-600 animate-spin" />
              <span>Updating live duties & vendor trust...</span>
            </>
          ) : pullDistance >= 48 ? (
            <>
              <ArrowDown className="w-4 h-4 text-emerald-600 rotate-180 transition-transform duration-200" />
              <span className="text-emerald-800">Release to refresh live duties!</span>
            </>
          ) : (
            <>
              <ArrowDown 
                className="w-4 h-4 text-amber-600 transition-transform duration-200" 
                style={{ transform: `rotate(${Math.min(180, (pullDistance / 48) * 180)}deg)` }}
              />
              <span>Pull down to refresh live duties...</span>
            </>
          )}
        </div>
      </div>
      
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

      {/* 2b. Live Duty Header with Scroll Refresh Cue (Button Removed, Scroll Enabled) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black text-slate-800 uppercase tracking-tight">
              Live Duty Mandi
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md border border-emerald-200">
              {filteredBookings.length} Active
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live • Pull down to refresh</span>
          </div>
        </div>

        {/* Duty Radar Quick Notification Banner */}
        {alertCriteria?.enabled && (
          <div 
            onClick={onOpenNotificationCenter}
            className="p-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-[11px] flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-amber-950 truncate">
                Radar Active: <span className="text-slate-800">{alertCriteria.vehicleCategories.join(', ')}</span>
                {alertCriteria.preferredPickupCities.length > 0 && (
                  <span className="text-slate-500 font-normal"> · {alertCriteria.preferredPickupCities.slice(0, 2).join(', ')}</span>
                )}
              </span>
            </div>

            <span className="text-[10px] font-black text-amber-700 shrink-0 ml-1.5 bg-white/70 px-1.5 py-0.5 rounded border border-amber-200">
              Edit Alert Radar ⚙
            </span>
          </div>
        )}

        {/* Quick Driver Vehicle Selection Row */}
        <div className="pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-amber-500" />
              <span>Filter by Cab Category:</span>
            </span>
            {selectedVehicleFilter !== 'ALL' && (
              <button
                onClick={() => setSelectedVehicleFilter('ALL')}
                className="text-[10px] font-bold text-amber-600 hover:underline"
              >
                Show All Cabs
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {/* Option 1: All Vehicles */}
            <button
              onClick={() => setSelectedVehicleFilter('ALL')}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedVehicleFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Vehicles
            </button>

            {/* Option 2: My Attached Cab Shortcut */}
            {attachedVehicleCategory && (
              <button
                onClick={() => setSelectedVehicleFilter(attachedVehicleCategory)}
                className={`px-3 py-1 rounded-full font-black whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedVehicleFilter === attachedVehicleCategory
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-600 fill-amber-400" />
                <span>My Cab: {attachedVehicleCategory}</span>
              </button>
            )}

            {/* Other vehicle options */}
            {(['Sedan', 'Ertiga', 'INNOVA CRYSTA', 'Hatchback', 'SUV'] as const).map((cat) => {
              if (cat === attachedVehicleCategory) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedVehicleFilter(cat)}
                  className={`px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedVehicleFilter === cat
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
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
                  onRateBooking={onRateBooking}
                  onOpenVendorTrust={onOpenVendorTrust}
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
