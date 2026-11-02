import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Car, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Download, 
  Share2, 
  Printer, 
  Sparkles, 
  Award, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (policyNo: string) => void;
  savedVehicleNumber?: string;
}

const INSURERS = [
  { id: 'digit', name: 'Go Digit General Insurance', claimRatio: '98.5%', logo: 'Digit' },
  { id: 'tata', name: 'TATA AIG Commercial Auto', claimRatio: '99.1%', logo: 'TATA AIG' },
  { id: 'icici', name: 'ICICI Lombard Bharat Griha', claimRatio: '97.8%', logo: 'ICICI' },
  { id: 'hdfc', name: 'HDFC ERGO General Insurance', claimRatio: '98.2%', logo: 'HDFC' },
];

export const InsuranceModal: React.FC<InsuranceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  savedVehicleNumber = 'DL 01 ZA 4482'
}) => {
  const [vehicleNo, setVehicleNo] = useState(savedVehicleNumber);
  const [model, setModel] = useState('Swift Dzire Tour 2024');
  const [duration, setDuration] = useState<'3_month' | '1_year'>('3_month');
  const [planType, setPlanType] = useState<'tp' | 'comp'>('tp');
  const [selectedInsurer, setSelectedInsurer] = useState('digit');
  const [includePassengerCover, setIncludePassengerCover] = useState(true);
  const [seatingCapacity, setSeatingCapacity] = useState(5);
  const [issuedPolicy, setIssuedPolicy] = useState<any | null>(null);

  if (!isOpen) return null;

  const baseRates = {
    '3_month': {
      tp: seatingCapacity <= 5 ? 1499 : 2299,
      comp: seatingCapacity <= 5 ? 2899 : 3999,
    },
    '1_year': {
      tp: seatingCapacity <= 5 ? 5499 : 7999,
      comp: seatingCapacity <= 5 ? 9899 : 14899,
    },
  };

  const passengerAddOn = includePassengerCover ? (duration === '3_month' ? 199 : 599) : 0;
  const currentPrice = baseRates[duration][planType] + passengerAddOn;

  const handleIssuePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const policyId = `POL/SIC/${selectedInsurer.toUpperCase()}/2026/${Math.floor(100000 + Math.random() * 900000)}`;
    const policyData = {
      policyNo: policyId,
      insurerName: INSURERS.find((i) => i.id === selectedInsurer)?.name || 'Go Digit Insurance',
      vehicleNo: vehicleNo.toUpperCase(),
      model,
      duration: duration === '3_month' ? '3 Months (Quarterly)' : '1 Year (Annual)',
      planType: planType === 'tp' ? 'Third Party Only (TP)' : 'Comprehensive (Own Damage + TP)',
      seating: `${seatingCapacity} Passengers`,
      passengerCover: includePassengerCover ? '₹2,00,000 / seat PA Cover Included' : 'Standard',
      premium: currentPrice,
      validFrom: 'Immediate (Today)',
      validTill: duration === '3_month' ? 'Feb 02, 2027' : 'Nov 02, 2027',
      vahanSyncId: `IRDAI/POSP/2611/${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    setIssuedPolicy(policyData);
    onSuccess(policyId);
  };

  const handleShareWhatsAppPolicy = () => {
    if (!issuedPolicy) return;
    const text = `*COMMERCIAL CAB INSURANCE POLICY (PoSP ISSUED)*%0A%0A` +
      `🛡️ *Insurer:* ${issuedPolicy.insurerName}%0A` +
      `📄 *Policy No:* ${issuedPolicy.policyNo}%0A` +
      `🚗 *Vehicle No:* ${issuedPolicy.vehicleNo} (${issuedPolicy.model})%0A` +
      `⏳ *Duration:* ${issuedPolicy.duration}%0A` +
      `🛡️ *Plan:* ${issuedPolicy.planType}%0A` +
      `📅 *Validity:* ${issuedPolicy.validFrom} to ${issuedPolicy.validTill}%0A` +
      `💳 *Premium Paid:* ₹${issuedPolicy.premium}%0A` +
      `✅ *VAHAN Sync ID:* ${issuedPolicy.vahanSyncId}%0A%0A` +
      `_Issued via SafarIndiaCabs PoSP Commercial Insurance Desk. Legally valid across all RTO checkposts & toll barriers._`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200/80 relative text-slate-800 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-4 relative shrink-0">
          <button onClick={onClose} className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-300" />
              IRDAI Certified PoSP Commercial Desk
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white mt-1">
            Commercial Cab Insurance (PoSP Flow)
          </h2>
          <p className="text-xs text-slate-300">
            Instant 3-Month TP & Comprehensive renewals with digital policy generation.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {issuedPolicy ? (
            <div className="py-2 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Commercial Policy Issued Instantly!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synced directly with Central VAHAN / mParivahan server within 30 minutes.
                </p>
              </div>

              {/* Digital Certificate Box */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/50 text-left space-y-2 font-mono relative overflow-hidden text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-amber-200">
                  <div>
                    <span className="font-bold text-slate-900 block">{issuedPolicy.insurerName}</span>
                    <span className="text-[10px] text-amber-800 font-semibold">{issuedPolicy.planType}</span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-amber-300 font-bold text-slate-900">
                    {issuedPolicy.policyNo}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-800 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Vehicle:</span>
                    <strong className="text-slate-950 font-bold">{issuedPolicy.vehicleNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Model:</span>
                    <strong className="text-slate-800">{issuedPolicy.model}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Term:</span>
                    <strong className="text-slate-900">{issuedPolicy.duration}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Validity:</span>
                    <strong className="text-emerald-700">{issuedPolicy.validTill}</strong>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-amber-200 flex justify-between items-baseline font-sans">
                    <span className="text-slate-600 text-xs font-semibold">Total Premium Paid:</span>
                    <span className="text-emerald-700 font-black font-mono text-base">₹{issuedPolicy.premium}.00</span>
                  </div>
                </div>

                <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-sans border-t border-amber-200/60">
                  <span>VAHAN ID: {issuedPolicy.vahanSyncId}</span>
                  <span className="text-emerald-700 font-bold">Status: ACTIVE ✓</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleShareWhatsAppPolicy}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>1-Click WhatsApp PDF Share (व्हाट्सएप शेयर)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIssuedPolicy(null);
                      onClose();
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Done & Return
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <form onSubmit={handleIssuePolicy} className="space-y-3.5">
              
              {/* Duration Selector */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Select Policy Duration *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration('3_month')}
                    className={`p-2.5 rounded-xl border font-bold transition-all text-left ${
                      duration === '3_month'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-black">3 Months (Short Term)</div>
                    <div className={`text-[10px] mt-0.5 ${duration === '3_month' ? 'text-amber-100' : 'text-slate-500'}`}>
                      Starts at ₹1,499 • Perfect for tourist season
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuration('1_year')}
                    className={`p-2.5 rounded-xl border font-bold transition-all text-left ${
                      duration === '1_year'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-black">1 Year (Annual Policy)</div>
                    <div className={`text-[10px] mt-0.5 ${duration === '1_year' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Full 365 Days RTO Compliance
                    </div>
                  </button>
                </div>
              </div>

              {/* Insurer Choice (PoSP Partner) */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Choose Partner Insurer
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INSURERS.map((ins) => (
                    <button
                      key={ins.id}
                      type="button"
                      onClick={() => setSelectedInsurer(ins.id)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        selectedInsurer === ins.id
                          ? 'border-amber-500 bg-amber-50 text-slate-950 font-bold shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[11px] truncate">{ins.name}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{ins.claimRatio} Settlement</div>
                    </button>
                  ))}
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Car Model</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Dzire / Crysta / Ertiga"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Plan Coverage: TP vs Comprehensive */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Coverage Scope</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlanType('tp')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      planType === 'tp'
                        ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold shadow-2xs'
                        : 'border-slate-200 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">Third Party (TP Only)</div>
                    <div className="text-[10px] text-slate-500">Legal RTO & checkpost requirement</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlanType('comp')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      planType === 'comp'
                        ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold shadow-2xs'
                        : 'border-slate-200 text-slate-600 bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">Comprehensive</div>
                    <div className="text-[10px] text-slate-500">Accidental + Theft + Third Party</div>
                  </button>
                </div>
              </div>

              {/* Passenger Cover Add-on */}
              <label className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800 text-[11px]">Passenger Personal Accident (PA) Cover</div>
                    <div className="text-[10px] text-slate-500">₹2,00,000 cover for each passenger seat</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includePassengerCover}
                  onChange={(e) => setIncludePassengerCover(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4"
                />
              </label>

              {/* Price Banner */}
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Total Instant Premium (Incl. GST)
                  </div>
                  <div className="text-2xl font-black font-mono">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-300">
                  <div>Digital PoSP Certificate</div>
                  <div className="text-emerald-400 font-semibold">Immediate PDF Issuance</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Issue Commercial Policy Now</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
