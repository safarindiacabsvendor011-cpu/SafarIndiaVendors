import React from 'react';
import { 
  Phone, 
  Share2, 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  FileText,
  AlertCircle,
  MessageCircle,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Duty } from '../types';
import { formatCurrency, formatKM } from '../utils/formatters';

interface DutyCardProps {
  duty: Duty;
  lang: 'en' | 'hi';
  onAccept: (dutyId: string) => void;
  onOpenBid: (duty: Duty) => void;
  onOpenWhatsApp: (duty: Duty) => void;
  onViewDutySlip: (duty: Duty) => void;
  isMyPosted?: boolean;
}

export const DutyCard: React.FC<DutyCardProps> = ({
  duty,
  lang,
  onAccept,
  onOpenBid,
  onOpenWhatsApp,
  onViewDutySlip,
  isMyPosted,
}) => {
  const isAccepted = duty.status === 'accepted';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-200">
      
      {/* Header row: Duty ID, Category, Trip Type, Posted At */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-amber-400">
            {duty.dutyNumber}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-medium text-slate-200">
            {duty.vehicleCategory}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="capitalize text-slate-300">
            {duty.tripType === 'oneway' ? (lang === 'en' ? 'One Way' : 'एक तरफ') : 
             duty.tripType === 'roundtrip' ? (lang === 'en' ? 'Round Trip' : 'राउंड ट्रिप') : 
             duty.tripType === 'airport' ? (lang === 'en' ? 'Airport Transfer' : 'एयरपोर्ट') : 'Local 8h/80km'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          {duty.isUrgent && (
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Urgent' : 'तत्काल'}</span>
              <span aria-hidden="true" className="text-slate-600 ml-1">·</span>
            </span>
          )}
          <span>{duty.postedAt}</span>
        </div>
      </div>

      {/* Main Route & Schedule Section */}
      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Pickup & Drop Points */}
        <div className="md:col-span-7 space-y-3">
          {/* Pickup */}
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Pickup' : 'पिकअप'}
                </span>
                <span className="text-xs text-slate-400 font-medium">({duty.pickupCity})</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                {duty.pickupLocation}
              </p>
            </div>
          </div>

          {/* Drop */}
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Drop' : 'ड्रॉप'}
                </span>
                <span className="text-xs text-slate-400 font-medium">({duty.dropCity})</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                {duty.dropLocation}
              </p>
            </div>
          </div>

          {/* Date, Time & Distance Metadata (Unboxed) */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{duty.pickupDate}</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{duty.pickupTime}</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono tabular-nums text-slate-300">
              ~{formatKM(duty.distanceKm)}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className={duty.tollTaxIncluded ? 'text-emerald-400' : 'text-amber-400'}>
              {duty.tollTaxIncluded 
                ? (lang === 'en' ? 'Toll & Taxes Incl.' : 'टोल टैक्स शामिल') 
                : (lang === 'en' ? 'Toll & Taxes Extra' : 'टोल टैक्स अतिरिक्त')}
            </span>
          </div>

          {duty.specialInstructions && (
            <p className="text-xs text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
              <span className="font-medium text-slate-300">Note: </span>
              {duty.specialInstructions}
            </p>
          )}
        </div>

        {/* Pricing & Payout Box */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-medium text-slate-400">
                {lang === 'en' ? 'Vendor Net Payout' : 'वेंडर को मिलेगा'}
              </span>
              <span className="text-[11px] text-slate-400">
                Adv: <span className="font-mono tabular-nums text-slate-300 font-semibold">{formatCurrency(duty.advanceAmount)}</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400">
                {formatCurrency(duty.vendorRate)}
              </span>
              {duty.customerRate > duty.vendorRate && (
                <span className="text-xs text-slate-400">
                  (Cust. Fare: <span className="font-mono tabular-nums">{formatCurrency(duty.customerRate)}</span>)
                </span>
              )}
            </div>
          </div>

          {/* Operator attribution */}
          <div className="pt-2 border-t border-slate-800 text-xs flex items-center justify-between text-slate-400">
            <div className="truncate mr-2">
              <span className="text-slate-300 font-medium block truncate">
                {duty.operatorName}
              </span>
              <span className="text-[11px] text-slate-400">
                {duty.operatorCity} · ★ {duty.operatorRating}
              </span>
            </div>
            <a
              href={`tel:${duty.operatorPhone}`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
              title="Call Operator"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Left bids info */}
        <div className="text-xs text-slate-400 flex items-center gap-2">
          {duty.bids.length > 0 ? (
            <span className="font-mono tabular-nums text-slate-300">
              {duty.bids.length} {lang === 'en' ? 'vendor quotes submitted' : 'कोटेशन आए हैं'}
            </span>
          ) : (
            <span className="text-slate-400">
              {lang === 'en' ? 'No counter bids yet' : 'अभी कोई काउंटर बोली नहीं है'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Duty Share */}
          <button
            onClick={() => onOpenWhatsApp(duty)}
            className="px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Share Duty on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          {/* Place Counter Quote / Bid */}
          {!isAccepted && (
            <button
              onClick={() => onOpenBid(duty)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Counter Quote' : 'रेट कोट करें'}</span>
            </button>
          )}

          {/* Duty Slip View */}
          {isAccepted ? (
            <button
              onClick={() => onViewDutySlip(duty)}
              className="px-3 py-1.5 rounded-lg bg-indigo-900/40 hover:bg-indigo-800/50 text-indigo-300 border border-indigo-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'View Duty Slip' : 'ड्यूटी स्लिप'}</span>
            </button>
          ) : (
            /* Direct Accept Button */
            <button
              onClick={() => onAccept(duty.id)}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{lang === 'en' ? 'Accept Duty' : 'स्वीकार करें'}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
