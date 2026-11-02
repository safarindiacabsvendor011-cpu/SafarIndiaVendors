import React from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import { Booking } from '../types';

interface CommissionEscrowModalProps {
  booking: Booking | null;
  onClose: () => void;
  onConfirmPay: (bookingId: string, amount: number) => void;
  walletBalance: number;
}

export const CommissionEscrowModal: React.FC<CommissionEscrowModalProps> = ({
  booking,
  onClose,
  onConfirmPay,
  walletBalance,
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<'wallet' | 'upi'>('upi');
  const [upiApp, setUpiApp] = React.useState('GPay');

  if (!booking) return null;

  const commission = booking.commission;
  const agentPayout = Math.round(commission * 0.97); // 3% fee deduction
  const platformFee = commission - agentPayout;

  const handlePay = () => {
    onConfirmPay(booking.id, commission);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-800 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Secure Lead & Pay Commission
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Booking ID: {booking.id}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route info */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
          <div className="flex justify-between font-bold text-slate-900">
            <span>{booking.pickupLocation} ⟶ {booking.dropLocation}</span>
            <span className="font-mono text-amber-600">{booking.vehicleType}</span>
          </div>
          <div className="flex justify-between text-slate-500 pt-0.5">
            <span>Customer Total Fare:</span>
            <span className="font-mono font-bold text-slate-800">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Amount to pay */}
        <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl text-white flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs uppercase font-bold text-amber-100 tracking-wider">
              Commission Held in Escrow
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono mt-0.5">
              ₹{commission.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right text-[11px] text-amber-100">
            <div>100% Refundable</div>
            <div className="font-semibold">If cancelled by guest</div>
          </div>
        </div>

        {/* How Mediator System Works */}
        <div className="p-3 bg-blue-50/80 border border-blue-200/60 rounded-2xl text-xs text-blue-950 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>How SafarIndiaCabs Mediator Escrow Protects You:</span>
          </div>
          
          <ul className="space-y-1.5 text-[11px] text-slate-700 pl-4 list-disc">
            <li>
              <strong>Instant Unlock:</strong> Paying this commission unlocks the agent's direct phone number, WhatsApp, and passenger pickup address immediately.
            </li>
            <li>
              <strong>Safe Settlement:</strong> The agent does NOT receive this commission directly until the ride is picked up and completed.
            </li>
            <li>
              <strong>3% Platform Charge:</strong> Upon ride completion, SafarIndiaCabs releases ₹{agentPayout} (after deducting 3% platform fee ₹{platformFee}) to the posting agent.
            </li>
            <li>
              <strong>100% Refund Guarantee:</strong> If the client cancels the trip, your ₹{commission} is instantly credited back to your wallet!
            </li>
          </ul>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-700">Choose Payment Method:</span>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                paymentMethod === 'upi'
                  ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Instant UPI</span>
                <CreditCard className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">GPay / PhonePe / Paytm</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('wallet')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-bold'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Wallet Balance</span>
                <span className="font-mono text-emerald-600">₹{walletBalance}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">Instant 1-Click Pay</div>
            </button>
          </div>
        </div>

        {/* Pay Button */}
        <div className="pt-2">
          <button
            onClick={handlePay}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Pay ₹{commission} & Secure Booking</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};
