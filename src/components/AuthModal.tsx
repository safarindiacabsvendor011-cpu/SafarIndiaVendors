import React from 'react';
import { X, User, Phone, MapPin, Car, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile, VehicleCategory } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  initialProfile,
}) => {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [name, setName] = React.useState(initialProfile?.name || 'SafarIndiaCabs Partner');
  const [phone, setPhone] = React.useState(initialProfile?.phone || '8506046346');
  const [city, setCity] = React.useState(initialProfile?.city || 'Delhi NCR');
  const [plateNumber, setPlateNumber] = React.useState(initialProfile?.attachedVehicle?.plateNumber || 'DL 01 ZA 4482');
  const [carModel, setCarModel] = React.useState(initialProfile?.attachedVehicle?.model || 'Swift Dzire Tour 2024');
  const [category, setCategory] = React.useState<VehicleCategory>(initialProfile?.attachedVehicle?.category || 'Sedan');

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStep(2);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber.trim() || !carModel.trim()) return;

    onSaveProfile({
      name,
      phone,
      city,
      attachedVehicle: {
        plateNumber: plateNumber.toUpperCase(),
        model: carModel,
        category,
      },
      membershipPlan: initialProfile?.membershipPlan || 'verified',
      membershipExpiry: initialProfile?.membershipExpiry || 'Nov 29, 2026',
      isLoggedIn: true,
    });
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {step === 1 ? 'Driver & Operator Registration' : 'Attach Your Vehicle (गाड़ी जोड़ें)'}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 1 ? 'Step 1 of 2: Personal Profile' : 'Step 2 of 2: Commercial Vehicle'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 pb-1">
          <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
        </div>

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Full Name / Agency Name (नाम / एजेंसी)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma / Sharma Travels"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Mobile Number (व्हाट्सएप मोबाइल नंबर)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 8506046346"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Base City / Operating Hub (कार्य क्षेत्र / शहर)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Delhi NCR, Haldwani, Jaipur, Dehradun"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200/60 text-[11px] text-blue-900">
              Only verified taxi operators and commercial drivers can publish and accept duties on SafarIndiaCabs.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue to Attach Vehicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Vehicle Attachment */}
        {step === 2 && (
          <form onSubmit={handleFinish} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Commercial Plate Number (पीली नंबर प्लेट)
              </label>
              <input
                type="text"
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder="e.g. DL 01 ZA 4482"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-black text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Car Model & Make (गाड़ी का मॉडल)
              </label>
              <input
                type="text"
                required
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="e.g. Swift Dzire Tour 2024 White"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Vehicle Category (गाड़ी की श्रेणी)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
              >
                <option value="Hatchback">Hatchback (WagonR / Tiago)</option>
                <option value="Sedan">Sedan (Dzire / Etios / Aura)</option>
                <option value="Ertiga">Ertiga (6+1 Seater)</option>
                <option value="SUV">SUV (Carens / Scorpio)</option>
                <option value="INNOVA CRYSTA">INNOVA CRYSTA (7/8 Seater)</option>
                <option value="Tempo Traveller">Tempo Traveller (12-20 Seater)</option>
              </select>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-950">
              Attached vehicle enables 1-click filtering: your Live Duty Board will highlight bookings specifically matching your cab!
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-3.5 py-2 text-slate-500 hover:text-slate-800"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Save Profile & Complete</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
