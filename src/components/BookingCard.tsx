import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Lock, 
  Unlock, 
  MessageSquare, 
  Share2, 
  Phone, 
  Star, 
  Car,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
  onOpenChat: (booking: Booking) => void;
  onShareWhatsApp: (booking: Booking) => void;
  onOpenCommissionPay: (booking: Booking) => void;
  onViewDutySlip?: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onOpenChat,
  onShareWhatsApp,
  onOpenCommissionPay,
  onViewDutySlip,
}) => {
  const isUnlocked = booking.hasUnlockedContact;
  const isExpired = booking.status === 'Expired';
  const isAssigned = booking.status === 'Assigned';

  // Car image placeholder based on category
  const getCarIconOrBadge = (type: string) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-14 h-9 bg-slate-50 border border-slate-200/80 rounded-lg p-1 flex items-center justify-center shadow-2xs">
          <Car className="w-7 h-7 text-slate-700" />
        </div>
        <span className="text-xs font-bold text-slate-800 mt-1 uppercase tracking-tight">
          {booking.vehicleType}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3.5 transition-all hover:shadow-md">
      
      {/* Top Row: ID, Status, and Secured Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900 font-mono">
            ID:{booking.id}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            booking.status === 'Open' ? 'text-amber-600 bg-amber-50 border border-amber-200/60' :
            booking.status === 'Assigned' ? 'text-emerald-600 bg-emerald-50 border border-emerald-200/60' :
            booking.status === 'Completed' ? 'text-blue-600 bg-blue-50 border border-blue-200/60' :
            'text-rose-500 bg-rose-50 border border-rose-200/60'
          }`}>
            {booking.status}
          </span>
        </div>

        {booking.isSecured && (
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Secured</span>
          </div>
        )}
      </div>

      {/* Date & Time Row */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
        <Clock className="w-3.5 h-3.5" />
        <span>{booking.pickupDate}</span>
      </div>

      {/* Route Row: Pickup ⟶ [....... One Way ......>] ⟶ Drop */}
      <div className="flex items-center justify-between text-xs py-1">
        <div className="font-bold text-slate-800 text-sm max-w-[38%] truncate">
          {booking.pickupLocation}
        </div>

        <div className="flex-1 flex flex-col items-center px-2">
          <div className="flex items-center w-full justify-center text-[10px] text-amber-500 font-semibold tracking-wider">
            <span className="text-amber-400">••••••</span>
            <span className="px-1 text-slate-700 font-medium whitespace-nowrap">{booking.tripType}</span>
            <span className="text-amber-400">••••••▶</span>
          </div>
        </div>

        <div className="font-bold text-slate-800 text-sm max-w-[38%] truncate text-right">
          {booking.dropLocation}
        </div>
      </div>

      {/* Financials & Car Details */}
      <div className="grid grid-cols-3 items-center py-2 px-3 bg-slate-50/70 border border-slate-100 rounded-xl text-center">
        <div>
          <div className="text-base sm:text-lg font-black text-slate-900 font-mono tabular-nums">
            ₹{booking.totalAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Total Amount</div>
        </div>

        {/* Center Vehicle */}
        {getCarIconOrBadge(booking.vehicleType)}

        <div>
          <div className="text-base sm:text-lg font-black text-amber-600 font-mono tabular-nums">
            ₹{booking.commission.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Commission</div>
        </div>
      </div>

      {/* Extra Requirements */}
      <div className="text-xs text-slate-600 leading-relaxed bg-amber-50/40 p-2 rounded-lg border border-amber-100/60">
        <span className="font-semibold text-slate-800">Extra Requirements: </span>
        <span>{booking.extraRequirements}</span>
      </div>

      {/* Contact Section: Locked vs Unlocked */}
      {isUnlocked ? (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <Unlock className="w-4 h-4 text-emerald-600" />
              <span>Lead Secured & Unlocked!</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              Escrow Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-emerald-200/60 text-slate-700">
            <div>
              <span className="text-[10px] text-slate-500 block">Posting Agent:</span>
              <strong className="text-slate-900">{booking.postedBy.name}</strong>
              <div className="font-mono text-emerald-800 font-semibold mt-0.5">{booking.postedBy.phone}</div>
            </div>

            {booking.customerDetails && (
              <div>
                <span className="text-[10px] text-slate-500 block">Passenger Details:</span>
                <strong className="text-slate-900">{booking.customerDetails.name}</strong>
                <div className="font-mono text-slate-800 font-semibold mt-0.5">{booking.customerDetails.phone}</div>
                <div className="text-[11px] text-slate-600 truncate">{booking.customerDetails.pickupAddress}</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <a
              href={`tel:${booking.customerDetails?.phone || booking.postedBy.phone}`}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-semibold text-xs flex items-center gap-1 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Passenger</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-200/80 text-slate-600">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-400 select-none blur-[3px]">
                Hidden Contact Info
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>★ {booking.postedBy.rating} ({booking.postedBy.reviewsCount} Reviews)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenCommissionPay(booking)}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            Pay Commission (₹{booking.commission})
          </button>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => onOpenChat(booking)}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-amber-500" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => onShareWhatsApp(booking)}
          className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

    </div>
  );
};
