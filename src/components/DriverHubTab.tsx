import React from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Fuel, 
  Wrench, 
  AlertTriangle, 
  Phone, 
  CreditCard, 
  Car, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Coffee,
  CheckCircle2,
  LifeBuoy,
  TrendingUp
} from 'lucide-react';

interface DriverHubTabProps {
  onOpenInsurance: () => void;
  onOpenStateTax: () => void;
  onOpenCngFinder: () => void;
  onOpenEmergencySOS: () => void;
  onCheckChallan: () => void;
  onCallRoadsideAssistance: () => void;
  onOpenAnalytics?: () => void;
}

export const DriverHubTab: React.FC<DriverHubTabProps> = ({
  onOpenInsurance,
  onOpenStateTax,
  onOpenCngFinder,
  onOpenEmergencySOS,
  onCheckChallan,
  onCallRoadsideAssistance,
  onOpenAnalytics,
}) => {
  return (
    <div className="space-y-4 pb-24 text-slate-800">
      
      {/* 1. Driver Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 text-white shadow-xs space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Safar Driver Suvidha
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>AITP Verified</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-black tracking-tight">
            Driver & Highway Assistance Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Everything a commercial cab pilot needs on North Indian highways.
          </p>
        </div>

        {/* Quick status bar */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/80 text-center text-xs">
          <div>
            <div className="text-[10px] text-slate-400">Fastag Balance</div>
            <div className="font-mono font-bold text-amber-400 mt-0.5">₹1,240</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">AITP Permit</div>
            <div className="font-bold text-emerald-400 mt-0.5">Active</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400">24x7 RSA</div>
            <div className="font-bold text-white mt-0.5">Covered</div>
          </div>
        </div>
      </div>

      {/* 2. SOS Emergency Button */}
      <button
        onClick={onOpenEmergencySOS}
        className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs flex items-center justify-between shadow-xs transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-full bg-white/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight">Highway Emergency SOS Alert</div>
            <div className="text-[10px] text-rose-200">Broadcasts your live GPS to nearby partners & Highway Police</div>
          </div>
        </div>
        <span className="text-[11px] uppercase font-mono tracking-wider bg-rose-950/40 px-2.5 py-1 rounded-lg">
          SOS
        </span>
      </button>

      {/* 2.5 Analytics & Yield Radar Shortcut */}
      {onOpenAnalytics && (
        <button
          onClick={onOpenAnalytics}
          className="w-full p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 flex items-center justify-between transition-colors text-left shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Vendor Yield & Route Analytics Radar
              </div>
              <div className="text-[10px] text-amber-800">
                Interactive D3 trends, monthly commission earnings & high-margin corridors
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-700 shrink-0" />
        </button>
      )}

      {/* 3. Core Driver Utility Modules Grid (Tax, Insurance, CNG, Challan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Module 1: State Border Tax Assistant */}
        <div
          onClick={onOpenStateTax}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:border-teal-500 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full border border-teal-200 font-mono">
              Parivahan 4-Step Flow
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              State Border Tax Assistant (चेकपोस्ट टैक्स)
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              UP, Rajasthan, Haryana, UK, Punjab & HP checkpost tax. Enter ANY vehicle plate with 1-click WhatsApp PDF receipt.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-teal-700">
            <span>Pay & Generate Receipt</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Module 2: Commercial Insurance Desk (PoSP Flow) */}
        <div
          onClick={onOpenInsurance}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
              IRDAI PoSP Desk
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Commercial Insurance Desk (3-Mo / Annual)
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Instant 3-Month TP & Comprehensive tourist cab insurance starting at ₹1,499. Instant digital policy download.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-amber-600">
            <span>Renew in 2 Mins</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Module 3: Traffic e-Challan Checker */}
        <div
          onClick={onCheckChallan}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:border-indigo-500 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full border border-indigo-200">
              Virtual Court Live
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Traffic e-Challan & Notice Checker
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Check live pending traffic challans across DL, HR, UP, RJ & UK with CCTV camera evidence & direct UPI payment.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-indigo-600">
            <span>Query Live Challans</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Module 4: Highway 24x7 CNG Pump & Pressure Finder */}
        <div
          onClick={onOpenCngFinder}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:border-emerald-500 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Fuel className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-200">
              200+ Bar Radar
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Highway 24x7 CNG & Pressure Finder
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Yamuna Exp, NH-48, NH-44 & NH-58 live gas pressure, crowdsourced wait times & Google Maps navigation.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
            <span>View 24x7 Stations</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>

      {/* 4. Highway Support Services (RSA & Driver Rest Stops) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs">
        
        <div
          onClick={onCallRoadsideAssistance}
          className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">24x7 Highway Roadside Assistance (RSA)</div>
              <div className="text-[10px] text-slate-500">Flat tyre puncture, battery jumpstart, towing helpline: 8506046346</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => alert('SafarIndiaCabs Driver Dhabas: Sukhdev Murthal NH-44, Midway Neemrana NH-48, KM 65 Jewar Yamuna Exp offer free driver dormitories & clean restrooms!')}
          className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Driver Rest Dhabas & Dormitories</div>
              <div className="text-[10px] text-slate-500">Clean washrooms, tea stalls & driver rest stops on expressways</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

      </div>

    </div>
  );
};
