import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download, 
  MapPin, 
  Calendar, 
  Share2, 
  Car, 
  Search, 
  QrCode, 
  CreditCard, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Clock, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  History
} from 'lucide-react';

interface StateTaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (receipt: any) => void;
  savedVehicleNumber?: string;
}

const SUPPORTED_STATES = [
  'UTTAR PRADESH',
  'RAJASTHAN',
  'HARYANA',
  'UTTARAKHAND',
  'PUNJAB',
  'HIMACHAL PRADESH',
  'DELHI',
  'MADHYA PRADESH',
  'BIHAR',
  'GUJARAT',
  'MAHARASHTRA'
];

const DISTRICT_CHECKPOSTS: Record<string, { districts: string[]; checkposts: Record<string, string[]> }> = {
  'UTTAR PRADESH': {
    districts: ['GHAZIABAD', 'GAUTAM BUDDHA NAGAR', 'MATHURA', 'AGRA', 'SAHARANPUR', 'ALIGARH', 'BAREILLY', 'LUCKNOW', 'VARANASI'],
    checkposts: {
      'GHAZIABAD': ['GHAZIABAD BORDER (ANAND VIHAR)', 'MOHAN NAGAR CHECKPOST', 'LAL KUAN BORDER'],
      'GAUTAM BUDDHA NAGAR': ['NOIDA TOLL CHECKPOST (DND)', 'KALINDI KUNJ ENTRY', 'JEWAR EXPRESSWAY ENTRY'],
      'MATHURA': ['MATHURA NH-19 BORDER', 'KOSI KALAN CHECKPOST'],
      'AGRA': ['AGRA-LUCKNOW EXP TOLL', 'KHANDARI BORDER', 'FATEHABAD ROAD'],
      'SAHARANPUR': ['SARSAVA CHECKPOST', 'YAMUNANAGAR BORDER'],
    }
  },
  'RAJASTHAN': {
    districts: ['ALWAR', 'JAIPUR', 'BHARATPUR', 'KOTA', 'UDAIPUR'],
    checkposts: {
      'ALWAR': ['BEHROR TOLL PLAZA', 'NEEMRANA BORDER', 'BHIWADI CHECKPOST'],
      'JAIPUR': ['MANPURA TOLL', 'DAULATPURA TOLL'],
      'BHARATPUR': ['SEWER CHECKPOST', 'RUCHHI BORDER'],
    }
  },
  'HARYANA': {
    districts: ['GURGAON', 'FARIDABAD', 'SONIPAT', 'AMBALA', 'PANIPAT'],
    checkposts: {
      'GURGAON': ['SIRHOL BORDER NH-48', 'KHERKI DAULA TOLL', 'KAPASHERA BORDER'],
      'FARIDABAD': ['BADARPUR BORDER', 'BALLABGARH CHECKPOST'],
      'SONIPAT': ['KUNDLI BORDER NH-44', 'MURTHAL CHECKPOST'],
      'AMBALA': ['SHAMBHU BORDER', 'AMBALA CANTT ENTRY'],
    }
  },
  'UTTARAKHAND': {
    districts: ['HARIDWAR', 'DEHRADUN', 'US NAGAR (RUDRAPUR)', 'NAINITAL'],
    checkposts: {
      'HARIDWAR': ['NARASAN CHECKPOST', 'BAHADRABAD BORDER', 'ROORKEE BYPASS'],
      'DEHRADUN': ['ASHARODI BORDER', 'KULHAL CHECKPOST'],
      'US NAGAR (RUDRAPUR)': ['BAJPUR BORDER', 'KICHHA ENTRY POINT'],
    }
  },
  'PUNJAB': {
    districts: ['MOHALI', 'PATIALA', 'LUDHIANA', 'AMRITSAR'],
    checkposts: {
      'MOHALI': ['ZIRAKPUR CHECKPOST', 'LALRU BORDER'],
      'PATIALA': ['SHAMBHU PUNJAB ENTRY', 'DEVIGARH CHECKPOST'],
    }
  },
  'HIMACHAL PRADESH': {
    districts: ['SOLAN', 'UNA', 'KANGRA', 'SIRMAUR'],
    checkposts: {
      'SOLAN': ['PARWANOO CHECKPOST (TIMBER TRAIL)', 'BAROTIWALA ENTRY'],
      'UNA': ['MEHATPUR CHECKPOST', 'SANTOSHGADH BORDER'],
      'SIRMAUR': ['GOVINDGHAT CHECKPOST', 'KALA AMB BORDER'],
    }
  }
};

export const StateTaxModal: React.FC<StateTaxModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  savedVehicleNumber = 'DL 01 ZA 4482'
}) => {
  // Wizard Steps: 1: Owner Info, 2: Vehicle Info, 3: Tax Info, 4: Disclaimer & Verification, 5: Payment Gateway, 6: Success Receipt
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedState, setSelectedState] = useState<string>('UTTAR PRADESH');
  const [serviceName, setServiceName] = useState<string>('VEHICLE TAX COLLECTION (OTHER STATE)');
  
  // Search History
  const [recentVehicles, setRecentVehicles] = useState<string[]>(() => {
    const saved = localStorage.getItem('sic_tax_recent_vehicles');
    return saved ? JSON.parse(saved) : ['HR55BE7564', 'DL01ZA4482', 'UP16CD9021', 'UK07TA3312'];
  });

  // Step 1: Owner Details
  const [vehicleNo, setVehicleNo] = useState<string>('HR55BE7564');
  const [isLookingUp, setIsLookingUp] = useState<boolean>(false);
  const [hasLookedUp, setHasLookedUp] = useState<boolean>(true);
  const [showCaptchaModal, setShowCaptchaModal] = useState<boolean>(false);
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [currentCaptcha, setCurrentCaptcha] = useState<string>('JnH2a$');

  const [chassisNo, setChassisNo] = useState<string>('MA3ZDFSKTE4*****');
  const [ownerName, setOwnerName] = useState<string>('A***T K***R');
  const [mobileNo, setMobileNo] = useState<string>('77038****1');
  const [fromState, setFromState] = useState<string>('HARYANA');
  const [entryDistrict, setEntryDistrict] = useState<string>('GHAZIABAD');
  const [entryCheckpost, setEntryCheckpost] = useState<string>('GHAZIABAD BORDER (ANAND VIHAR)');

  // Step 2: Vehicle Details
  const [vehicleClass] = useState<string>('MOTOR CAB');
  const [vehicleCategory] = useState<string>('LIGHT PASSENGER VEHICLE');
  const [permitType] = useState<string>('ALL INDIA TOURIST PERMIT');
  const [seatingCapacity, setSeatingCapacity] = useState<number>(5);
  const [serviceType, setServiceType] = useState<'Air Conditioned Service' | 'Ordinary Service'>('Air Conditioned Service');
  const [permitNo, setPermitNo] = useState<string>('HR2026-AITP-5558C');
  const [insuranceValidity, setInsuranceValidity] = useState<string>('25/06/2027');
  const [fitnessValidity, setFitnessValidity] = useState<string>('22/07/2028');

  // Step 3: Tax Mode & Calculation
  const [taxMode, setTaxMode] = useState<'DAYS' | 'MONTHLY' | 'QUARTERLY'>('DAYS');
  const [taxDaysCount, setTaxDaysCount] = useState<number>(1);
  const [taxFromDate, setTaxFromDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [taxUptoDate, setTaxUptoDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Tax calculation state
  const [baseTaxCalculated, setBaseTaxCalculated] = useState<number>(150);
  const [convenienceFee] = useState<number>(8); // USER MANDATED: ₹8 extra on all tax calculations
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Step 4: Disclaimer & Verification
  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);
  const [disclaimerCaptchaInput, setDisclaimerCaptchaInput] = useState<string>('DXeMYt');
  const [disclaimerCaptcha] = useState<string>('DXeMYt');
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);

  // Step 5: Payment Gateway Simulation (SBI ePay Lite)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'debit'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [merchantRefNo, setMerchantRefNo] = useState<string>('UPZ2611029596539');
  const [paymentTimer, setPaymentTimer] = useState<number>(180);

  // Step 6: Issued Official Receipt
  const [issuedReceipt, setIssuedReceipt] = useState<any | null>(null);

  useEffect(() => {
    if (currentStep === 5 && paymentTimer > 0) {
      const interval = setInterval(() => setPaymentTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, paymentTimer]);

  if (!isOpen) return null;

  // Handle District Change & Update Checkposts
  const availableDistricts = DISTRICT_CHECKPOSTS[selectedState]?.districts || ['MAIN CHECKPOST ENTRY'];
  const availableCheckposts = (DISTRICT_CHECKPOSTS[selectedState]?.checkposts[entryDistrict]) || [
    `${entryDistrict} BORDER CHECKPOST`,
    `${entryDistrict} HIGHWAY TOLL ENTRY`
  ];

  const handleStateChange = (st: string) => {
    setSelectedState(st);
    const newDistricts = DISTRICT_CHECKPOSTS[st]?.districts || ['MAIN DISTRICT'];
    setEntryDistrict(newDistricts[0] || 'MAIN');
    const newCheckposts = (DISTRICT_CHECKPOSTS[st]?.checkposts[newDistricts[0]]) || [`${newDistricts[0]} BORDER`];
    setEntryCheckpost(newCheckposts[0]);
    recalculateTax(st, taxMode, seatingCapacity, taxDaysCount);
  };

  const handleDistrictChange = (dist: string) => {
    setEntryDistrict(dist);
    const chk = (DISTRICT_CHECKPOSTS[selectedState]?.checkposts[dist]) || [`${dist} BORDER`];
    setEntryCheckpost(chk[0]);
  };

  // Realistic State Border Tax Calculation + ₹8 extra mandate
  const recalculateTax = (state: string, mode: 'DAYS' | 'MONTHLY' | 'QUARTERLY', seats: number, days: number) => {
    let dayRate = 150;
    if (state === 'UTTAR PRADESH') dayRate = seats <= 5 ? 150 : 250;
    else if (state === 'RAJASTHAN') dayRate = seats <= 5 ? 240 : 380;
    else if (state === 'HARYANA') dayRate = seats <= 5 ? 120 : 180;
    else if (state === 'UTTARAKHAND') dayRate = seats <= 5 ? 160 : 280;
    else if (state === 'PUNJAB') dayRate = seats <= 5 ? 200 : 320;
    else if (state === 'HIMACHAL PRADESH') dayRate = seats <= 5 ? 260 : 420;

    let totalBase = 0;
    if (mode === 'DAYS') {
      totalBase = dayRate * Math.max(1, days);
    } else if (mode === 'MONTHLY') {
      totalBase = dayRate * 15;
    } else {
      totalBase = dayRate * 38;
    }

    setBaseTaxCalculated(totalBase);
    setIsCalculated(true);
  };

  // Lookup Vehicle details from VAHAN simulator
  const handleTriggerLookup = () => {
    if (!vehicleNo.trim()) return;
    setShowCaptchaModal(true);
  };

  const handleVerifyCaptchaAndFetch = () => {
    setShowCaptchaModal(false);
    setIsLookingUp(true);

    setTimeout(() => {
      const formatted = vehicleNo.toUpperCase().replace(/\s+/g, '');
      let detectedState = 'HARYANA';
      if (formatted.startsWith('DL')) detectedState = 'DELHI';
      else if (formatted.startsWith('UP')) detectedState = 'UTTAR PRADESH';
      else if (formatted.startsWith('UK')) detectedState = 'UTTARAKHAND';
      else if (formatted.startsWith('RJ')) detectedState = 'RAJASTHAN';
      else if (formatted.startsWith('PB')) detectedState = 'PUNJAB';

      setFromState(detectedState);
      setChassisNo(`MA3Z${formatted.slice(2, 6)}TE4${Math.floor(1000 + Math.random() * 9000)}`);
      setOwnerName('A***T K***R');
      setMobileNo(`77038****${Math.floor(1 + Math.random() * 9)}`);
      setPermitNo(`${formatted.slice(0, 2)}2026-AITP-${Math.floor(1000 + Math.random() * 9000)}C`);
      
      // Save to recent vehicles
      if (!recentVehicles.includes(formatted)) {
        const updated = [formatted, ...recentVehicles.slice(0, 4)];
        setRecentVehicles(updated);
        localStorage.setItem('sic_tax_recent_vehicles', JSON.stringify(updated));
      }

      setIsLookingUp(false);
      setHasLookedUp(true);
    }, 600);
  };

  // Complete Payment and Issue Receipt
  const handleFinalizePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const receiptNo = `TAX/${selectedState.slice(0, 2)}/2026/${Math.floor(1000000 + Math.random() * 9000000)}`;
      const receiptData = {
        receiptNo,
        state: selectedState,
        vehicleNo: vehicleNo.toUpperCase(),
        chassisNo,
        ownerName,
        fromState,
        entryDistrict,
        entryCheckpost,
        serviceType,
        taxMode,
        taxFromDate,
        taxUptoDate,
        baseTax: baseTaxCalculated,
        convenienceFee, // ₹8 extra
        totalAmount: baseTaxCalculated + convenienceFee, // Total is base + 8
        paidAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        merchantRef: merchantRefNo,
      };

      setIssuedReceipt(receiptData);
      setCurrentStep(6);
      onSuccess(receiptData);
    }, 1200);
  };

  // 1-Click WhatsApp PDF Receipt Share
  const handleShareWhatsAppReceipt = () => {
    if (!issuedReceipt) return;
    const msg = `*PARIVAHAN GOVT. CHECKPOST ENTRY TAX RECEIPT*%0A%0A` +
      `✅ *Status:* PAID & VERIFIED IN VAHAN%0A` +
      `📄 *Receipt No:* ${issuedReceipt.receiptNo}%0A` +
      `🚗 *Vehicle No:* ${issuedReceipt.vehicleNo}%0A` +
      `📍 *Entering State:* ${issuedReceipt.state}%0A` +
      `🛂 *Checkpost:* ${issuedReceipt.entryCheckpost} (${issuedReceipt.entryDistrict})%0A` +
      `📅 *Validity:* ${issuedReceipt.taxFromDate} to ${issuedReceipt.taxUptoDate}%0A` +
      `💳 *Total Tax Paid:* ₹${issuedReceipt.totalAmount} (MV Tax: ₹${issuedReceipt.baseTax} + Portal Fee: ₹${issuedReceipt.convenienceFee})%0A` +
      `🛡️ *Reference:* ${issuedReceipt.merchantRef}%0A%0A` +
      `_Issued via SafarIndiaCabs Parivahan Checkpost Assistant. Keep digital copy during highway border inspection._`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const totalAmountPayable = baseTaxCalculated + convenienceFee;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200/80 relative text-slate-800 my-4 max-h-[94vh] flex flex-col">
        
        {/* Parivahan Official Government Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-3.5 px-4.5 relative shrink-0 border-b border-teal-700/50">
          <button 
            onClick={onClose} 
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20">
              <FileCheck className="w-5 h-5 text-amber-400 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Government of India • MoRTH
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-400 text-slate-950 font-black">
                  Parivahan Checkpost
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-white leading-tight">
                State Border Permit Tax Collection (चेकपोस्ट टैक्स)
              </h2>
            </div>
          </div>

          {/* Stepper Wizard Indicator */}
          {currentStep <= 4 && (
            <div className="mt-3 pt-2.5 border-t border-teal-700/60 grid grid-cols-4 gap-1 text-center text-[10px]">
              {[
                { step: 1, title: 'Owner Info' },
                { step: 2, title: 'Vehicle' },
                { step: 3, title: 'Tax & Fee' },
                { step: 4, title: 'Disclaimer' },
              ].map((s) => (
                <div 
                  key={s.step} 
                  className={`py-1 rounded-lg font-bold transition-all ${
                    currentStep === s.step 
                      ? 'bg-amber-400 text-slate-950 shadow-xs' 
                      : currentStep > s.step 
                      ? 'bg-teal-700/80 text-teal-200' 
                      : 'text-teal-400/60 bg-teal-950/40'
                  }`}
                >
                  Step {s.step}: {s.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
          
          {/* STEP 1: OWNER INFORMATION & LOOKUP */}
          {currentStep === 1 && (
            <div className="space-y-3.5">
              
              {/* Select State & Service Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Select State Name (प्रवेश राज्य) *
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {SUPPORTED_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Select Service Name *
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 text-[11px] focus:outline-none focus:border-teal-600"
                  >
                    <option value="VEHICLE TAX COLLECTION (OTHER STATE)">
                      VEHICLE TAX COLLECTION (OTHER STATE)
                    </option>
                    <option value="VEHICLE TAX COLLECTION FOR COUNTER SIGN PERMIT">
                      COUNTER SIGN PERMIT TAX
                    </option>
                  </select>
                </div>
              </div>

              {/* Enter ANY Vehicle Number & Recent History */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-800 font-black">
                    Input Vehicle Registration Number (गाड़ी नंबर दर्ज करें) *
                  </label>
                  <span className="text-[10px] text-teal-700 font-bold">Self or Any Friend's Cab</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                    placeholder="e.g. HR55BE7564 / DL01ZA4482"
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono uppercase font-black text-slate-900 text-sm focus:outline-none focus:border-teal-600 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={handleTriggerLookup}
                    disabled={isLookingUp}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    {isLookingUp ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>Get Details</span>
                  </button>
                </div>

                {/* Recent Vehicles Quick Re-pay Chips */}
                {recentVehicles.length > 0 && (
                  <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5">
                      <History className="w-3 h-3 text-slate-400" />
                      <span>Recent:</span>
                    </span>
                    {recentVehicles.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => {
                          setVehicleNo(v);
                          handleTriggerLookup();
                        }}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold transition-colors ${
                          vehicleNo === v
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Auto-Fetched Owner Information */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-0.5">Chassis No.</label>
                  <input
                    type="text"
                    readOnly
                    value={chassisNo}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-mono font-bold text-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-0.5">Owner Name</label>
                  <input
                    type="text"
                    readOnly
                    value={ownerName}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-0.5">Mobile No.</label>
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-800 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-0.5">From State</label>
                  <input
                    type="text"
                    readOnly
                    value={fromState}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 text-xs"
                  />
                </div>
              </div>

              {/* Entry District & Entry Checkpost Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Entry District Name (प्रवेश जिला) *
                  </label>
                  <select
                    value={entryDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:border-teal-600"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Entry CheckPost Name (चेकपोस्ट) *
                  </label>
                  <select
                    value={entryCheckpost}
                    onChange={(e) => setEntryCheckpost(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:border-teal-600"
                  >
                    {availableCheckposts.map((cp) => (
                      <option key={cp} value={cp}>{cp}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <span className="text-[11px] text-slate-500">Step 1 of 4: Owner verified</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next: Vehicle Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: VEHICLE INFORMATION */}
          {currentStep === 2 && (
            <div className="space-y-3.5">
              <div className="bg-teal-50 border border-teal-200 p-2.5 rounded-xl text-[11px] text-teal-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Vehicle details auto-fetched from Parivahan National Registry for {vehicleNo}.</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Vehicle Class</label>
                  <input
                    type="text"
                    readOnly
                    value={vehicleClass}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Vehicle Category</label>
                  <input
                    type="text"
                    readOnly
                    value={vehicleCategory}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-700 font-bold block mb-0.5">Permit Type</label>
                  <input
                    type="text"
                    readOnly
                    value={permitType}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-700 font-bold block mb-0.5">Seating Capacity (सीटें) *</label>
                  <select
                    value={seatingCapacity}
                    onChange={(e) => {
                      const seats = Number(e.target.value);
                      setSeatingCapacity(seats);
                      recalculateTax(selectedState, taxMode, seats, taxDaysCount);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:border-teal-600"
                  >
                    <option value={5}>5 Seater (Sedan / Dzire / Etios)</option>
                    <option value={7}>7 Seater (Ertiga / Innova Crysta)</option>
                    <option value={9}>9 Seater (Large Cruiser)</option>
                    <option value={13}>13+ Seater (Tempo Traveller)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-700 font-bold block mb-1">Service Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Air Conditioned Service', label: 'Air Conditioned Service (AC)' },
                    { id: 'Ordinary Service', label: 'Ordinary Service (Non-AC)' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setServiceType(st.id as any)}
                      className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                        serviceType === st.id
                          ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Permit Number</label>
                  <input
                    type="text"
                    value={permitNo}
                    onChange={(e) => setPermitNo(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Insurance Validity</label>
                  <input
                    type="text"
                    value={insuranceValidity}
                    onChange={(e) => setInsuranceValidity(e.target.value)}
                    className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs"
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => {
                    recalculateTax(selectedState, taxMode, seatingCapacity, taxDaysCount);
                    setCurrentStep(3);
                  }}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next: Tax Calculation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TAX INFORMATION & FEE CALCULATION */}
          {currentStep === 3 && (
            <div className="space-y-3.5">
              
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                    Target Entry State
                  </div>
                  <div className="text-sm font-black text-slate-900">{selectedState}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-medium">Checkpost:</div>
                  <div className="text-xs font-bold text-teal-800">{entryCheckpost}</div>
                </div>
              </div>

              {/* Tax Mode: DAYS, MONTHLY, QUARTERLY */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Select Tax Mode (टैक्स अवधि) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['DAYS', 'MONTHLY', 'QUARTERLY'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setTaxMode(mode);
                        recalculateTax(selectedState, mode, seatingCapacity, taxDaysCount);
                      }}
                      className={`py-2 px-1 rounded-xl border text-center font-bold text-xs transition-all ${
                        taxMode === mode
                          ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Dates */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tax From Date *</label>
                  <input
                    type="date"
                    value={taxFromDate}
                    onChange={(e) => {
                      setTaxFromDate(e.target.value);
                      recalculateTax(selectedState, taxMode, seatingCapacity, taxDaysCount);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tax Upto Date *</label>
                  <input
                    type="date"
                    value={taxUptoDate}
                    onChange={(e) => {
                      setTaxUptoDate(e.target.value);
                      recalculateTax(selectedState, taxMode, seatingCapacity, taxDaysCount);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Calculate Fee / Tax Trigger Button */}
              <button
                type="button"
                onClick={() => recalculateTax(selectedState, taxMode, seatingCapacity, taxDaysCount)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Calculate Fee / Tax</span>
              </button>

              {/* Parivahan Tax Breakdown Table (Exact match to video + ₹8 extra user requirement) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-teal-800 text-white font-bold">
                      <th className="p-2 border-r border-teal-700">S.No.</th>
                      <th className="p-2 border-r border-teal-700">Tax/Fee Particulars</th>
                      <th className="p-2 border-r border-teal-700">Tax From</th>
                      <th className="p-2 border-r border-teal-700">Tax Upto</th>
                      <th className="p-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 bg-white">
                      <td className="p-2 border-r border-slate-100 font-mono">1</td>
                      <td className="p-2 border-r border-slate-100 font-bold text-slate-800">State MV Tax ({selectedState})</td>
                      <td className="p-2 border-r border-slate-100 font-mono text-[10px]">{taxFromDate}</td>
                      <td className="p-2 border-r border-slate-100 font-mono text-[10px]">{taxUptoDate}</td>
                      <td className="p-2 text-right font-mono font-bold">₹{baseTaxCalculated}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-amber-50/40">
                      <td className="p-2 border-r border-slate-100 font-mono">2</td>
                      <td className="p-2 border-r border-slate-100 font-bold text-amber-900">
                        Convenience & e-Filing Fee (पोर्टल सुविधा शुल्क)
                      </td>
                      <td className="p-2 border-r border-slate-100 font-mono text-[10px]">-</td>
                      <td className="p-2 border-r border-slate-100 font-mono text-[10px]">-</td>
                      <td className="p-2 text-right font-mono font-bold text-amber-700">+₹{convenienceFee}</td>
                    </tr>
                    <tr className="bg-teal-50/80 font-black text-slate-900">
                      <td colSpan={4} className="p-2 text-right text-xs">
                        Total Amount Payable (कुल देय राशि):
                      </td>
                      <td className="p-2 text-right font-mono text-sm text-teal-900">
                        ₹{totalAmountPayable}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Navigation */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <span>Next: Disclaimer & Pay</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: DISCLAIMER & VERIFICATION (Matching Video Step 4) */}
          {currentStep === 4 && (
            <div className="space-y-3.5">
              
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="font-bold text-slate-800 pb-1 border-b border-slate-200 flex justify-between">
                  <span>Border Tax Payment Entry Summary</span>
                  <span className="text-[10px] text-teal-700 font-mono">Step 4 - 4</span>
                </div>

                <div className="grid grid-cols-2 gap-y-1.5 text-[11px]">
                  <div className="text-slate-500">Vehicle No:</div>
                  <div className="font-mono font-black text-slate-900">{vehicleNo}</div>

                  <div className="text-slate-500">Owner Name:</div>
                  <div className="font-bold text-slate-800">{ownerName}</div>

                  <div className="text-slate-500">Chassis No:</div>
                  <div className="font-mono text-slate-700">{chassisNo}</div>

                  <div className="text-slate-500">From State:</div>
                  <div className="font-bold text-slate-800">{fromState}</div>

                  <div className="text-slate-500">Entering State:</div>
                  <div className="font-black text-teal-800">{selectedState}</div>

                  <div className="text-slate-500">Entry Checkpost:</div>
                  <div className="font-bold text-slate-800">{entryCheckpost}</div>

                  <div className="text-slate-500">Service Type:</div>
                  <div className="text-slate-800">{serviceType}</div>

                  <div className="text-slate-500 font-bold">Total Payable:</div>
                  <div className="font-black font-mono text-emerald-700 text-sm">
                    ₹{totalAmountPayable} <span className="text-[10px] text-slate-500 font-normal">(Incl. ₹8 portal fee)</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200 cursor-pointer text-slate-800">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="text-[11px] font-semibold leading-tight">
                  I confirm that above information are correct as per my knowledge and I agree to proceed to online payment.
                </span>
              </label>

              {/* Captcha Verification */}
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="px-3 py-1 bg-teal-900 text-teal-200 font-mono font-black tracking-widest text-sm rounded-lg select-none">
                  {disclaimerCaptcha}
                </div>
                <input
                  type="text"
                  value={disclaimerCaptchaInput}
                  onChange={(e) => setDisclaimerCaptchaInput(e.target.value)}
                  placeholder="Enter CAPTCHA"
                  className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                />
              </div>

              {/* Navigation and Pay Online */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={!isConfirmed}
                  onClick={() => setShowConfirmPopup(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 active:scale-95 text-white font-black rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <CreditCard className="w-4 h-4 text-amber-300" />
                  <span>Pay Online (₹{totalAmountPayable})</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: PAYMENT GATEWAY (SBI ePay Lite Simulator matching video) */}
          {currentStep === 5 && (
            <div className="space-y-4">
              
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-blue-300 uppercase tracking-wider font-bold">
                    State Bank of India • SBI ePay Lite
                  </div>
                  <div className="text-sm font-black">Official MoRTH Parivahan Gateway</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-blue-200">Time Left</div>
                  <div className="font-mono font-bold text-amber-300">
                    {Math.floor(paymentTimer / 60)}:{(paymentTimer % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Merchant Reference:</span>
                  <span className="font-mono font-bold text-slate-800">{merchantRefNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle Registration:</span>
                  <span className="font-mono font-black text-slate-900">{vehicleNo}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Amount to be Remitted:</span>
                  <span className="text-emerald-700 text-sm font-black font-mono">₹{totalAmountPayable}.00 /-</span>
                </div>
              </div>

              {/* UPI QR Code Mode */}
              <div className="text-center p-4 bg-white border-2 border-dashed border-teal-400 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  Scan Dynamic UPI QR Code to Pay ₹{totalAmountPayable}
                </div>

                <div className="w-40 h-40 bg-slate-100 rounded-2xl border border-slate-200 p-2 mx-auto flex items-center justify-center shadow-inner relative group">
                  <QrCode className="w-32 h-32 text-slate-900" />
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none">
                    <span className="bg-teal-700 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      UPI QR Active
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Open GPay, PhonePe, Paytm, or BHIM UPI app on your phone & complete payment.
                </p>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleFinalizePayment}
                    disabled={isProcessingPayment}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Confirming with Parivahan Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Simulate Successful UPI Remittance (₹{totalAmountPayable})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 6: ISSUED OFFICIAL DIGITAL BORDER TAX RECEIPT */}
          {currentStep === 6 && issuedReceipt && (
            <div className="py-2 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  State Border Permit Tax Paid Successfully!
                </h3>
                <p className="text-xs text-slate-500">
                  Recorded and instantly verified in VAHAN / mParivahan National Server.
                </p>
              </div>

              {/* Official Digital Tax Slip */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-teal-500 bg-teal-50/40 text-left text-xs space-y-2 font-mono relative overflow-hidden">
                <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
                  <ShieldCheck className="w-24 h-24 text-teal-800" />
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-teal-200">
                  <div>
                    <span className="font-black text-slate-900 block text-xs">MORTH PARIVAHAN RECEIPT</span>
                    <span className="text-[10px] text-teal-800 font-bold">{issuedReceipt.state} ENTRY PASS</span>
                  </div>
                  <span className="text-teal-900 font-bold text-[11px] bg-white px-2 py-0.5 rounded border border-teal-300">
                    {issuedReceipt.receiptNo}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-800 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Vehicle No:</span>
                    <strong className="text-slate-950 font-black">{issuedReceipt.vehicleNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Chassis No:</span>
                    <strong className="text-slate-800">{issuedReceipt.chassisNo}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Entering State:</span>
                    <strong className="text-teal-900">{issuedReceipt.state}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Checkpost Barrier:</span>
                    <strong className="text-slate-800">{issuedReceipt.entryCheckpost}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Validity Period:</span>
                    <strong className="text-slate-900">{issuedReceipt.taxFromDate} ⟶ {issuedReceipt.taxUptoDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Tax Mode:</span>
                    <strong className="text-slate-900">{issuedReceipt.taxMode} PASS</strong>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-teal-200 flex justify-between items-baseline">
                    <span className="text-slate-600 font-sans text-xs">
                      Amount Paid (MV Tax ₹{issuedReceipt.baseTax} + Fee ₹{issuedReceipt.convenienceFee}):
                    </span>
                    <span className="text-emerald-700 font-black text-base">
                      ₹{issuedReceipt.totalAmount}.00
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-sans border-t border-teal-200/60">
                  <span>Merchant Ref: {issuedReceipt.merchantRef}</span>
                  <span className="text-emerald-700 font-bold">Status: APPROVED ✓</span>
                </div>
              </div>

              {/* Action Buttons: 1-Click WhatsApp Share, Print, Close */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleShareWhatsAppReceipt}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>1-Click WhatsApp PDF Receipt Share (व्हाट्सएप शेयर)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setIssuedReceipt(null);
                      onClose();
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                  >
                    Done & Close
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Captcha Lookup Modal for Step 1 */}
      {showCaptchaModal && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-4 space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Verify VAHAN Captcha</h3>
              <button onClick={() => setShowCaptchaModal(false)} className="text-slate-400">✕</button>
            </div>
            
            <p className="text-[11px] text-slate-500">
              Enter captcha to fetch official RC details from Parivahan centralized VAHAN database:
            </p>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-teal-800 text-teal-200 font-mono font-bold tracking-widest text-sm rounded-lg">
                {currentCaptcha}
              </div>
              <input
                type="text"
                autoFocus
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter"
                className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCaptchaModal(false)}
                className="flex-1 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleVerifyCaptchaAndFetch}
                className="flex-1 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup before Payment Gateway redirect */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 text-center space-y-3.5 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900">Are you sure?</h3>
              <p className="text-xs text-slate-500 mt-1">
                You want to pay the calculated checkpost fee <strong>₹{totalAmountPayable}</strong> through Parivahan online mode?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfirmPopup(false)}
                className="py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmPopup(false);
                  setCurrentStep(5); // Go to Payment Gateway
                }}
                className="py-2 rounded-xl bg-teal-700 text-white font-black text-xs shadow-xs"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
