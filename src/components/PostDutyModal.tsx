import React from 'react';
import { 
  X, 
  PlusCircle, 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Car, 
  Check, 
  Sparkles,
  Share2
} from 'lucide-react';
import { Duty, TripType, VehicleCategory } from '../types';
import { POPULAR_ROUTES } from '../data/initialData';

interface PostDutyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostDuty: (duty: Omit<Duty, 'id' | 'dutyNumber' | 'postedAt' | 'bids' | 'status'>) => void;
  lang: 'en' | 'hi';
  initialPreset?: { pickup: string; drop: string; category: string; fare: number; km: number } | null;
}

export const PostDutyModal: React.FC<PostDutyModalProps> = ({
  isOpen,
  onClose,
  onPostDuty,
  lang,
  initialPreset,
}) => {
  const [tripType, setTripType] = React.useState<TripType>('oneway');
  const [pickupCity, setPickupCity] = React.useState('Delhi');
  const [pickupLocation, setPickupLocation] = React.useState('IGI Airport Terminal 3');
  const [dropCity, setDropCity] = React.useState('Agra');
  const [dropLocation, setDropLocation] = React.useState('Taj Mahal East Gate Road');
  const [pickupDate, setPickupDate] = React.useState('2026-11-03');
  const [pickupTime, setPickupTime] = React.useState('08:00 AM');
  const [returnDate, setReturnDate] = React.useState('');
  const [vehicleCategory, setVehicleCategory] = React.useState<VehicleCategory>('Sedan (Dzire / Etios)');
  const [customerRate, setCustomerRate] = React.useState(3500);
  const [vendorRate, setVendorRate] = React.useState(3000);
  const [advanceAmount, setAdvanceAmount] = React.useState(1000);
  const [tollTaxIncluded, setTollTaxIncluded] = React.useState(true);
  const [distanceKm, setDistanceKm] = React.useState(235);
  const [passengerName, setPassengerName] = React.useState('Corporate Guest');
  const [passengerPhone, setPassengerPhone] = React.useState('+91 98100 12345');
  const [specialInstructions, setSpecialInstructions] = React.useState('Clean car, AC must work, on-time reporting.');

  React.useEffect(() => {
    if (initialPreset) {
      if (initialPreset.pickup) setPickupCity(initialPreset.pickup);
      if (initialPreset.drop) setDropCity(initialPreset.drop);
      if (initialPreset.category) setVehicleCategory(initialPreset.category as any);
      if (initialPreset.fare) {
        setVendorRate(initialPreset.fare);
        setCustomerRate(Math.round(initialPreset.fare * 1.15));
      }
      if (initialPreset.km) setDistanceKm(initialPreset.km);
    }
  }, [initialPreset]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostDuty({
      tripType,
      pickupCity,
      pickupLocation,
      dropCity,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate: tripType === 'roundtrip' ? returnDate : undefined,
      vehicleCategory,
      customerRate: Number(customerRate) || 0,
      vendorRate: Number(vendorRate) || 0,
      commission: Math.max(0, (Number(customerRate) || 0) - (Number(vendorRate) || 0)),
      advanceAmount: Number(advanceAmount) || 0,
      tollTaxIncluded,
      distanceKm: Number(distanceKm) || 200,
      operatorName: 'Safar India Partner (Sharma Travels)',
      operatorPhone: '+91 98112 45890',
      operatorCity: pickupCity,
      operatorRating: 4.9,
      passengerName,
      passengerPhone,
      specialInstructions,
      isUrgent: false,
    });
    onClose();
  };

  const handleRoutePreset = (route: typeof POPULAR_ROUTES[0]) => {
    setPickupCity(route.from);
    setPickupLocation(`${route.from} Central Station / Airport`);
    setDropCity(route.to);
    setDropLocation(`${route.to} Main City Center`);
    setDistanceKm(route.km);
    setVendorRate(route.sedan);
    setCustomerRate(Math.round(route.sedan * 1.15));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8 shadow-2xl relative text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Post New B2B Taxi Duty' : 'नई B2B टैक्सी ड्यूटी पोस्ट करें'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' 
                  ? 'Instantly broadcasts to 1,200+ verified operators & groups.' 
                  : 'सत्यापित ऑपरेटरों के ड्यूटी एक्सचेंज बोर्ड पर तुरंत प्रसारित होगी।'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Route Buttons */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'en' ? 'Quick Route Fill:' : 'त्वरित रूट चयन:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_ROUTES.slice(0, 5).map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleRoutePreset(r)}
                className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                {r.from} ⟶ {r.to}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Trip Type */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">Trip Type (यात्रा का प्रकार)</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'oneway', label: 'One Way' },
                { id: 'roundtrip', label: 'Round Trip' },
                { id: 'airport', label: 'Airport' },
                { id: 'local', label: 'Local 8h/80km' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTripType(t.id as TripType)}
                  className={`py-1.5 rounded-lg font-semibold border transition-all ${
                    tripType === t.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pickup City & Location</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Delhi (IGI Airport T3)"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 mb-1.5"
              />
              <input
                type="text"
                placeholder="Pickup City (e.g. Delhi)"
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-amber-400 text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Drop City & Location</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Agra (Taj East Gate Road)"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 mb-1.5"
              />
              <input
                type="text"
                placeholder="Drop City (e.g. Agra)"
                value={dropCity}
                onChange={(e) => setDropCity(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-amber-400 text-[11px]"
              />
            </div>
          </div>

          {/* Vehicle Category & Distance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Vehicle Category</label>
              <select
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios)</option>
                <option value="SUV (Ertiga / Carens)">SUV (Ertiga / Carens)</option>
                <option value="Prime SUV (Innova Crysta)">Prime SUV (Innova Crysta)</option>
                <option value="Tempo Traveller (12-20s)">Tempo Traveller (12-20s)</option>
                <option value="Luxury (Camry / Fortuner)">Luxury (Camry / Fortuner)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Estimated Distance (KM)</label>
              <input
                type="number"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Pickup Date</label>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Reporting Time</label>
              <input
                type="text"
                required
                placeholder="e.g. 06:30 AM"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {tripType === 'roundtrip' && (
              <div>
                <label className="block text-slate-400 font-medium mb-1">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            )}
          </div>

          {/* Pricing & Advance */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-semibold text-slate-300">Financial Breakdown (रेट व कमीशन)</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Vendor Net Offer (₹)</label>
                <input
                  type="number"
                  required
                  value={vendorRate}
                  onChange={(e) => setVendorRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Customer Fare (₹)</label>
                <input
                  type="number"
                  value={customerRate}
                  onChange={(e) => setCustomerRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Advance Amount (₹)</label>
                <input
                  type="number"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 font-mono text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={tollTaxIncluded}
                  onChange={(e) => setTollTaxIncluded(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500"
                />
                <span>Toll & State Border Tax: <strong>{tollTaxIncluded ? 'INCLUDED' : 'EXTRA'}</strong></span>
              </label>

              <div className="text-slate-400">
                Operator Margin: <span className="font-mono text-emerald-400 font-bold">₹{(customerRate - vendorRate) || 0}</span>
              </div>
            </div>
          </div>

          {/* Passenger details & Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Passenger / Guest Name</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Passenger Phone</label>
              <input
                type="tel"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Special Requirements / Driver Instructions</label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Broadcast Duty to Network</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
