import React from 'react';
import { X, FileCheck, CheckCircle2, ShieldCheck, Printer, Download, MapPin, Calendar } from 'lucide-react';

interface StateTaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (receipt: any) => void;
}

export const StateTaxModal: React.FC<StateTaxModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [targetState, setTargetState] = React.useState('Uttar Pradesh');
  const [vehicleNo, setVehicleNo] = React.useState('DL 01 ZA 4482');
  const [carType, setCarType] = React.useState<'sedan' | 'suv' | 'tempo'>('sedan');
  const [validity, setValidity] = React.useState<'1_day' | '7_days' | '30_days'>('1_day');
  const [issuedReceipt, setIssuedReceipt] = React.useState<any | null>(null);

  if (!isOpen) return null;

  const stateTaxRates: Record<string, { sedan: number; suv: number; tempo: number }> = {
    'Uttar Pradesh': { sedan: 120, suv: 200, tempo: 450 },
    'Rajasthan': { sedan: 240, suv: 380, tempo: 750 },
    'Haryana': { sedan: 100, suv: 150, tempo: 350 },
    'Punjab': { sedan: 200, suv: 320, tempo: 600 },
    'Uttarakhand': { sedan: 180, suv: 280, tempo: 550 },
    'Himachal Pradesh': { sedan: 250, suv: 400, tempo: 800 },
  };

  const multiplier = validity === '1_day' ? 1 : validity === '7_days' ? 5 : 18;
  const baseTax = (stateTaxRates[targetState]?.[carType] || 150) * multiplier;
  const platformFee = 25;
  const totalPayable = baseTax + platformFee;

  const handlePayTax = (e: React.FormEvent) => {
    e.preventDefault();
    const receipt = {
      receiptNo: `PARIVAHAN-${targetState.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-7)}`,
      state: targetState,
      vehicle: vehicleNo,
      amount: totalPayable,
      validFrom: 'Today',
      validTill: validity === '1_day' ? 'Today Midnight' : validity === '7_days' ? '7 Days' : '30 Days',
    };
    setIssuedReceipt(receipt);
    onSuccess(receipt);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <FileCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Online State Border Permit Tax
              </h2>
              <p className="text-xs text-slate-500">
                Parivahan Authorized Border Entry Tax
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {issuedReceipt ? (
          <div className="py-4 text-center space-y-3.5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">Border Tax Paid Successfully!</h3>
              <p className="text-xs text-slate-500">
                RTO Border Permit is valid and verified in VAHAN database.
              </p>
            </div>

            {/* Official Digital Tax Slip */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                <span className="font-bold text-slate-900">GOVT. PERMIT RECEIPT</span>
                <span className="text-amber-700 font-bold">{issuedReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between text-slate-700 pt-1">
                <span>Entering State:</span>
                <strong className="text-slate-900">{issuedReceipt.state}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Vehicle Plate:</span>
                <strong className="text-slate-900">{issuedReceipt.vehicle}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Validity:</span>
                <strong className="text-slate-900">{issuedReceipt.validTill}</strong>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-amber-200">
                <span>Tax Paid:</span>
                <span className="text-emerald-700 text-sm">₹{issuedReceipt.amount}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  setIssuedReceipt(null);
                  onClose();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePayTax} className="space-y-3.5 text-xs">
            
            {/* Entering State */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Select State Entering (प्रवेश राज्य)
              </label>
              <select
                value={targetState}
                onChange={(e) => setTargetState(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-amber-500"
              >
                <option value="Uttar Pradesh">Uttar Pradesh (UP Entry)</option>
                <option value="Rajasthan">Rajasthan (Jaipur / Udaipur)</option>
                <option value="Haryana">Haryana (Gurgaon / Panipat)</option>
                <option value="Punjab">Punjab (Chandigarh / Amritsar)</option>
                <option value="Uttarakhand">Uttarakhand (Haridwar / Dehradun)</option>
                <option value="Himachal Pradesh">Himachal Pradesh (Shimla / Manali)</option>
              </select>
            </div>

            {/* Vehicle Number */}
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

            {/* Vehicle Type */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Seating Category</label>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { id: 'sedan', label: 'Sedan (4+1)' },
                  { id: 'suv', label: 'SUV (6+1)' },
                  { id: 'tempo', label: 'Tempo (12+)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCarType(item.id as any)}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all ${
                      carType === item.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Validity */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tax Duration</label>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { id: '1_day', label: '1 Day Pass' },
                  { id: '7_days', label: '7 Days Pass' },
                  { id: '30_days', label: 'Monthly' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setValidity(item.id as any)}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all ${
                      validity === item.id
                        ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Tax Amount */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">
                  Official Govt. Tax + Portal Fee
                </div>
                <div className="text-2xl font-black font-mono text-amber-600">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <div>Instant QR Receipt</div>
                <div className="text-emerald-700 font-semibold">Valid across all toll barriers</div>
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
                Pay Tax & Generate Slip
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
