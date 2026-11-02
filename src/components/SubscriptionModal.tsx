import React from 'react';
import { X, Award, Check, ShieldCheck, Zap, Sparkles, Crown, AlertCircle } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId: 'none' | 'verified' | 'platinum';
  onSelectPlan: (planId: 'verified' | 'platinum') => void;
  reasonMessage?: string | null;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentPlanId,
  onSelectPlan,
  reasonMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Crown className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Operator Membership Access
              </h2>
              <p className="text-xs text-slate-500">
                Required to publish duty leads or accept live bookings
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reason Banner if gate-blocked */}
        {reasonMessage && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-2.5 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Action Required: </strong>
              {reasonMessage}
            </div>
          </div>
        )}

        {/* 2 PLANS: Normal (Verified) vs Platinum (Premium) */}
        <div className="space-y-4">
          
          {/* Plan 1: Normal Plan - VERIFIED PARTNER (₹299/mo) */}
          <div className="p-4 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3 relative transition-all hover:border-slate-300">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[11px] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified Partner (Normal Plan)</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Verified Member Pass
                </h3>
                <p className="text-xs text-slate-500">Basic authentic verified operator access</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono text-slate-900">
                  ₹299
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">
                  / month
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Publish unlimited customer bookings to network</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>Accept live duties & in-app chat with agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>SafarIndiaCabs Blue <strong>Verified Badge</strong> on profile</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>100% Escrow Protection & cancellation refunds</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectPlan('verified');
                onClose();
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-all ${
                currentPlanId === 'verified'
                  ? 'bg-slate-200 text-slate-700 font-extrabold cursor-default'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              {currentPlanId === 'verified' ? '✓ Currently Active (Verified)' : 'Activate Verified Plan (₹299/mo)'}
            </button>
          </div>

          {/* Plan 2: PLATINUM PREMIUM OPERATOR (₹799/mo) */}
          <div className="p-4.5 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-white to-amber-50/60 shadow-md space-y-3 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[11px] shadow-2xs mb-1">
                  <Crown className="w-3.5 h-3.5 fill-white" />
                  <span>Platinum Premium (VIP Plan)</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1">
                  <span>Platinum Operator Pass</span>
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                </h3>
                <p className="text-xs text-amber-900/80 font-medium">For high-volume fleet owners & top travel desks</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono text-amber-600">
                  ₹799
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">
                  / month
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/60 space-y-1.5 text-xs text-slate-800">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                <span><strong>5-Minute Early Access:</strong> Get new duty leads 5 mins before normal users!</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                <span><strong>Reduced Platform Fee:</strong> Only 2% fee (save 33% on ride completion payouts)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                <span>Golden <strong>Platinum VIP Crown</strong> badge & highlighted posts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                <span>Direct WhatsApp Lead Broadcast Alert on your phone</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                <span>Priority 24x7 Telephone Helpline & Account Manager</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectPlan('platinum');
                onClose();
              }}
              className={`w-full py-3 px-4 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 ${
                currentPlanId === 'platinum'
                  ? 'bg-amber-100 text-amber-900 font-extrabold cursor-default border border-amber-300'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
              }`}
            >
              {currentPlanId === 'platinum' ? '👑 Active Platinum VIP Member' : 'Upgrade to Platinum Premium (₹799/mo)'}
            </button>
          </div>

        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-center text-[11px] text-slate-500">
          Subscribers receive continuous lead access, verified union trust badges, and 100% money-back escrow guarantee.
        </div>

      </div>
    </div>
  );
};
