import React from 'react';
import { X, Headphones, ShieldCheck, Phone, MessageSquare, AlertCircle, HelpCircle } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-800 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-500">
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Help & Operator Guidelines
              </h2>
              <p className="text-xs text-slate-500">
                SafarIndiaCabs Vendors Support Desk
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Support contacts */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="tel:8506046346"
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors flex items-center gap-2.5 text-slate-800"
          >
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Call Desk</span>
              <strong className="font-mono text-xs">8506046346</strong>
            </div>
          </a>

          <a
            href="https://wa.me/918506046346?text=Namaste%20SafarIndiaCabs%20Support,%20I%20need%20assistance%20with%20my%20B2B%20vendor%20account."
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 transition-colors flex items-center gap-2.5 text-emerald-950"
          >
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-700 block">WhatsApp Desk</span>
              <strong className="font-mono text-xs">8506046346</strong>
            </div>
          </a>
        </div>

        {/* Rules & Policy Accordion */}
        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>1. How does the Mediator Commission Escrow work?</span>
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              When a vendor accepts a lead, they pay the agreed commission into SafarIndiaCabs escrow. The booking agent cannot take the money and run. Details are unlocked immediately, and money is released to the agent only after the ride is marked completed (minus 3% platform fee).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>2. What happens if the booking gets cancelled?</span>
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              If the client cancels or if the ride cannot take place due to genuine issues, the commission is 100% refunded back to the paying vendor's wallet balance instantly without deductions!
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <span>3. Vehicle and Driver standards</span>
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All assigned vehicles must have active All India Tourist Permit (AITP), commercial yellow number plate, functioning AC, and clean boot space. Drivers must possess valid commercial driving licenses and professional conduct.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
