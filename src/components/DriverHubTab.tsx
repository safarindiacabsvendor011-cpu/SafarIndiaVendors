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
  LifeBuoy
} from 'lucide-react';

interface DriverHubTabProps {
  onOpenInsurance: () => void;
  onOpenStateTax: () => void;
  onOpenCngFinder: () => void;
  onOpenEmergencySOS: () => void;
  onCheckChallan: () => void;
  onCallRoadsideAssistance: () => void;
}

export const DriverHubTab: React.FC<DriverHubTabProps> = ({
  onOpenInsurance,
  onOpenStateTax,
  onOpenCngFinder,
  onOpenEmergencySOS,
  onCheckChallan,
  onCallRoadsideAssistance,
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

      {/* 3. Core Utility Grid (Insurance, Permit Tax, CNG, RSA) */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Card 1: 3-Month Insurance */}
        <div
          onClick={onOpenInsurance}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5 shadow-xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              3-Month Cab Insurance
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Short-term TP & Comprehensive insurance starting at ₹1,499.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 pt-1 border-t border-slate-100">
            <span>Renew in 2 Mins</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: State Permit Tax */}
        <div
          onClick={onOpenStateTax}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5 shadow-xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              State Permit Tax
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pay border entry tax for UP, Rajasthan, Haryana, UK, Punjab, HP.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 pt-1 border-t border-slate-100">
            <span>Instant Slip</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Highway CNG Finder */}
        <div
          onClick={onOpenCngFinder}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5 shadow-xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Fuel className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              CNG Pump Finder
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live pressure status & shortest queues on expressways.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 pt-1 border-t border-slate-100">
            <span>View 24x7 Pumps</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: 24x7 Roadside Assistance */}
        <div
          onClick={onCallRoadsideAssistance}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5 shadow-xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Wrench className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Roadside Assistance
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Flat tyre, battery jumpstart, crane towing on all highways.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-orange-600 pt-1 border-t border-slate-100">
            <span>Call Mechanic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* 4. Secondary Services List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs">
        
        <div
          onClick={onCheckChallan}
          className="p-3.5 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Traffic e-Challan & Fastag Portal</div>
              <div className="text-[10px] text-slate-500">Check pending RTO traffic challans for DL / HR / UP / RJ</div>
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
              <div className="text-[10px] text-slate-500">Clean washrooms, tea stalls & driver rest stops on highways</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

      </div>

    </div>
  );
};
