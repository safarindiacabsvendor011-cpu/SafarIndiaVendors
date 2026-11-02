import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  MessageSquare, 
  Share2, 
  Phone, 
  Car, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  RotateCcw
} from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsTabProps {
  bookings: Booking[];
  onOpenChat: (booking: Booking) => void;
  onShareWhatsApp: (booking: Booking) => void;
  onViewDutySlip: (booking: Booking) => void;
  onCompleteRide: (bookingId: string) => void;
  onCancelRide: (bookingId: string) => void;
}

export const MyBookingsTab: React.FC<MyBookingsTabProps> = ({
  bookings,
  onOpenChat,
  onShareWhatsApp,
  onViewDutySlip,
  onCompleteRide,
  onCancelRide,
}) => {
  const [subTab, setSubTab] = React.useState<'posted' | 'received'>('posted');
  const [searchQuery, setSearchQuery] = React.useState('');

  const postedBookings = bookings.filter((b) => b.id === '3530815' || b.id === '3575348');
  const receivedBookings = bookings.filter((b) => b.id === '3530802' || b.hasUnlockedContact);

  const activeList = subTab === 'posted' ? postedBookings : receivedBookings;

  return (
    <div className="space-y-4 pb-20">
      
      {/* 1. Sub Tabs: Booking Posted | Booking Received */}
      <div className="bg-slate-100 p-1.5 rounded-full flex items-center justify-between gap-1 shadow-inner max-w-md mx-auto">
        <button
          onClick={() => setSubTab('posted')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            subTab === 'posted'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Booking Posted
        </button>

        <button
          onClick={() => setSubTab('received')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            subTab === 'received'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Booking Received
        </button>
      </div>

      {/* 2. Search bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by booking Id..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
        />
      </div>

      {/* 3. Cards List */}
      <div className="space-y-3.5">
        {activeList.map((booking) => {
          const isAssigned = booking.status === 'Assigned';
          const isCompleted = booking.status === 'Completed';

          return (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3.5 shadow-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 font-mono">
                    ID:{booking.id}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    booking.status === 'Open' ? 'text-amber-600 bg-amber-50' :
                    booking.status === 'Assigned' ? 'text-emerald-600 bg-emerald-50' :
                    booking.status === 'Completed' ? 'text-blue-600 bg-blue-50' :
                    'text-rose-500 bg-rose-50'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Secured</span>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs font-semibold text-rose-500">
                {booking.pickupDate}
              </div>

              {/* Route */}
              <div className="flex items-center justify-between text-xs py-1">
                <div className="font-bold text-slate-800 text-sm max-w-[38%] truncate">
                  {booking.pickupLocation}
                </div>
                <div className="flex-1 flex flex-col items-center px-2">
                  <div className="text-[10px] text-amber-500 font-semibold tracking-wider">
                    •••••• {booking.tripType} ••••••▶
                  </div>
                </div>
                <div className="font-bold text-slate-800 text-sm max-w-[38%] truncate text-right">
                  {booking.dropLocation}
                </div>
              </div>

              {/* Financials & Car */}
              <div className="grid grid-cols-3 items-center py-2 px-3 bg-slate-50/70 border border-slate-100 rounded-xl text-center">
                <div>
                  <div className="text-base font-black text-slate-900 font-mono">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-500">Total Amount</div>
                </div>

                <div className="flex flex-col items-center">
                  <Car className="w-6 h-6 text-slate-700" />
                  <span className="text-xs font-bold text-slate-800 uppercase mt-0.5">
                    {booking.vehicleType}
                  </span>
                </div>

                <div>
                  <div className="text-base font-black text-amber-600 font-mono">
                    ₹{booking.commission.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-500">Commission</div>
                </div>
              </div>

              {/* Requirements */}
              <div className="text-xs text-slate-600 bg-amber-50/30 p-2 rounded-lg border border-amber-100/60">
                <span className="font-semibold text-slate-800">Extra Requirements: </span>
                {booking.extraRequirements}
              </div>

              {/* Customer / Vendor Contact Info if assigned */}
              {booking.hasUnlockedContact && (
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Passenger: {booking.customerDetails?.name}</span>
                    <a href={`tel:${booking.customerDetails?.phone}`} className="text-emerald-700 font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{booking.customerDetails?.phone}</span>
                    </a>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    Pickup: {booking.customerDetails?.pickupAddress}
                  </div>
                </div>
              )}

              {/* Mediator Status & Commission Settlement */}
              {isAssigned && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between text-blue-900 font-semibold">
                    <span>Mediator Escrow Status:</span>
                    <span className="text-emerald-700 font-bold">₹{booking.commission} Held Safely</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Ride picked up? Once the ride completes, click "Mark Completed". The company releases <strong>₹{Math.round(booking.commission * 0.97)}</strong> (after 3% fee deduction) to the agent account. If cancelled, ₹{booking.commission} is 100% refunded!
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onCompleteRide(booking.id)}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                    >
                      ✓ Mark Ride Completed
                    </button>
                    <button
                      onClick={() => onCancelRide(booking.id)}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-semibold text-xs flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Cancel & Refund</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onOpenChat(booking)}
                  className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => onShareWhatsApp(booking)}
                  className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
