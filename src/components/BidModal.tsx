import React from 'react';
import { X, TrendingUp, CheckCircle, Car } from 'lucide-react';
import { Duty } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BidModalProps {
  duty: Duty | null;
  onClose: () => void;
  onSubmitBid: (dutyId: string, quote: number, note: string) => void;
  lang: 'en' | 'hi';
}

export const BidModal: React.FC<BidModalProps> = ({ duty, onClose, onSubmitBid, lang }) => {
  const [quote, setQuote] = React.useState<number>(duty ? duty.vendorRate : 3000);
  const [note, setNote] = React.useState('Brand new Dzire 2024 available, driver in uniform.');

  React.useEffect(() => {
    if (duty) {
      setQuote(duty.vendorRate);
    }
  }, [duty]);

  if (!duty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBid(duty.id, Number(quote), note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-100">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Submit Counter Quote' : 'काउंटर रेट कोट करें'}
              </h2>
              <p className="text-xs text-slate-400">
                Duty #{duty.dutyNumber} · {duty.vehicleCategory}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route context */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Route:</span>
            <span className="font-semibold text-white">{duty.pickupCity} ⟶ {duty.dropCity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Current Offer:</span>
            <span className="font-mono text-amber-400 font-bold">{formatCurrency(duty.vendorRate)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Your Offered Quote Price (₹)</label>
            <input
              type="number"
              required
              value={quote}
              onChange={(e) => setQuote(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold text-base focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Vehicle Availability Note / Location</label>
            <textarea
              rows={3}
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Innova ready in Aerocity, driver fully vaccinated with commercial badge."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Send Quote to Operator
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
