import React from 'react';
import { 
  Car, 
  MapPin, 
  Navigation, 
  Phone, 
  Share2, 
  Clock, 
  PlusCircle, 
  ShieldCheck, 
  Users, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { EmptyCar } from '../types';
import { formatCurrency, generateEmptyCarWhatsAppText } from '../utils/formatters';

interface EmptyReturnMarketProps {
  emptyCars: EmptyCar[];
  lang: 'en' | 'hi';
  onOpenPostEmpty: () => void;
  onOpenWhatsAppEmpty: (empty: EmptyCar) => void;
  onBookEmptyCar: (carId: string) => void;
}

export const EmptyReturnMarket: React.FC<EmptyReturnMarketProps> = ({
  emptyCars,
  lang,
  onOpenPostEmpty,
  onOpenWhatsAppEmpty,
  onBookEmptyCar,
}) => {
  const [originFilter, setOriginFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCars = emptyCars.filter((car) => {
    if (car.status !== 'available') return false;
    if (originFilter !== 'all' && !car.currentCity.toLowerCase().includes(originFilter.toLowerCase())) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        car.currentCity.toLowerCase().includes(q) ||
        car.destinationCity.toLowerCase().includes(q) ||
        car.carModel.toLowerCase().includes(q) ||
        car.vehicleNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Informational Callout Bar */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {lang === 'en' 
                ? 'Khaali Gaadi Bazaar (Empty Return Exchange)' 
                : 'खाली गाड़ी बाज़ार - वापसी ट्रिप'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
              {lang === 'en'
                ? 'Save fuel costs and eliminate dead miles. Post cabs returning empty from outstation drops to match with passengers or partner operators.'
                : 'ड्राइवर की खाली वापसी बचाएं। अगर आपकी गाड़ी किसी शहर से खाली लौट रही है, तो यहां लिस्ट करें और तुरंत ग्राहक पाएं।'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPostEmpty}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === 'en' ? '+ Post Empty Return Cab' : '+ खाली गाड़ी डालें'}</span>
        </button>
      </div>

      {/* Filter and count bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-medium">
            {lang === 'en' ? 'Current City:' : 'वर्तमान शहर:'}
          </span>
          {['all', 'Agra', 'Chandigarh', 'Haridwar', 'Jaipur', 'Delhi'].map((city) => (
            <button
              key={city}
              onClick={() => setOriginFilter(city)}
              className={`px-2.5 py-1 rounded-md transition-colors capitalize ${
                originFilter === city
                  ? 'bg-slate-800 text-amber-400 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {city === 'all' ? (lang === 'en' ? 'All Cities' : 'सभी शहर') : city}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          <span className="font-mono tabular-nums font-semibold text-amber-400">{filteredCars.length}</span>{' '}
          {lang === 'en' ? 'Empty Return Cabs Active' : 'खाली गाड़ियां उपलब्ध'}
        </div>
      </div>

      {/* Empty Cars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header: Model & Asking Price */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {car.carModel}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono text-xs text-amber-400 font-medium">
                      {car.vehicleNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>{car.operatorName}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{car.postedAt}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">
                    {lang === 'en' ? 'Asking Price' : 'मांग'}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-amber-400">
                    {formatCurrency(car.askingPrice)}
                  </div>
                </div>
              </div>

              {/* Route & Availability Info */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-400">{lang === 'en' ? 'From:' : 'से:'}</span>
                    <span className="font-semibold text-slate-200">{car.currentCity}</span>
                  </div>
                  <span className="text-slate-500">⟶</span>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-400">{lang === 'en' ? 'To:' : 'तक:'}</span>
                    <span className="font-semibold text-slate-200">{car.destinationCity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{car.availableDate} · {car.availableTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{car.seatsAvailable} {lang === 'en' ? 'Seats Max' : 'सीट'}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between text-slate-300">
                  <div>
                    <span className="text-slate-400">Driver: </span>
                    <span className="font-semibold text-white">{car.driverName}</span>
                  </div>
                  <a
                    href={`tel:${car.driverPhone}`}
                    className="font-mono text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{car.driverPhone}</span>
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenWhatsAppEmpty(car)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Share</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${car.operatorPhone}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'en' ? 'Call' : 'कॉल'}</span>
                  </a>

                  <button
                    onClick={() => onBookEmptyCar(car.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                  >
                    {lang === 'en' ? 'Book Return Cab' : 'बुक करें'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-900/30 rounded-xl border border-slate-800 p-6 space-y-2">
            <Car className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              {lang === 'en' ? 'No empty return cabs listed for this city right now' : 'इस शहर के लिए फिलहाल कोई खाली गाड़ी उपलब्ध नहीं है'}
            </p>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Post your empty return car to get passenger leads instantly.' : 'अपनी खाली गाड़ी पोस्ट करें और सीधे पैसेंजर लीड पाएं।'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
