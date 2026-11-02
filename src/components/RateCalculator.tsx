import React from 'react';
import { 
  Calculator, 
  MapPin, 
  Car, 
  Clock, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  Check, 
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { POPULAR_ROUTES } from '../data/initialData';
import { formatCurrency, formatKM } from '../utils/formatters';

interface RateCalculatorProps {
  lang: 'en' | 'hi';
  onUseRateToPost: (preset: { pickup: string; drop: string; category: string; fare: number; km: number }) => void;
}

export const RateCalculator: React.FC<RateCalculatorProps> = ({ lang, onUseRateToPost }) => {
  const [tripType, setTripType] = React.useState<'oneway' | 'roundtrip'>('oneway');
  const [vehicle, setVehicle] = React.useState<'sedan' | 'suv' | 'innova' | 'tempo'>('sedan');
  const [distanceKm, setDistanceKm] = React.useState<number>(240);
  const [numDays, setNumDays] = React.useState<number>(1);
  const [includeTolls, setIncludeTolls] = React.useState<boolean>(true);
  const [includeDriverDA, setIncludeDriverDA] = React.useState<boolean>(true);
  const [stateTaxEstimate, setStateTaxEstimate] = React.useState<number>(250);

  // Per km standard pricing configuration
  const ratesConfig = {
    sedan: { perKm: 11.5, minKmDay: 250, daPerDay: 300, name: 'Sedan (Dzire / Etios)' },
    suv: { perKm: 15.0, minKmDay: 250, daPerDay: 350, name: 'SUV (Ertiga / Carens)' },
    innova: { perKm: 21.0, minKmDay: 250, daPerDay: 400, name: 'Prime SUV (Innova Crysta)' },
    tempo: { perKm: 29.0, minKmDay: 300, daPerDay: 500, name: 'Tempo Traveller (12-20s)' },
  };

  const selectedConfig = ratesConfig[vehicle];

  // Calculation
  const billableKm = tripType === 'roundtrip' 
    ? Math.max(distanceKm * 2, selectedConfig.minKmDay * numDays)
    : distanceKm;

  const baseCarFare = billableKm * selectedConfig.perKm;
  const driverDA = includeDriverDA ? selectedConfig.daPerDay * numDays : 0;
  const tollEstimate = includeTolls ? Math.round(distanceKm * (tripType === 'roundtrip' ? 1.6 : 0.95)) : 0;
  const totalB2BFare = Math.round(baseCarFare + driverDA + (includeTolls ? tollEstimate : 0) + stateTaxEstimate);
  const suggestedCustomerQuote = Math.round(totalB2BFare * 1.15); // +15% margin
  const operatorMargin = suggestedCustomerQuote - totalB2BFare;

  return (
    <div className="space-y-6">
      
      {/* Intro */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <span>{lang === 'en' ? 'B2B Fare & Rate Card Calculator' : 'B2B फेयर व रेट कार्ड कैलकुलेटर'}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'en'
            ? 'Transparent North India standard B2B taxi operator rates. Estimate exact fleet cost, state border taxes, driver DA, and fair operator profit margins.'
            : 'उत्तर भारत का प्रामाणिक B2B टैक्सी रेट चार्ट। किलोमीटर, स्टेट टैक्स, ड्राइवर भत्ता और अपने कमीशन का सटीक हिसाब करें।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Config Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {lang === 'en' ? 'Trip Specifications' : 'ट्रिप की जानकारी'}
          </h2>

          {/* Trip Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {lang === 'en' ? 'Trip Format' : 'यात्रा का प्रकार'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  tripType === 'oneway'
                    ? 'bg-amber-500/10 border-amber-500/60 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'One Way (Point-to-Point)' : 'एक तरफ (वन वे)'}
              </button>
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  tripType === 'roundtrip'
                    ? 'bg-amber-500/10 border-amber-500/60 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Round Trip (Outstation Tour)' : 'राउंड ट्रिप (आउटस्टेशन टूर)'}
              </button>
            </div>
          </div>

          {/* Vehicle Category */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {lang === 'en' ? 'Vehicle Category & B2B Per KM Rate' : 'गाड़ी का प्रकार व प्रति किमी रेट'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['sedan', 'suv', 'innova', 'tempo'] as const).map((key) => {
                const cfg = ratesConfig[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setVehicle(key)}
                    className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                      vehicle === key
                        ? 'bg-amber-500/15 border-amber-400 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-medium text-slate-200 truncate">{cfg.name.split(' ')[0]}</div>
                    <div className="text-[11px] font-mono text-amber-400 font-bold tabular-nums">
                      ₹{cfg.perKm}/KM
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance and Days inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'en' ? 'One-Way Distance (KM)' : 'एक तरफ दूरी (किमी)'}
              </label>
              <input
                type="number"
                min={20}
                max={2500}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Total billable: <strong className="text-slate-300 font-mono">{billableKm} KM</strong>
              </span>
            </div>

            {tripType === 'roundtrip' && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'en' ? 'Number of Days' : 'दिनों की संख्या'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={numDays}
                  onChange={(e) => setNumDays(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-amber-400"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Min: <strong className="text-slate-300 font-mono">{selectedConfig.minKmDay * numDays} KM</strong> ({selectedConfig.minKmDay} km/day)
                </span>
              </div>
            )}
          </div>

          {/* Inclusions Toggles */}
          <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeTolls}
                onChange={(e) => setIncludeTolls(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-0"
              />
              <span>{lang === 'en' ? 'Include Highway Tolls (~₹' + tollEstimate + ')' : `टोल टैक्स शामिल करें (~₹${tollEstimate})`}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeDriverDA}
                onChange={(e) => setIncludeDriverDA(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-0"
              />
              <span>{lang === 'en' ? `Include Driver Allowance (₹${selectedConfig.daPerDay} × ${numDays} Days)` : `ड्राइवर रात्रि भत्ता (₹${selectedConfig.daPerDay} × ${numDays} दिन)`}</span>
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">{lang === 'en' ? 'State Border Permit Tax:' : 'राज्य बॉर्डर एंट्री टैक्स:'}</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={stateTaxEstimate}
                  onChange={(e) => setStateTaxEstimate(Number(e.target.value) || 0)}
                  className="w-24 px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-right font-mono tabular-nums text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-slate-400 text-xs">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Fare Breakdown Card */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'en' ? 'Quotation Summary' : 'अनुमानित कोटेशन सारांश'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400 mt-1">
                {formatCurrency(totalB2BFare)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === 'en' ? 'Recommended Net Vendor Rate' : 'वेंडर को देय न्यूनतम दर'}
              </div>
            </div>

            {/* Line item breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Running ({billableKm} KM × ₹{selectedConfig.perKm}):</span>
                <span className="font-mono tabular-nums">{formatCurrency(baseCarFare)}</span>
              </div>
              {includeDriverDA && (
                <div className="flex justify-between text-slate-300">
                  <span>Driver DA ({numDays} Days):</span>
                  <span className="font-mono tabular-nums">{formatCurrency(driverDA)}</span>
                </div>
              )}
              {includeTolls && (
                <div className="flex justify-between text-slate-300">
                  <span>Fastag Toll Estimate:</span>
                  <span className="font-mono tabular-nums">{formatCurrency(tollEstimate)}</span>
                </div>
              )}
              {stateTaxEstimate > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>State Border Permit:</span>
                  <span className="font-mono tabular-nums">{formatCurrency(stateTaxEstimate)}</span>
                </div>
              )}
            </div>

            {/* Suggested retail quote */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-slate-400">
                  {lang === 'en' ? 'Suggested Customer Quote:' : 'ग्राहक को कोट करने योग्य मूल्य:'}
                </span>
                <span className="text-sm font-bold font-mono tabular-nums text-emerald-400">
                  {formatCurrency(suggestedCustomerQuote)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>{lang === 'en' ? 'Your Gross Margin:' : 'आपका मुनाफा:'}</span>
                <span className="font-mono tabular-nums text-slate-300 font-semibold">{formatCurrency(operatorMargin)}</span>
              </div>
            </div>
          </div>

          {/* Action to create duty */}
          <button
            onClick={() => onUseRateToPost({
              pickup: 'Delhi NCR',
              drop: 'Outstation Destination',
              category: selectedConfig.name,
              fare: totalB2BFare,
              km: billableKm,
            })}
            className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'en' ? 'Post Duty With This Rate' : 'इस रेट पर ड्यूटी पोस्ट करें'}</span>
          </button>
        </div>

      </div>

      {/* Popular Routes Benchmark Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>{lang === 'en' ? 'Standard North India Intercity B2B Rate Sheet' : 'उत्तर भारत इंटरसिटी मानक B2B रेट लिस्ट'}</span>
          </h2>
          <span className="text-xs text-slate-400">
            {lang === 'en' ? 'One Way All-Inclusive (Toll/Tax incl.)' : 'वन वे (टोल व टैक्स सहित)'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Route (रूट)</th>
                <th className="py-2.5 px-3">Approx Distance</th>
                <th className="py-2.5 px-3 font-mono">Sedan (Dzire)</th>
                <th className="py-2.5 px-3 font-mono">SUV (Ertiga)</th>
                <th className="py-2.5 px-3 font-mono">Prime (Innova)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {POPULAR_ROUTES.map((route, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white">
                    {route.from} ⟶ {route.to}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-400">
                    {route.km} KM
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-amber-400 font-semibold">
                    {formatCurrency(route.sedan)}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-200">
                    {formatCurrency(route.suv)}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-200">
                    {formatCurrency(route.innova)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onUseRateToPost({
                        pickup: route.from,
                        drop: route.to,
                        category: 'Sedan (Dzire / Etios)',
                        fare: route.sedan,
                        km: route.km,
                      })}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs"
                    >
                      {lang === 'en' ? 'Post This' : 'ड्यूटी डालें'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
