import React from 'react';
import { 
  X, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PlusCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Building
} from 'lucide-react';
import { WalletTransaction } from '../types';
import { formatCurrency } from '../utils/formatters';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  transactions: WalletTransaction[];
  onAddFunds: (amount: number) => void;
  onRequestWithdrawal: (amount: number, upiOrBank: string) => void;
  lang: 'en' | 'hi';
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  transactions,
  onAddFunds,
  onRequestWithdrawal,
  lang,
}) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'add' | 'withdraw'>('overview');
  const [addAmount, setAddAmount] = React.useState(2000);
  const [withdrawAmount, setWithdrawAmount] = React.useState(3000);
  const [upiId, setUpiId] = React.useState('classiccreations@okaxis');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFunds(Number(addAmount));
    setActiveTab('overview');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount > balance) return;
    onRequestWithdrawal(Number(withdrawAmount), upiId);
    setActiveTab('overview');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Vendor Wallet & Settlement Ledger' : 'वेंडर वॉलेट व हिसाब-किताब'}
              </h2>
              <p className="text-xs text-slate-400">
                A/c: Sharma Travels (Verified Partner)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {lang === 'en' ? 'Available Balance' : 'उपलब्ध बैलेंस'}
            </div>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-400 mt-1">
              {formatCurrency(balance)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Bank & UPI Settlements Enabled</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('add')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
            >
              + {lang === 'en' ? 'Recharge' : 'रिचार्ज करें'}
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              {lang === 'en' ? 'Withdraw' : 'निकासी'}
            </button>
          </div>
        </div>

        {/* Add Funds Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddSubmit} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="font-semibold text-white">Recharge Wallet Balance (Simulated UPI)</div>
            <div className="grid grid-cols-3 gap-2">
              {[1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAddAmount(amt)}
                  className={`py-1.5 rounded border font-mono tabular-nums ${
                    addAmount === amt ? 'bg-amber-500/20 border-amber-400 text-amber-400 font-bold' : 'border-slate-800 text-slate-300'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Custom Amount (₹)</label>
              <input
                type="number"
                min={100}
                value={addAmount}
                onChange={(e) => setAddAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                Confirm UPI Recharge
              </button>
            </div>
          </form>
        )}

        {/* Withdraw Form */}
        {activeTab === 'withdraw' && (
          <form onSubmit={handleWithdrawSubmit} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="font-semibold text-white">Request Instant Bank / UPI Withdrawal</div>
            <div>
              <label className="block text-slate-400 mb-1">Amount to Transfer (₹)</label>
              <input
                type="number"
                min={500}
                max={balance}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Max withdrawable: {formatCurrency(balance)}
              </span>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Beneficiary UPI ID or Bank A/c</label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="name@okaxis or Bank Account / IFSC"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={withdrawAmount > balance}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-50"
              >
                Submit Withdrawal
              </button>
            </div>
          </form>
        )}

        {/* Transaction History */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{lang === 'en' ? 'Recent Transactions' : 'हाल के लेन-देन'}</span>
            <span className="text-[11px] text-slate-400 font-mono">{transactions.length} records</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${
                    tx.type === 'credit' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                  }`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{tx.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{tx.reference} · {tx.date}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono font-bold tabular-nums text-sm ${
                    tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
