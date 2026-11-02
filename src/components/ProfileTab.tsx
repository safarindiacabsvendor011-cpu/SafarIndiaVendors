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
import { SubscriptionPlan, UserProfile } from '../types';
import { Crown, Edit3 } from 'lucide-react';

interface ProfileTabProps {
  onOpenSubscriptions: () => void;
  onOpenManageFleet: () => void;
  onOpenTransactions: () => void;
  onOpenLanguage: () => void;
  onOpenHelp: () => void;
  onOpenAuthModal: () => void;
  onOpenAnalytics?: () => void;
  userProfile?: UserProfile;
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
  onOpenAuthModal,
  onOpenAnalytics,
  userProfile,
  currentPlanName,
  planExpiryDate,
  lang,
}) => {
  const isPlatinum = userProfile?.membershipPlan === 'platinum';
  const isVerified = userProfile?.membershipPlan === 'verified';
  const hasNoPlan = userProfile?.membershipPlan === 'none';

  return (
    <div className="space-y-4 pb-24">
      
      {/* 1. User Profile Card (Matches user screenshots + dynamic profile info) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col items-center text-center shadow-xs relative">
        <button
          onClick={onOpenAuthModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold"
          title="Edit Profile & Attached Vehicle"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>

        <div className="relative">
          <img
            src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg"
            alt="SafarIndiaCabs"
            className="w-20 h-20 rounded-full object-contain p-1 border-2 border-amber-400 bg-white shadow-xs"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-white shadow-2xs">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-base font-extrabold text-slate-900">
              {userProfile?.name || 'SafarIndiaCabs Partner'}
            </h2>
            {isPlatinum ? (
              <span title="Platinum VIP Partner">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
              </span>
            ) : (
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
            )}
          </div>
          <div className="font-mono text-xs text-slate-500 font-semibold mt-0.5">
            {userProfile?.phone || '8506046346'} · {userProfile?.city || 'Delhi NCR'}
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold mt-1">
            <span>4.9</span>
            <div className="flex text-amber-400">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-slate-400 font-normal">(184 Verified Trips)</span>
          </div>
        </div>

        {/* Attached Commercial Vehicle Card */}
        {userProfile?.attachedVehicle && (
          <div className="w-full mt-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-left flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <Car className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Attached Commercial Cab
                </div>
                <div className="text-xs font-extrabold text-slate-900">
                  {userProfile.attachedVehicle.model} ({userProfile.attachedVehicle.category})
                </div>
              </div>
            </div>

            <div className="px-2.5 py-1 bg-amber-400 text-slate-950 font-mono font-black text-xs rounded-lg border-2 border-slate-900 shadow-2xs">
              {userProfile.attachedVehicle.plateNumber}
            </div>
          </div>
        )}
      </div>

      {/* 2. Subscriptions Banner (Distinctive Verified vs Platinum) */}
      <div 
        onClick={onOpenSubscriptions}
        className={`transition-all cursor-pointer text-white rounded-2xl p-4 flex items-center justify-between shadow-xs ${
          isPlatinum
            ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 border-2 border-amber-300'
            : isVerified
            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
            : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/20 text-white">
            {isPlatinum ? (
              <Crown className="w-6 h-6 stroke-[2.2] fill-amber-200" />
            ) : isVerified ? (
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Award className="w-6 h-6 stroke-[2.2]" />
            )}
          </div>
          <div>
            <div className="text-xs uppercase font-black tracking-wider flex items-center gap-1.5">
              <span>
                {isPlatinum
                  ? '👑 Platinum Premium (VIP Pass)'
                  : isVerified
                  ? '🛡️ Verified Partner (Normal Plan)'
                  : '⚠️ No Active Membership'}
              </span>
            </div>
            <div className="text-xs text-white/90 font-medium">
              {isPlatinum
                ? '5-min early leads · 2% reduced platform fee'
                : isVerified
                ? 'Unlimited duty publishing & escrow booking'
                : 'Tap to activate membership to publish/accept duties'}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-white/80 uppercase font-bold tracking-wider">
            {hasNoPlan ? 'Status' : 'Expire On'}
          </div>
          <div className="text-xs font-mono font-bold text-white">
            {hasNoPlan ? 'Inactive' : planExpiryDate}
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
            onClick={onOpenAuthModal}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-amber-500" />
              <div className="text-left">
                <span className="font-semibold block">Personal Information & Attached Vehicle</span>
                <span className="text-[10px] text-slate-400">Name, Phone, Commercial Plate, Model</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

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

          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="w-full px-4 py-3.5 flex items-center justify-between text-xs text-slate-800 hover:bg-slate-50 transition-colors bg-amber-50/30"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <div className="text-left">
                  <span className="font-bold text-slate-900 block">Vendor Analytics & Route Yield</span>
                  <span className="text-[10px] text-amber-600 font-medium">Trends, Monthly Commission & D3 Hot Corridors</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-500" />
            </button>
          )}

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
