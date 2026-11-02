import React from 'react';
import { 
  Car, 
  PlusCircle, 
  Wallet, 
  PhoneCall, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPostDuty: () => void;
  onOpenWallet: () => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  walletBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPostDuty,
  onOpenWallet,
  lang,
  setLang,
  walletBalance,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'duties', label: lang === 'en' ? 'Duty Exchange' : 'ड्यूटी बाज़ार' },
    { id: 'empty-return', label: lang === 'en' ? 'Empty Return (खाली गाड़ी)' : 'खाली गाड़ी बाज़ार' },
    { id: 'rate-card', label: lang === 'en' ? 'Rate Calculator' : 'रेट कैलकुलेटर' },
    { id: 'fleet', label: lang === 'en' ? 'Fleet & Drivers' : 'गाड़ी व ड्राइवर' },
    { id: 'vendors', label: lang === 'en' ? 'Vendor Network' : 'वेंडर डायरेक्टरी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand element */}
        <div 
          onClick={() => setActiveTab('duties')}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <img 
            src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg" 
            alt="Safar India Cabs Logo"
            referrerPolicy="no-referrer"
            className="w-11 h-11 object-contain rounded-lg bg-white p-0.5 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              SafarIndia<span className="text-amber-400">Cabs</span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-amber-400/90 uppercase whitespace-nowrap">
              Vendors B2B Network
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive 
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-400' 
                    : 'hover:text-white text-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + compact utility controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-600 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Wallet summary */}
          <button
            onClick={onOpenWallet}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/90 border border-slate-700 hover:border-amber-500/60 hover:bg-slate-800 transition-colors text-slate-200 whitespace-nowrap shrink-0"
          >
            <Wallet className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">{lang === 'en' ? 'Wallet:' : 'वॉलेट:'}</span>
            <span className="font-mono tabular-nums font-bold text-amber-400">
              ₹{walletBalance.toLocaleString('en-IN')}
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenPostDuty}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/10 transition-all transform active:scale-95 whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{lang === 'en' ? '+ Post Duty' : '+ ड्यूटी डालें'}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenWallet();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-slate-300 font-medium py-1"
            >
              <Wallet className="w-4 h-4 text-amber-400" />
              <span>Wallet:</span>
              <span className="font-mono tabular-nums font-bold text-amber-400">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </button>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified B2B Partner</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
