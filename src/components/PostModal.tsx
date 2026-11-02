import React from 'react';
import { X, Car, PlusCircle, MapPin, Navigation, Calendar, Clock, Sparkles } from 'lucide-react';
import { Booking, FreeVehicle, VehicleCategory } from '../types';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostBooking: (b: Omit<Booking, 'id' | 'hasUnlockedContact' | 'chatId'>) => void;
  onPostFreeVehicle: (fv: Omit<FreeVehicle, 'id' | 'postedAt' | 'status'>) => void;
  lang: 'en' | 'hi';
}

export const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onPostBooking,
  onPostFreeVehicle,
  lang,
}) => {
  const [selectedType, setSelectedType] = React.useState<'select' | 'booking' | 'free_vehicle'>('select');

  // Booking Form State
  const [pickup, setPickup] = React.useState('Haldwani');
  const [drop, setDrop] = React.useState('New Delhi');
  const [tripType, setTripType] = React.useState<'One Way' | 'Round Trip'>('One Way');
  const [date, setDate] = React.useState('Today @ 02:30 PM');
  const [vehicleType, setVehicleType] = React.useState<VehicleCategory>('Sedan');
  const [totalAmount, setTotalAmount] = React.useState(3800);
  const [commission, setCommission] = React.useState(600);
  const [extraReq, setExtraReq] = React.useState('All inclusive, Inc AC in plains, luggage carrier');
  const [passengerName, setPassengerName] = React.useState('Sunil Mehra');
  const [passengerPhone, setPassengerPhone] = React.useState('+91 98110 55432');

  // Free Vehicle Form State
  const [fvCurrent, setFvCurrent] = React.useState('Haridwar');
  const [fvDest, setFvDest] = React.useState('Delhi NCR');
  const [fvModel, setFvModel] = React.useState('Swift Dzire');
  const [fvPlate, setFvPlate] = React.useState('UK 07 TA 4410');
  const [fvDriver, setFvDriver] = React.useState('Pawan Kumar');
  const [fvDriverPhone, setFvDriverPhone] = React.useState('+91 98370 22119');
  const [fvTime, setFvTime] = React.useState('Today @ 05:00 PM');
  const [fvPrice, setFvPrice] = React.useState(1600);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostBooking({
      status: 'Open',
      pickupLocation: pickup,
      dropLocation: drop,
      tripType,
      pickupDate: date,
      vehicleType,
      totalAmount: Number(totalAmount),
      commission: Number(commission),
      platformFeePercent: 3,
      extraRequirements: extraReq,
      isSecured: true,
      postedBy: {
        id: 'user-self',
        name: 'SafarIndiaCabs (You)',
        phone: '8506046346',
        reviewsCount: 7,
        rating: 4.5,
      },
      customerDetails: {
        name: passengerName,
        phone: passengerPhone,
        pickupAddress: `${pickup} Main Stand / Address`,
      },
    });
    setSelectedType('select');
    onClose();
  };

  const handleFreeVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostFreeVehicle({
      driverName: fvDriver,
      driverPhone: fvDriverPhone,
      vehicleType: 'Sedan',
      vehicleNumber: `${fvPlate} (${fvModel})`,
      currentLocation: fvCurrent,
      destinationLocation: fvDest,
      availableDate: fvTime,
      demandedPrice: Number(fvPrice),
      seats: 4,
    });
    setSelectedType('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in slide-in-from-bottom-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {selectedType === 'select' ? 'Post' :
             selectedType === 'booking' ? 'Post New Booking Lead' : 'Post Free Vehicle (खाली गाड़ी)'}
          </h2>
          <button
            onClick={() => {
              setSelectedType('select');
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. INITIAL SELECTOR (Exact match to screenshot 3) */}
        {selectedType === 'select' && (
          <div className="grid grid-cols-2 gap-3 py-4">
            <button
              onClick={() => setSelectedType('booking')}
              className="py-4 px-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm shadow-sm transition-all flex flex-col items-center justify-center gap-2"
            >
              <PlusCircle className="w-6 h-6 stroke-[2.5]" />
              <span>New Booking</span>
            </button>

            <button
              onClick={() => setSelectedType('free_vehicle')}
              className="py-4 px-3 rounded-2xl bg-slate-700 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-sm shadow-sm transition-all flex flex-col items-center justify-center gap-2"
            >
              <Car className="w-6 h-6 stroke-[2]" />
              <span>Free Vehicle</span>
            </button>
          </div>
        )}

        {/* 2. NEW BOOKING FORM */}
        {selectedType === 'booking' && (
          <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs max-h-[75vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Pickup Location</label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Haldwani"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Drop Location</label>
                <input
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="Hatchback">Hatchback (WagonR)</option>
                  <option value="Sedan">Sedan (Dzire / Etios)</option>
                  <option value="Ertiga">Ertiga (6+1)</option>
                  <option value="INNOVA CRYSTA">INNOVA CRYSTA</option>
                  <option value="Tempo Traveller">Tempo Traveller</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="One Way">One Way</option>
                  <option value="Round Trip">Round Trip</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Pickup Date & Time</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Today @ 02:30 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Financials & Commission */}
            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl space-y-2">
              <div className="font-bold text-slate-800 text-xs">
                Booking Amount & Commission
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 text-[11px] mb-1">Total Fare (₹)</label>
                  <input
                    type="number"
                    required
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-[11px] mb-1">Your Commission (₹)</label>
                  <input
                    type="number"
                    required
                    value={commission}
                    onChange={(e) => setCommission(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-amber-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500">
                Vendor pays ₹{commission} into company mediator escrow. Once trip completes, ₹{Math.round(commission * 0.97)} (minus 3% platform charge) will be transferred to your account!
              </p>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Extra Requirements</label>
              <input
                type="text"
                value={extraReq}
                onChange={(e) => setExtraReq(e.target.value)}
                placeholder="e.g. with carrier, Inc AC in plains"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Passenger Name</label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Passenger Phone</label>
                <input
                  type="tel"
                  required
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedType('select')}
                className="px-3 py-2 text-slate-500 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs"
              >
                Publish Lead to Market
              </button>
            </div>
          </form>
        )}

        {/* 3. FREE VEHICLE FORM */}
        {selectedType === 'free_vehicle' && (
          <form onSubmit={handleFreeVehicleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Current Location</label>
                <input
                  type="text"
                  required
                  value={fvCurrent}
                  onChange={(e) => setFvCurrent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Destination Location</label>
                <input
                  type="text"
                  required
                  value={fvDest}
                  onChange={(e) => setFvDest(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Vehicle Model & Plate</label>
                <input
                  type="text"
                  required
                  value={fvPlate}
                  onChange={(e) => setFvPlate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Demanded Price (₹)</label>
                <input
                  type="number"
                  required
                  value={fvPrice}
                  onChange={(e) => setFvPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Driver Name</label>
                <input
                  type="text"
                  required
                  value={fvDriver}
                  onChange={(e) => setFvDriver(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Driver Mobile</label>
                <input
                  type="tel"
                  required
                  value={fvDriverPhone}
                  onChange={(e) => setFvDriverPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedType('select')}
                className="px-3 py-2 text-slate-500 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs"
              >
                Publish Free Vehicle
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
