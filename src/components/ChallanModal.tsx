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
  Car,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Check
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
  state: 'Delhi' | 'Haryana' | 'Uttar Pradesh' | 'Rajasthan' | 'Uttarakhand' | 'Punjab';
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
  ],
  'PB10CZ4520': [
    {
      id: 'ch-4',
      challanNo: 'PB1026100812903',
      vehicleNo: 'PB10CZ4520',
      date: '08 Oct, 2026',
      time: '02:15 PM',
      offense: 'Dangerous Lane Switching & Over-taking without Indicator on Highway',
      location: 'Shambhu Toll Barrier, NH-44 Rajpura-Ludhiana',
      amount: 1500,
      state: 'Punjab',
      status: 'Pending',
      courtName: 'Patiala District Traffic Court',
      hasPhotoProof: true,
    }
  ]
};

export const ChallanModal: React.FC<ChallanModalProps> = ({
  isOpen,
  onClose,
  defaultVehicleNo = 'DL 01 ZA 4482',
}) => {
  const [activeModuleTab, setActiveModuleTab] = useState<'challans' | 'fastag'>('challans');
  const [searchQuery, setSearchQuery] = useState(defaultVehicleNo);
  const [isLoading, setIsLoading] = useState(false);
  const [queriedVehicle, setQueriedVehicle] = useState(defaultVehicleNo);
  const [payingChallanId, setPayingChallanId] = useState<string | null>(null);
  const [paidSuccessChallan, setPaidSuccessChallan] = useState<string | null>(null);

  // FASTag State
  const [fastagBalance, setFastagBalance] = useState<number>(450);
  const [isRechargingFastag, setIsRechargingFastag] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState<number | null>(null);

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

  const handleRechargeFastag = (amount: number) => {
    setIsRechargingFastag(true);
    setTimeout(() => {
      setFastagBalance((prev) => prev + amount);
      setIsRechargingFastag(false);
      setRechargeSuccess(amount);
      setTimeout(() => setRechargeSuccess(null), 4000);
    }, 1000);
  };

  const handleShareWhatsAppClearance = () => {
    const text = `*TRAFFIC E-CHALLAN & FASTAG REPORT*%0A` +
      `🚗 *Vehicle Plate:* ${queriedVehicle}%0A` +
      `🛡️ *VAHAN Server States:* DL / HR / UP / RJ / UK / PB Live%0A` +
      `⚖️ *Pending Challans:* ${pendingList.length} (Total Fine: ₹${totalPendingAmount})%0A` +
      `🏷️ *FASTag Balance:* ₹${fastagBalance} (Status: ACTIVE)%0A` +
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
            Traffic e-Challan & FASTag Balance Checker
          </h2>
          <p className="text-xs text-slate-400">
            Real-time RTO traffic challans & live NETC FASTag across DL, HR, UP, RJ, UK & PB.
          </p>

          {/* Module Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-700/60">
            <button
              type="button"
              onClick={() => setActiveModuleTab('challans')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeModuleTab === 'challans'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>e-Challan Checker ({pendingList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModuleTab('fastag')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeModuleTab === 'fastag'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>FASTag Wallet (₹{fastagBalance})</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Universal Vehicle Input Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Commercial Vehicle Plate (गाड़ी नंबर दर्ज करें)
              </label>
              <span className="text-[10px] text-indigo-600 font-bold">DL • HR • UP • RJ • UK • PB</span>
            </div>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                  placeholder="e.g. DL 01 ZA 4482 / HR 55 BE 7564 / PB 10 CZ 4520"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase font-black text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-2xs"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Fetch Details</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pt-0.5">
              <span className="text-slate-400 shrink-0">Sample Cabs:</span>
              {['HR 55 BE 7564', 'UP 16 CG 9022', 'PB 10 CZ 4520', 'DL 01 ZA 4482'].map((plate) => (
                <button
                  key={plate}
                  type="button"
                  onClick={() => {
                    setSearchQuery(plate);
                    setQueriedVehicle(plate);
                  }}
                  className={`px-2 py-0.5 rounded-lg font-mono font-bold whitespace-nowrap transition-colors ${
                    searchQuery === plate 
                      ? 'bg-amber-400 text-slate-950' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {plate}
                </button>
              ))}
            </div>
          </form>

          {/* Toast Messages */}
          {paidSuccessChallan && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Challan #{paidSuccessChallan} fine remitted successfully via UPI! Court clearance receipt generated.</span>
            </div>
          )}

          {rechargeSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>FASTag recharged with ₹{rechargeSuccess}! New Balance: ₹{fastagBalance}. Toll lanes greenlisted.</span>
            </div>
          )}

          {/* TAB 1: TRAFFIC E-CHALLANS */}
          {activeModuleTab === 'challans' && (
            <div>
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
                            onClick={() => alert(`Traffic CCTV Evidence Captured at ${ch.location} on ${ch.date} ${ch.time}. Sensor: 4K ANPR High-Speed Radar.`)}
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
                      Vehicle <strong>{queriedVehicle}</strong> has a 100% clean record across Delhi, Haryana, UP, Rajasthan, Uttarakhand & Punjab Traffic police servers.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>VAHAN & National Registry Clean Status</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FASTAG BALANCE & QUICK RECHARGE LAUNCHER */}
          {activeModuleTab === 'fastag' && (
            <div className="space-y-3.5">
              
              {/* FASTag Balance Card */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3 border border-indigo-800/40 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE (GREEN LIST)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">
                    ICICI Bank NETC FASTag
                  </span>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Available FASTag Toll Balance</div>
                  <div className="text-3xl font-black font-mono tracking-tight text-white mt-0.5 flex items-baseline gap-2">
                    <span>₹{fastagBalance}</span>
                    {fastagBalance < 250 && (
                      <span className="text-xs font-sans font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                        Low Balance Alert!
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 grid grid-cols-2 text-[10px] text-slate-400 font-mono">
                  <div>
                    <span>TAG ID: </span>
                    <strong className="text-slate-200">34161-ICICI-88219</strong>
                  </div>
                  <div className="text-right">
                    <span>VRN: </span>
                    <strong className="text-amber-400">{queriedVehicle}</strong>
                  </div>
                </div>
              </div>

              {/* Quick Recharge Launcher Buttons */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>1-Tap Instant FASTag Recharge</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Zero Convenience Fee</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[250, 500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      disabled={isRechargingFastag}
                      onClick={() => handleRechargeFastag(amt)}
                      className="py-2.5 px-2 bg-white hover:bg-indigo-50 active:scale-95 border border-slate-200 hover:border-indigo-400 rounded-xl text-center font-mono font-bold text-xs text-indigo-950 shadow-2xs transition-all"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                {isRechargingFastag && (
                  <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-[11px] font-bold flex items-center justify-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Connecting with NPCI NETC Switch & UPI Gateway...</span>
                  </div>
                )}
              </div>

              {/* Recent Toll Plaza Deductions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-xs">Recent Expressway Toll Deductions</span>
                  <span className="text-[10px] text-slate-400">Past 48 Hours</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Kherki Daula Toll Plaza (NH-48)</div>
                      <div className="text-[10px] text-slate-400 font-mono">Today, 06:14 AM • Lane 04</div>
                    </div>
                    <span className="font-mono font-black text-slate-900">-₹80</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                    <div>
                      <div className="font-bold text-slate-900">Jewar Toll Barrier (Yamuna Expressway)</div>
                      <div className="text-[10px] text-slate-400 font-mono">Yesterday, 04:30 PM • Lane 02</div>
                    </div>
                    <span className="font-mono font-black text-slate-900">-₹135</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                    <div>
                      <div className="font-bold text-slate-900">Murthal Toll Plaza (NH-44)</div>
                      <div className="text-[10px] text-slate-400 font-mono">31 Oct, 11:20 AM • Lane 07</div>
                    </div>
                    <span className="font-mono font-black text-slate-900">-₹65</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
            <button
              type="button"
              onClick={handleShareWhatsAppClearance}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center gap-1.5 border border-emerald-200 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Status on WhatsApp</span>
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
