import React from 'react';
import { Bell, ArrowRight, X, Sparkles, CheckCircle2, ShieldCheck, MapPin, Car } from 'lucide-react';
import { AppNotification } from '../types';

interface VisualPushBannerProps {
  notification: AppNotification | null;
  onClose: () => void;
  onOpenBooking: (bookingId: string) => void;
}

export const VisualPushBanner: React.FC<VisualPushBannerProps> = ({
  notification,
  onClose,
  onOpenBooking,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-2xl border-2 border-amber-400 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                Duty Radar Alert
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                Direct Match
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="mt-2 space-y-2">
          <h4 className="text-sm font-black text-white leading-tight">
            {notification.title}
          </h4>

          {notification.bookingData ? (
            <div className="bg-slate-800/90 rounded-2xl p-2.5 border border-slate-700/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{notification.bookingData.pickupLocation}</span>
                </span>
                <span className="text-slate-400 font-normal">⟶</span>
                <span className="text-amber-300">
                  {notification.bookingData.dropLocation}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-700 text-[11px]">
                <span className="text-slate-300 flex items-center gap-1 font-semibold">
                  <Car className="w-3 h-3 text-amber-400" />
                  <span>{notification.bookingData.vehicleType}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">
                    Fare: <strong className="text-white font-mono">₹{notification.bookingData.totalAmount.toLocaleString('en-IN')}</strong>
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    Comm: ₹{notification.bookingData.commission.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed">
              {notification.message}
            </p>
          )}

          {/* Matched badges */}
          {notification.matchedCriteria && notification.matchedCriteria.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {notification.matchedCriteria.map((crit, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-600/40 text-[10px] font-bold"
                >
                  ✓ {crit}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <span className="text-[10px] text-slate-400">
              SafarIndiaCabs Radar · {notification.timestamp}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:text-white"
              >
                Dismiss
              </button>

              {notification.bookingId && (
                <button
                  onClick={() => {
                    onOpenBooking(notification.bookingId!);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md flex items-center gap-1 transition-all active:scale-95"
                >
                  <span>View & Lock Lead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
