import React from 'react';
import { 
  User, 
  Phone, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Car, 
  CreditCard, 
  Globe, 
  Clock, 
  FileText, 
  HelpCircle,
  Sparkles,
  Users,
  Percent
} from 'lucide-react';
import { SubscriptionPlan } from '../types';

interface ProfileTabProps {
  onOpenSubscriptions: () => void;
  onOpenManageFleet: () => void;
  onOpenTransactions: () => void;
  onOpenLanguage: () => void;
  onOpenHelp: () => void;
  currentPlanName: string;
  planExpiryDate: string;
  lang: 'en' | 'hi';
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  onOpenSubscriptions,
  onOpenManageFleet,
  onOpenTransactions,
  onOpenLanguage,
  onOpenHelp,
  currentPlanName,
  planExpiryDate,
  lang,
}) => {
  return (
    <div className="space-y-4 pb-24">
      
      {/* 1. User Profile Card (Exact match to screenshot 4) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col items-center text-center shadow-xs relative">
        <div className="relative">
          <img
            src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg"
            alt="SafarIndiaCabs"
            className="w-20 h-20 rounded-full object-contain p-1 border-2 border-amber-400 bg-white shadow-xs"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-white">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-base font-extrabold text-slate-900">SafarIndiaCabs</h2>
            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
          </div>
          <div className="font-mono text-xs text-slate-500 font-semibold mt-0.5">
            8506046346
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold mt-1">
            <span>4.5</span>
            <div className="flex text-amber-400">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-slate-400 font-normal">(7 Reviews)</span>
          </div>
        </div>
      </div>

      {/* 2. Yellow Subscriptions Banner (Exact match to screenshot 4) */}
      <div 
        onClick={onOpenSubscriptions}
        className="bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer text-white rounded-2xl p-4 flex items-center justify-between shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/20 text-white">
            <Award className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider">
              {currentPlanName}
            </div>
            <div className="text-xs text-amber-100 font-medium">
              Click to view or upgrade plan
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-amber-200 uppercase font-bold tracking-wider">
            Expire On
          </div>
          <div className="text-xs font-mono font-bold text-white">
            {planExpiryDate}
          </div>
        </div>
      </div>

      {/* 3. Account Menu Section */}
      <div className="space-y-2">
        <div className="px-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          Account
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs">
          
          <button
            onClick={onOpenSubscriptions}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Manage Subscriptions</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onOpenManageFleet}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Car className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Manage Vehicles & Drivers</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onOpenTransactions}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Transactions & Escrow Ledger</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onOpenLanguage}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{lang === 'en' ? 'English' : 'हिन्दी'}</span>
              <ChevronRight className="w-4 h-4 text-amber-500" />
            </div>
          </button>

        </div>
      </div>

      {/* 4. General Menu Section */}
      <div className="space-y-2">
        <div className="px-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          General
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs">
          
          <button
            onClick={onOpenHelp}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">About SafarIndiaCabs</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Privacy Policy & Escrow Terms</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="font-semibold">Become a Verified Supplier</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

        </div>
      </div>

    </div>
  );
};
