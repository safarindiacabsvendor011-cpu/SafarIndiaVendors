import React from 'react';
import { X, MapPin, ChevronDown, Check } from 'lucide-react';
import { TripType, VehicleCategory } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    tripType: TripType;
    vehicles: VehicleCategory[];
    pickup: string;
    drop: string;
  }) => void;
  currentFilters: {
    tripType: TripType;
    vehicles: VehicleCategory[];
    pickup: string;
    drop: string;
  };
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [tripType, setTripType] = React.useState<TripType>(currentFilters.tripType || 'Both');
  const [selectedVehicles, setSelectedVehicles] = React.useState<VehicleCategory[]>(
    currentFilters.vehicles || ['Hatchback', 'Sedan']
  );
  const [pickup, setPickup] = React.useState(currentFilters.pickup || 'Haldwani');
  const [drop, setDrop] = React.useState(currentFilters.drop || '');

  if (!isOpen) return null;

  const vehicleOptions: VehicleCategory[] = [
    'Hatchback',
    'Sedan',
    'Ertiga',
    'SUV',
    'INNOVA CRYSTA',
    'Tempo Traveller',
  ];

  const toggleVehicle = (v: VehicleCategory) => {
    if (selectedVehicles.includes(v)) {
      setSelectedVehicles(selectedVehicles.filter((item) => item !== v));
    } else {
      setSelectedVehicles([...selectedVehicles, v]);
    }
  };

  const handleSave = () => {
    onApplyFilters({
      tripType,
      vehicles: selectedVehicles,
      pickup,
      drop,
    });
    onClose();
  };

  const handleClear = () => {
    setTripType('Both');
    setSelectedVehicles([]);
    setPickup('');
    setDrop('');
    onApplyFilters({
      tripType: 'Both',
      vehicles: [],
      pickup: '',
      drop: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in slide-in-from-bottom-5 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Apply Filter
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Select Trip Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Select Trip Type
          </label>
          <div className="relative">
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value as TripType)}
              className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="Both">Both</option>
              <option value="One Way">One Way</option>
              <option value="Round Trip">Round Trip</option>
              <option value="Local">Local</option>
            </select>
            <ChevronDown className="w-4 h-4 text-amber-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Select Vehicle Type with chips */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Select Vehicle Type
          </label>
          
          <div className="flex flex-wrap gap-2">
            {vehicleOptions.map((v) => {
              const isSelected = selectedVehicles.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => toggleVehicle(v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{v}</span>
                  {isSelected && <X className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Pickup Location */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Pickup Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Haldwani"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500"
            />
            <MapPin className="w-4 h-4 text-amber-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 4. Drop Location */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Drop Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Add Drop Location"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-amber-500"
            />
            <MapPin className="w-4 h-4 text-amber-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Bottom Actions (Exact match to screenshot 3) */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            type="button"
            onClick={handleClear}
            className="py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            Clear Filters
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};
