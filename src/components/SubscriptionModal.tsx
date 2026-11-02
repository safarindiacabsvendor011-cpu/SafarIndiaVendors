import React from 'react';
import { X, Award, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/initialData';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId: string;
  onSelectPlan: (planId: 'partner' | 'elite') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentPlanId,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-slate-800 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Membership & Access Plans
              </h2>
              <p className="text-xs text-slate-500">
                Choose your monthly operator subscription
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = currentPlanId === plan.id;
            const isElite = plan.id === 'elite';

            return (
              <div
                key={plan.id}
                className={`p-4 rounded-2xl border-2 transition-all relative ${
                  isElite
                    ? 'border-amber-400 bg-gradient-to-b from-amber-50/50 to-white shadow-xs'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-xs">
                    Most Popular · Best Value
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                      <span>{plan.name}</span>
                      {isElite && <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />}
                    </h3>
                    <p className="text-xs text-slate-500">{plan.badge}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-slate-900">
                      ₹{plan.price}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      / month
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0 stroke-[2.5]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <div className="mt-4 pt-2">
                  <button
                    onClick={() => {
                      onSelectPlan(plan.id);
                      onClose();
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-default'
                        : isElite
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    {isCurrent ? 'Current Active Plan' : `Subscribe for ₹${plan.price}/mo`}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-center text-[11px] text-slate-500">
          Subscribers receive continuous lead access, verified union trust badges, and 100% money-back escrow guarantee.
        </div>

      </div>
    </div>
  );
};
