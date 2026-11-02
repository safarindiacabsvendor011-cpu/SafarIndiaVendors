import React, { useState } from 'react';
import { 
  Star, 
  X, 
  ShieldCheck, 
  Car, 
  CheckCircle2, 
  ThumbsUp, 
  Clock, 
  Sparkles, 
  User, 
  MessageSquareQuote,
  Award
} from 'lucide-react';
import { Booking, DriverFeedback } from '../types';

interface DriverFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSubmitFeedback: (feedback: Omit<DriverFeedback, 'id' | 'createdAt'>) => void;
}

const RATING_DESCRIPTIONS: Record<number, { title: string; subtitle: string; color: string }> = {
  5: { title: 'Shandar Service! (Outstanding)', subtitle: 'Punctual, professional, and excellent ride.', color: 'text-amber-500' },
  4: { title: 'Bahut Badiya! (Very Good)', subtitle: 'Smooth trip with good vehicle condition.', color: 'text-emerald-500' },
  3: { title: 'Theek Tha (Average)', subtitle: 'Ride completed satisfactorily.', color: 'text-blue-500' },
  2: { title: 'Sudhar Chahiye (Needs Improvement)', subtitle: 'Faced minor issues during duty.', color: 'text-orange-500' },
  1: { title: 'Kharaab Anubhav (Poor Experience)', subtitle: 'Disappointed with punctuality or vehicle.', color: 'text-rose-500' },
};

const AVAILABLE_TAGS = [
  '⏱️ On-Time Pickup',
  '✨ Clean & Sanitized Cab',
  '❄️ Chilled AC In Plains',
  '🛡️ Safe Highway Driving',
  '🤝 Polite & Professional',
  '💳 Fair Billing & Escrow',
  '🚗 Well-Maintained Vehicle',
  '📶 Quick WhatsApp Response',
];

export const DriverFeedbackModal: React.FC<DriverFeedbackModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSubmitFeedback,
}) => {
  const [rating, setRating] = useState<number>(booking?.feedbackRating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [vehicleCondition, setVehicleCondition] = useState<number>(5);
  const [driverBehavior, setDriverBehavior] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    booking?.feedbackTags || [
      '⏱️ On-Time Pickup',
      '✨ Clean & Sanitized Cab',
    ]
  );
  const [comments, setComments] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (booking) {
      if (booking.feedbackRating) setRating(booking.feedbackRating);
      if (booking.feedbackTags && booking.feedbackTags.length > 0) setSelectedTags(booking.feedbackTags);
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData: Omit<DriverFeedback, 'id' | 'createdAt'> = {
      bookingId: booking.id,
      fromVendorName: 'SafarIndiaCabs Partner',
      fromVendorPhone: '8506046346',
      toVendorId: booking.postedBy.id,
      toVendorName: booking.postedBy.name,
      rating,
      punctuality,
      vehicleCondition,
      driverBehavior,
      comments: comments.trim() || 'Trip completed smoothly. Trusted B2B partner.',
      tags: selectedTags,
    };

    setTimeout(() => {
      onSubmitFeedback(feedbackData);
      setIsSubmitting(false);
      onClose();
    }, 450);
  };

  const activeRating = hoverRating || rating;
  const ratingInfo = RATING_DESCRIPTIONS[activeRating] || RATING_DESCRIPTIONS[5];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200/80 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-4 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-300" />
              Verified Driver Feedback & Trust
            </span>
          </div>

          <h2 className="text-lg font-black text-white mt-1">
            Rate Duty Partner / वेंडर फीडबैक दें
          </h2>
          
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300">
            <span className="font-mono text-amber-400 font-bold">Duty #{booking.id}</span>
            <span>•</span>
            <span className="truncate">{booking.pickupLocation} ⟶ {booking.dropLocation}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto flex-1">
          
          {/* Target Vendor Card */}
          <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                {booking.postedBy.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>{booking.postedBy.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Current Rating: <strong className="text-amber-600 font-mono">★ {booking.postedBy.rating}</strong> ({booking.postedBy.reviewsCount} reviews)
                </div>
              </div>
            </div>

            <span className="text-[10px] bg-white px-2 py-1 rounded-lg border border-amber-200 font-bold text-amber-800">
              {booking.vehicleType}
            </span>
          </div>

          {/* Primary Star Rating (1 to 5) */}
          <div className="text-center py-2 bg-slate-50/80 rounded-2xl border border-slate-200/70 p-3 space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Overall Experience (कुल रेटिंग)
            </label>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((starVal) => {
                const isFilled = starVal <= activeRating;
                return (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    onMouseEnter={() => setHoverRating(starVal)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isFilled
                          ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Rating dynamic label */}
            <div className="space-y-0.5">
              <div className={`text-sm font-extrabold ${ratingInfo.color}`}>
                {ratingInfo.title}
              </div>
              <div className="text-[11px] text-slate-500">
                {ratingInfo.subtitle}
              </div>
            </div>
          </div>

          {/* Detailed Criteria Sliders/Scores */}
          <div className="space-y-2.5 bg-white rounded-2xl border border-slate-200/80 p-3 text-xs">
            <div className="font-bold text-slate-800 flex items-center justify-between pb-1 border-b border-slate-100">
              <span>Detailed Service Quality</span>
              <span className="text-[10px] text-slate-400">Rate 1 to 5</span>
            </div>

            {/* Criteria 1: Punctuality */}
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">⏱️ Pilot Punctuality (समय की पाबंदी)</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setPunctuality(val)}
                    className={`w-6 h-6 rounded-md font-bold text-[11px] transition-all ${
                      punctuality >= val
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 2: Vehicle Condition & AC */}
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">🚗 Cab Cleanliness & AC Condition</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setVehicleCondition(val)}
                    className={`w-6 h-6 rounded-md font-bold text-[11px] transition-all ${
                      vehicleCondition >= val
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 3: Professional Behavior */}
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">🤝 Driver Behavior & Discipline</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setDriverBehavior(val)}
                    className={`w-6 h-6 rounded-md font-bold text-[11px] transition-all ${
                      driverBehavior >= val
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Praise Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Select Positive Highlights (खूबियां चुनें)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-2xs font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comments Textarea */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400" />
              <span>Review Note for Community (वैकल्पिक टिप्पणी)</span>
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Driver time par pahuche the, gadi saf thi aur booking bina kisi pareshani ke complete hui..."
              rows={2}
              className="w-full p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500 placeholder-slate-400 resize-none"
            />
          </div>

          {/* Escrow & Trust Safety Assurance */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Your rating directly updates this vendor's average trust score on the Market Duty board.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Skip
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording...' : 'Submit Rating & Build Trust'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
