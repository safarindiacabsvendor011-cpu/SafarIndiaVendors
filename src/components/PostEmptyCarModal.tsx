import React from 'react';
import { X, Car, PlusCircle, MapPin, Navigation, Clock, UserCheck } from 'lucide-react';
import { EmptyCar, VehicleCategory } from '../types';

interface PostEmptyCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostEmptyCar: (car: Omit<EmptyCar, 'id' | 'postedAt' | 'status'>) => void;
  lang: 'en' | 'hi';
}

export const PostEmptyCarModal: React.FC<PostEmptyCarModalProps> = ({
  isOpen,
  onClose,
  onPostEmptyCar,
  lang,
}) => {
  const [carModel, setCarModel] = React.useState('Maruti Suzuki Dzire (White)');
  const [vehicleCategory, setVehicleCategory] = React.useState<VehicleCategory>('Sedan (Dzire / Etios)');
  const [vehicleNumber, setVehicleNumber] = React.useState('DL 01 ZB 4412');
  const [driverName, setDriverName] = React.useState('Karan Verma');
  const [driverPhone, setDriverPhone] = React.useState('+91 98102 33441');
  const [currentCity, setCurrentCity] = React.useState('Agra');
  const [destinationCity, setDestinationCity] = React.useState('Delhi / Gurgaon / Noida');
  const [availableDate, setAvailableDate] = React.useState('Today');
  const [availableTime, setAvailableTime] = React.useState('05:00 PM onwards');
  const [askingPrice, setAskingPrice] = React.useState(1600);
  const [seatsAvailable, setSeatsAvailable] = React.useState(4);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostEmptyCar({
      carModel,
      vehicleCategory,
      vehicleNumber: vehicleNumber.toUpperCase(),
      driverName,
      driverPhone,
      currentCity,
      destinationCity,
      availableDate,
      availableTime,
      askingPrice: Number(askingPrice) || 1200,
      seatsAvailable: Number(seatsAvailable) || 4,
      operatorName: 'Safar India Partner Fleet',
      operatorPhone: '+91 98112 45890',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-100">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'List Empty Return Cab (खाली गाड़ी)' : 'खाली गाड़ी दर्ज करें'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Get return passengers and save dead kilometer fuel.' : 'वापसी की बुकिंग पाएं और खाली गाड़ी का नुकसान बचाएं।'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Current City / Location</label>
              <input
                type="text"
                required
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
                placeholder="e.g. Agra, Jaipur, Haridwar"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Going Towards (Destination)</label>
              <input
                type="text"
                required
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="e.g. Delhi NCR, Airport"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Car Model</label>
              <input
                type="text"
                required
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="e.g. Maruti Dzire White"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Vehicle Plate No.</label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="DL 01 ZA 1234"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono uppercase focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Available Date & Time</label>
              <input
                type="text"
                required
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                placeholder="e.g. Today 5 PM onwards"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Asking Deal Price (₹)</label>
              <input
                type="number"
                required
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                placeholder="1500"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Driver Name</label>
              <input
                type="text"
                required
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Driver Mobile</label>
              <input
                type="tel"
                required
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Post Empty Return
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
