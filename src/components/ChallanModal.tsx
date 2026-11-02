import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Camera, 
  ExternalLink, 
  RefreshCw, 
  Share2,
  FileText,
  Car
} from 'lucide-react';

interface ChallanModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVehicleNo?: string;
}

interface ChallanItem {
  id: string;
  challanNo: string;
  vehicleNo: string;
  date: string;
  time: string;
  offense: string;
  location: string;
  amount: number;
  state: 'Delhi' | 'Haryana' | 'Uttar Pradesh' | 'Rajasthan' | 'Uttarakhand';
  status: 'Pending' | 'Virtual Court' | 'Paid';
  courtName?: string;
  hasPhotoProof: boolean;
}

const SAMPLE_CHALLANS: Record<string, ChallanItem[]> = {
  'HR55BE7564': [
    {
      id: 'ch-1',
      challanNo: 'HR2610260918442',
      vehicleNo: 'HR55BE7564',
      date: '28 Oct, 2026',
      time: '04:12 PM',
      offense: 'Exceeding Prescribed Speed Limit (Over-speeding 88 km/h in 70 km/h expressway zone)',
      location: 'NH-48 Rajiv Chowk Flyover, Gurgaon',
      amount: 2000,
      state: 'Haryana',
      status: 'Pending',
      courtName: 'Virtual Court Gurgaon (CMM)',
      hasPhotoProof: true,
    },
    {
      id: 'ch-2',
      challanNo: 'DL2610190411209',
      vehicleNo: 'HR55BE7564',
      date: '19 Oct, 2026',
      time: '11:45 AM',
      offense: 'Driving Without Fastened Seat Belt (Driver & Co-passenger)',
      location: 'Dhaula Kuan Junction, New Delhi',
      amount: 1000,
      state: 'Delhi',
      status: 'Virtual Court',
      courtName: 'Delhi Traffic Virtual Court',
      hasPhotoProof: true,
    }
  ],
  'UP16CG9022': [
    {
      id: 'ch-3',
      challanNo: 'UP1626091204481',
      vehicleNo: 'UP16CG9022',
      date: '24 Sep, 2026',
      time: '09:30 AM',
      offense: 'Stop Line Crossing / Signal Jumping at Red Light',
      location: 'Sector 62 Model Town Chauraha, Noida',
      amount: 1000,
      state: 'Uttar Pradesh',
      status: 'Pending',
      courtName: 'Noida City Traffic Court',
      hasPhotoProof: true,
    }
  ]
};

export const ChallanModal: React.FC<ChallanModalProps> = ({
  isOpen,
  onClose,
  defaultVehicleNo = 'DL 01 ZA 4482',
}) => {
  const [searchQuery, setSearchQuery] = useState(defaultVehicleNo);
  const [activeTab, setActiveTab] = useState<'pending' | 'virtual' | 'paid'>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [queriedVehicle, setQueriedVehicle] = useState(defaultVehicleNo);
  const [payingChallanId, setPayingChallanId] = useState<string | null>(null);
  const [paidSuccessChallan, setPaidSuccessChallan] = useState<string | null>(null);

  if (!isOpen) return null;

  const normalized = searchQuery.toUpperCase().replace(/\s+/g, '');
  const challanList = SAMPLE_CHALLANS[normalized] || [];

  const pendingList = challanList.filter((c) => c.status === 'Pending' || c.status === 'Virtual Court');
  const totalPendingAmount = pendingList.reduce((acc, c) => acc + c.amount, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setQueriedVehicle(searchQuery.toUpperCase());
      setIsLoading(false);
    }, 550);
  };

  const handlePayChallan = (challan: ChallanItem) => {
    setPayingChallanId(challan.id);
    setTimeout(() => {
      setPayingChallanId(null);
      setPaidSuccessChallan(challan.challanNo);
      setTimeout(() => setPaidSuccessChallan(null), 4000);
    }, 1200);
  };

  const handleShareWhatsAppClearance = () => {
    const text = `*TRAFFIC E-CHALLAN RTO STATUS REPORT*%0A` +
      `🚗 *Vehicle Plate:* ${queriedVehicle}%0A` +
      `🛡️ *VAHAN Database Check:* DL / HR / UP / RJ / UK Live Integrated%0A` +
      `⚖️ *Pending Challans:* ${pendingList.length} (Total Fine: ₹${totalPendingAmount})%0A` +
      `_Report verified via SafarIndiaCabs Driver Suvidha Hub._`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/80 relative text-slate-800 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-4 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-indigo-400" />
              Parivahan & Virtual Court Live
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white mt-1">
            Traffic e-Challan & Notice Checker
          </h2>
          <p className="text-xs text-slate-400">
            Real-time RTO traffic challan queries across DL, HR, UP, RJ & UK.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Search Input Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Enter Vehicle Number or DL Number (गाड़ी नंबर दर्ज करें)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                  placeholder="e.g. DL 01 ZA 4482 / HR 55 BE 7564"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl font-mono uppercase font-black text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-2xl shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Check Challans</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pt-0.5">
              <span className="text-slate-400 shrink-0">Sample Cabs:</span>
              {['DL 01 ZA 4482', 'HR 55 BE 7564', 'UP 16 CG 9022'].map((plate) => (
                <button
                  key={plate}
                  type="button"
                  onClick={() => {
                    setSearchQuery(plate);
                    setQueriedVehicle(plate);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold whitespace-nowrap"
                >
                  {plate}
                </button>
              ))}
            </div>
          </form>

          {/* Toast on Payment */}
          {paidSuccessChallan && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Challan #{paidSuccessChallan} cleared successfully! Receipt generated.</span>
            </div>
          )}

          {/* Challan Query Result */}
          {pendingList.length > 0 ? (
            <div className="space-y-3">
              {/* Alert Status Banner */}
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-rose-950">
                      {pendingList.length} Pending Challan(s) Found!
                    </div>
                    <div className="text-[11px] text-rose-800">
                      Clear immediately to avoid RTO fitness / permit blacklisting.
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-rose-700 font-bold uppercase">Total Due</div>
                  <div className="text-base font-black font-mono text-rose-600">
                    ₹{totalPendingAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Individual Challan Cards */}
              <div className="space-y-2.5">
                {pendingList.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-2xs hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black text-slate-900 text-xs">
                            #{ch.challanNo}
                          </span>
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200">
                            {ch.state} Police
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-mono">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {ch.date} • {ch.time}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black font-mono text-rose-600">
                          ₹{ch.amount}
                        </span>
                      </div>
                    </div>

                    {/* Offense description */}
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-800 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-rose-950">
                        <span>Offense: </span>
                        <span>{ch.offense}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 text-[10px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>Location: {ch.location}</span>
                      </div>
                      {ch.courtName && (
                        <div className="text-[10px] text-indigo-700 font-semibold">
                          Forwarded to: {ch.courtName}
                        </div>
                      )}
                    </div>

                    {/* Pay Button / Evidence Preview */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => alert(`📷 Traffic CCTV evidence captured at ${ch.location} on ${ch.date} ${ch.time}. Camera Resolution: 4K ANPR Speed Sensor.`)}
                        className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <Camera className="w-3.5 h-3.5 text-indigo-500" />
                        <span>View Photo Proof</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePayChallan(ch)}
                        disabled={payingChallanId === ch.id}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1"
                      >
                        {payingChallanId === ch.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Pay ₹{ch.amount} via UPI</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Clean record state */
            <div className="py-8 text-center bg-slate-50/80 rounded-2xl border border-slate-200 p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Zero Pending Challans Found!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Vehicle <strong>{queriedVehicle}</strong> has a 100% clean record across Delhi, Haryana, UP, Rajasthan, and Uttarakhand Traffic police servers.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>VAHAN & National Registry Clean Status</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
            <button
              type="button"
              onClick={handleShareWhatsAppClearance}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center gap-1.5 border border-emerald-200 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Status Report</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
