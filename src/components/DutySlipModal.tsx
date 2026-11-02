import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Car, Download, QrCode } from 'lucide-react';
import { Duty } from '../types';
import { formatCurrency, formatKM } from '../utils/formatters';

interface DutySlipModalProps {
  duty: Duty | null;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const DutySlipModal: React.FC<DutySlipModalProps> = ({ duty, onClose, lang }) => {
  const [startKm, setStartKm] = React.useState('42,180');
  const [endKm, setEndKm] = React.useState('42,425');
  const [tollAmount, setTollAmount] = React.useState('380');
  const [parkingAmount, setParkingAmount] = React.useState('150');
  const [otpCode] = React.useState('6842');

  if (!duty) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 print:shadow-none print:border-none print:m-0 print:p-4">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Official Trip Voucher
            </span>
            <span className="text-xs text-slate-500">· Ready to print or share with guest</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE SLIP CONTENT */}
        <div className="border-2 border-slate-900 rounded-xl p-6 space-y-5 bg-white">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg"
                alt="Safar India Cabs Logo"
                className="w-14 h-14 object-contain rounded-lg border border-slate-200 p-1"
              />
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-950">
                  SAFAR INDIA CABS VENDORS
                </h1>
                <p className="text-xs font-medium text-slate-600">
                  A1 CAB SERVICES · NORTH INDIA TOURIST NETWORK
                </p>
                <p className="text-[11px] text-slate-500">
                  Support: +91 98112 45890 · bookings@safarindiacabs.in
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-bold text-slate-900">
                DUTY SLIP NO:
              </div>
              <div className="text-lg font-black font-mono text-amber-600 tracking-wider">
                {duty.dutyNumber}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Date: <span className="font-semibold text-slate-800">{duty.pickupDate}</span>
              </div>
            </div>
          </div>

          {/* Passenger & Trip Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Guest / Client Details
              </span>
              <p className="font-bold text-slate-900 text-sm">{duty.passengerName || 'Corporate Client'}</p>
              <p className="text-slate-600 mt-0.5 font-mono">{duty.passengerPhone || '+91 98711 23456'}</p>
              <p className="text-slate-500 mt-1">Booked Via: {duty.operatorName}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Vehicle & Driver Assigned
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {duty.assignedDriver?.vehicleNumber || 'DL 01 ZB 4912'} ({duty.vehicleCategory})
              </p>
              <p className="text-slate-600 mt-0.5">
                Driver: <span className="font-semibold text-slate-800">{duty.assignedDriver?.name || 'Baljeet Singh'}</span> ({duty.assignedDriver?.phone || '+91 98119 44321'})
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Police Verified Driver & AITP Vehicle</span>
              </div>
            </div>
          </div>

          {/* Route & Timing Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Pickup & Reporting Location
              </span>
              <p className="font-semibold text-slate-900">{duty.pickupLocation}</p>
              <p className="text-slate-600">Reporting Time: <span className="font-bold text-slate-900">{duty.pickupTime}</span></p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Drop / Destination
              </span>
              <p className="font-semibold text-slate-900">{duty.dropLocation}</p>
              <p className="text-slate-600">Approx Route Distance: <span className="font-bold text-slate-900 font-mono">{duty.distanceKm} KM</span></p>
            </div>
          </div>

          {/* Odometer Log & Charges Table */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Trip Log & Odometer Readings
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 border border-slate-300 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Start KM</div>
                <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">{startKm}</div>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Closing KM</div>
                <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">{endKm}</div>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Toll / Fastag</div>
                <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">₹{tollAmount}</div>
              </div>
              <div className="p-2 border border-slate-300 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Parking Charges</div>
                <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">₹{parkingAmount}</div>
              </div>
            </div>
          </div>

          {/* Financials & OTP verification */}
          <div className="grid grid-cols-2 gap-4 items-center pt-2 border-t border-slate-200 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Trip Agreed Fare:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(duty.vendorRate)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Advance Paid:</span>
                <span className="font-mono font-bold text-emerald-700">{formatCurrency(duty.advanceAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1">
                <span>Balance Due on Drop:</span>
                <span className="font-mono text-amber-700">{formatCurrency(duty.vendorRate - duty.advanceAmount)}</span>
              </div>
            </div>

            <div className="border border-dashed border-slate-400 p-3 rounded-lg text-center space-y-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Start Trip OTP / Verification Code
              </div>
              <div className="font-mono font-black text-2xl tracking-widest text-slate-950">
                {otpCode}
              </div>
              <div className="text-[10px] text-slate-500">
                Share with driver only upon cab boarding
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
            <div className="border-t border-slate-400 pt-1">
              Driver Signature / Date
            </div>
            <div className="border-t border-slate-400 pt-1">
              Guest / Passenger Signature
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
