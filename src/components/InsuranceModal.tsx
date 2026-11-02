import React from 'react';
import { X, ShieldCheck, CheckCircle2, Car, Calendar, FileText, ArrowRight, Download } from 'lucide-react';

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (policyNo: string) => void;
}

export const InsuranceModal: React.FC<InsuranceModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [vehicleNo, setVehicleNo] = React.useState('DL 01 ZA 4482');
  const [model, setModel] = React.useState('Swift Dzire Tour 2024');
  const [duration, setDuration] = React.useState<'3_month' | '1_year'>('3_month');
  const [planType, setPlanType] = React.useState<'tp' | 'comp'>('tp');
  const [issuedPolicy, setIssuedPolicy] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const prices = {
    '3_month': { tp: 1499, comp: 2899 },
    '1_year': { tp: 5499, comp: 9899 },
  };

  const currentPrice = prices[duration][planType];

  const handleIssuePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const policy = `SIC-INS-2611-${Math.floor(100000 + Math.random() * 900000)}`;
    setIssuedPolicy(policy);
    onSuccess(policy);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Commercial Cab Insurance Desk
              </h2>
              <p className="text-xs text-slate-500">
                Special 3-Month & Annual Tourist Taxi Policies
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {issuedPolicy ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Policy Issued Instantly!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your commercial policy is active on mParivahan / VAHAN portal.
              </p>
              <div className="font-mono font-bold text-amber-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2 text-sm">
                Policy No: {issuedPolicy}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-bold text-slate-800">{vehicleNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-slate-800">{duration === '3_month' ? '3 Months Short-Term' : '1 Year Annual'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Premium Paid:</span>
                <span className="font-bold text-emerald-600 font-mono">₹{currentPrice}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIssuedPolicy(null);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleIssuePolicy} className="space-y-3.5 text-xs">
            
            {/* Duration Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                Policy Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDuration('3_month')}
                  className={`py-2 px-3 rounded-xl border font-bold transition-all text-center ${
                    duration === '3_month'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  3 Months (Short Term)
                </button>

                <button
                  type="button"
                  onClick={() => setDuration('1_year')}
                  className={`py-2 px-3 rounded-xl border font-bold transition-all text-center ${
                    duration === '1_year'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  1 Year (Annual)
                </button>
              </div>
            </div>

            {/* Vehicle Number & Model */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Commercial Plate No.</label>
                <input
                  type="text"
                  required
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                  placeholder="DL 01 ZA 4482"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Car Model</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Swift Dzire 2024"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Plan coverage */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Coverage Plan</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlanType('tp')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    planType === 'tp'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-bold">Third Party (TP)</div>
                  <div className="text-[10px] text-slate-500">Mandatory govt. permit coverage</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType('comp')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    planType === 'comp'
                      ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-bold">Comprehensive</div>
                  <div className="text-[10px] text-slate-500">Accident + Damage + TP Cover</div>
                </button>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Total Instant Premium
                </div>
                <div className="text-2xl font-black font-mono">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-300">
                <div>Instant Digital Policy</div>
                <div className="text-emerald-400 font-semibold">VAHAN sync within 1 hr</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xs active:scale-95"
              >
                Pay & Issue Policy
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
