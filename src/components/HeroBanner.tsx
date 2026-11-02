import React from 'react';
import { Search, MapPin, Navigation, Car, ArrowRight, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  lang: 'en' | 'hi';
  onQuickFilter: (origin: string, dest: string, category: string) => void;
  onOpenPostDuty: () => void;
  onOpenEmptyReturn: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onQuickFilter,
  onOpenPostDuty,
  onOpenEmptyReturn,
}) => {
  const [pickup, setPickup] = React.useState('');
  const [drop, setDrop] = React.useState('');
  const [category, setCategory] = React.useState('All');

  const popularCities = ['Delhi NCR', 'Agra', 'Jaipur', 'Chandigarh', 'Dehradun', 'Haridwar', 'Shimla', 'Lucknow'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickFilter(pickup, drop, category);
  };

  return (
    <div className="relative bg-slate-950 border-b border-slate-800 text-slate-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & B2B Mission */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Zap className="w-3.5 h-3.5" />
              <span>
                {lang === 'en' 
                  ? 'North India B2B Taxi Operator Exchange' 
                  : 'उत्तर भारत का विश्वसनीय B2B टैक्सी ऑपरेटर नेटवर्क'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'en' ? (
                <>
                  Connect. Exchange Duties.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                    Eliminate Empty Return Cabs.
                  </span>
                </>
              ) : (
                <>
                  ड्यूटी एक्सचेंज करें,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                    खाली गाड़ी को तुरंत ग्राहक दें।
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'Join 1,200+ verified taxi operators, travel agents, and fleet owners across Delhi NCR, Rajasthan, Punjab, UP & Uttarakhand. Direct deals, zero hidden cuts, and 1-click WhatsApp duty broadcasts.'
                : 'दिल्ली NCR, राजस्थान, पंजाब, यूपी और उत्तराखंड के 1,200+ सत्यापित टैक्सी ऑपरेटरों और फ्लीट मालिकों से जुड़ें। सीधी बुकिंग, पारदर्शी कमीशन और 1-क्लिक व्हाट्सएप शेयर।'}
            </p>

            {/* Quick stats counter */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-slate-800/80 max-w-lg">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">480+</p>
                <p className="text-xs text-slate-400">{lang === 'en' ? 'Daily Active Duties' : 'दैनिक ड्यूटी'}</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">1,250+</p>
                <p className="text-xs text-slate-400">{lang === 'en' ? 'Verified Cabs' : 'सत्यापित गाड़ियां'}</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">0%</p>
                <p className="text-xs text-slate-400">{lang === 'en' ? 'Direct Deal Brokerage' : 'सीधी डील ब्रोकरेज'}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenPostDuty}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>{lang === 'en' ? 'Post New Duty' : '+ ड्यूटी पोस्ट करें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenEmptyReturn}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Post Empty Cab (खाली गाड़ी)' : 'खाली गाड़ी डालें'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Uploaded Banner Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group max-w-md w-full">
              <img
                src="/assets/aistudio/IMG-20261029-WA0000_12601531.jpg"
                alt="Safar India Cabs - Your Journey, Our Priority"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Safar India Cabs Verified Fleet
                  </h2>
                  <p className="text-xs text-slate-400">
                    A1 Cab Services · N. India Tourist Permit
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Govt. AITP Registered</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Route Search & Quick Filter Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'en' ? 'Pickup City / Airport' : 'पिकअप शहर'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Delhi, IGI T3, Gurgaon"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'en' ? 'Drop City' : 'ड्रॉप शहर'}
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Agra, Jaipur, Chandigarh"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'en' ? 'Vehicle Type' : 'गाड़ी का प्रकार'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
              >
                <option value="All">{lang === 'en' ? 'All Vehicle Types' : 'सभी गाड़ियां'}</option>
                <option value="Sedan">Sedan (Dzire / Etios)</option>
                <option value="SUV">SUV (Ertiga / Carens)</option>
                <option value="Innova">Prime SUV (Innova Crysta)</option>
                <option value="Tempo">Tempo Traveller (12-20s)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{lang === 'en' ? 'Search Live Duties' : 'ड्यूटी खोजें'}</span>
              </button>
            </div>
          </form>

          {/* Quick chips */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-400">
              {lang === 'en' ? 'Popular Routes:' : 'लोकप्रिय मार्ग:'}
            </span>
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setPickup(city);
                  onQuickFilter(city, drop, category);
                }}
                className="text-xs text-slate-300 hover:text-amber-400 underline decoration-slate-700 underline-offset-2 transition-colors mr-2"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
