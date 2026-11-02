import React from 'react';
import { 
  X, 
  Bell, 
  Sliders, 
  Check, 
  Trash2, 
  CheckCheck, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Car, 
  ShieldCheck, 
  Crown, 
  ArrowRight,
  Filter,
  Play,
  RotateCw
} from 'lucide-react';
import { AppNotification, DutyAlertCriteria, VehicleCategory } from '../types';
import { playNotificationChime } from '../utils/audioChime';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  alertCriteria: DutyAlertCriteria;
  onUpdateCriteria: (newCriteria: DutyAlertCriteria) => void;
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onSelectBooking: (bookingId: string) => void;
  onSimulateDutyMatch: () => void;
  userAttachedVehicleCategory?: VehicleCategory;
}

const COMMON_PICKUP_CITIES = ['Haldwani', 'Delhi NCR', 'Dehradun', 'Jaipur', 'Chandigarh', 'Haridwar', 'Agra', 'Lucknow'];
const COMMON_DROP_CITIES = ['New Delhi', 'Delhi Division', 'Jaipur', 'Haldwani', 'Dehradun', 'Any Destination'];
const VEHICLE_OPTIONS: VehicleCategory[] = ['Sedan', 'Ertiga', 'INNOVA CRYSTA', 'Hatchback', 'SUV', 'Tempo Traveller'];

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  alertCriteria,
  onUpdateCriteria,
  onMarkAllAsRead,
  onClearNotifications,
  onSelectBooking,
  onSimulateDutyMatch,
  userAttachedVehicleCategory = 'Sedan',
}) => {
  const [activeTab, setActiveTab] = React.useState<'feed' | 'settings'>('feed');
  const [feedFilter, setFeedFilter] = React.useState<'all' | 'matches' | 'escrow'>('all');
  
  // Local editable criteria state
  const [localCriteria, setLocalCriteria] = React.useState<DutyAlertCriteria>(alertCriteria);
  const [customCityInput, setCustomCityInput] = React.useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = React.useState(false);

  React.useEffect(() => {
    setLocalCriteria(alertCriteria);
  }, [alertCriteria]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (feedFilter === 'matches') return n.type === 'duty_match';
    if (feedFilter === 'escrow') return n.type === 'escrow';
    return true;
  });

  const toggleVehicleCategory = (cat: VehicleCategory) => {
    setLocalCriteria((prev) => {
      const exists = prev.vehicleCategories.includes(cat);
      const nextCategories = exists
        ? prev.vehicleCategories.filter((c) => c !== cat)
        : [...prev.vehicleCategories, cat];
      return { ...prev, vehicleCategories: nextCategories };
    });
  };

  const togglePickupCity = (city: string) => {
    setLocalCriteria((prev) => {
      const exists = prev.preferredPickupCities.includes(city);
      const nextCities = exists
        ? prev.preferredPickupCities.filter((c) => c !== city)
        : [...prev.preferredPickupCities, city];
      return { ...prev, preferredPickupCities: nextCities };
    });
  };

  const toggleDropCity = (city: string) => {
    setLocalCriteria((prev) => {
      const exists = prev.preferredDropCities.includes(city);
      const nextCities = exists
        ? prev.preferredDropCities.filter((c) => c !== city)
        : [...prev.preferredDropCities, city];
      return { ...prev, preferredDropCities: nextCities };
    });
  };

  const handleAddCustomCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const city = customCityInput.trim();
    if (!localCriteria.preferredPickupCities.includes(city)) {
      setLocalCriteria((prev) => ({
        ...prev,
        preferredPickupCities: [...prev.preferredPickupCities, city],
      }));
    }
    setCustomCityInput('');
  };

  const handleSaveCriteria = () => {
    onUpdateCriteria(localCriteria);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  const handleTestSound = () => {
    playNotificationChime();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl relative text-slate-800 animate-in zoom-in-95 my-auto overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">
                  Notification Center
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-black">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Duty radar & instant lead alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-4 pt-3 pb-2 bg-slate-50/70 border-b border-slate-100 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'feed'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts Feed ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Saved Filter Criteria (Radar)</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* TAB 1: NOTIFICATIONS FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-3">
              
              {/* Filter pills & Action controls */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setFeedFilter('all')}
                    className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                      feedFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFeedFilter('matches')}
                    className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                      feedFilter === 'matches'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🎯 Duty Matches
                  </button>
                  <button
                    onClick={() => setFeedFilter('escrow')}
                    className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                      feedFilter === 'escrow'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    🛡️ Escrow
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllAsRead}
                      className="text-[11px] font-bold text-amber-600 hover:underline flex items-center gap-1"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Read</span>
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className="text-[11px] font-semibold text-slate-400 hover:text-rose-600"
                      title="Clear notifications"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Simulation Quick Bar */}
              <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100/60 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                    <span>Real-time Duty Radar Active</span>
                  </div>
                  <div className="text-[10px] text-amber-900/80">
                    Listening for {localCriteria.vehicleCategories.join(', ')} routes
                  </div>
                </div>

                <button
                  onClick={onSimulateDutyMatch}
                  className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-[11px] rounded-xl shadow-2xs transition-all flex items-center gap-1 shrink-0"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Test Match Alert</span>
                </button>
              </div>

              {/* Notifications List */}
              {filteredNotifications.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-2xl border transition-all text-xs space-y-2 ${
                        notif.read
                          ? 'bg-white border-slate-200/80'
                          : 'bg-amber-50/40 border-amber-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                            notif.type === 'duty_match' ? 'bg-amber-500 text-white' :
                            notif.type === 'escrow' ? 'bg-emerald-600 text-white' :
                            notif.type === 'membership' ? 'bg-blue-600 text-white' :
                            'bg-slate-700 text-white'
                          }`}>
                            {notif.type === 'duty_match' ? <Car className="w-3.5 h-3.5" /> :
                             notif.type === 'escrow' ? <ShieldCheck className="w-3.5 h-3.5" /> :
                             notif.type === 'membership' ? <Crown className="w-3.5 h-3.5" /> :
                             <Bell className="w-3.5 h-3.5" />}
                          </div>

                          <div>
                            <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                              <span>{notif.title}</span>
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {notif.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {notif.message}
                      </p>

                      {/* Booking Summary Box */}
                      {notif.bookingData && (
                        <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="font-bold text-slate-800">
                              {notif.bookingData.pickupLocation} ⟶ {notif.bookingData.dropLocation}
                            </span>
                            <div className="text-[10px] text-slate-500">
                              {notif.bookingData.vehicleType}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-black text-slate-900 block">
                              ₹{notif.bookingData.totalAmount.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 font-mono">
                              Comm: ₹{notif.bookingData.commission}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Criteria tags */}
                      {notif.matchedCriteria && notif.matchedCriteria.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {notif.matchedCriteria.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold"
                            >
                              ✓ {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action button if has bookingId */}
                      {notif.bookingId && (
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => {
                              onSelectBooking(notif.bookingId!);
                              onClose();
                            }}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] rounded-xl flex items-center gap-1 shadow-2xs"
                          >
                            <span>Open Duty Lead</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200/80 p-6 space-y-2">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No notifications yet</p>
                  <p className="text-xs text-slate-500">
                    Whenever a new duty matches your saved filter criteria, an alert will appear here.
                  </p>
                  <button
                    onClick={onSimulateDutyMatch}
                    className="mt-2 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold"
                  >
                    Simulate Match Notification
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SAVED FILTER CRITERIA (DUTY RADAR) */}
          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              
              {/* Master Radar Toggle */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Duty Radar Notification Engine
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Automatically scan all incoming network bookings against your criteria
                  </div>
                </div>

                <button
                  onClick={() => setLocalCriteria((prev) => ({ ...prev, enabled: !prev.enabled }))}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    localCriteria.enabled ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* 1. Vehicle Categories to Track */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-amber-500" />
                    <span>Vehicle Categories to Track (गाड़ी की श्रेणियां)</span>
                  </label>
                  <button
                    onClick={() => {
                      if (!localCriteria.vehicleCategories.includes(userAttachedVehicleCategory)) {
                        setLocalCriteria((prev) => ({
                          ...prev,
                          vehicleCategories: [userAttachedVehicleCategory],
                        }));
                      } else {
                        setLocalCriteria((prev) => ({
                          ...prev,
                          vehicleCategories: VEHICLE_OPTIONS,
                        }));
                      }
                    }}
                    className="text-[11px] font-bold text-amber-600 hover:underline"
                  >
                    Match My Cab Only ({userAttachedVehicleCategory})
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VEHICLE_OPTIONS.map((cat) => {
                    const isSelected = localCriteria.vehicleCategories.includes(cat);
                    const isMyCab = cat === userAttachedVehicleCategory;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleVehicleCategory(cat)}
                        className={`p-2 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="truncate">
                          <span>{cat}</span>
                          {isMyCab && (
                            <span className="block text-[9px] text-amber-600 font-bold">
                              (Your Attached Cab)
                            </span>
                          )}
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Preferred Pickup Cities */}
              <div className="space-y-2">
                <label className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Preferred Pickup Hubs (पिकअप शहर)</span>
                </label>

                <div className="flex flex-wrap gap-1.5">
                  {COMMON_PICKUP_CITIES.map((city) => {
                    const isSelected = localCriteria.preferredPickupCities.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => togglePickupCity(city)}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                          isSelected
                            ? 'bg-rose-500 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {city} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Custom City input */}
                <form onSubmit={handleAddCustomCity} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={customCityInput}
                    onChange={(e) => setCustomCityInput(e.target.value)}
                    placeholder="Add other pickup city (e.g. Bareilly, Meerut)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* 3. Preferred Drop Destinations */}
              <div className="space-y-2">
                <label className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span>Preferred Drop Destinations (ड्रॉप शहर)</span>
                </label>

                <div className="flex flex-wrap gap-1.5">
                  {COMMON_DROP_CITIES.map((city) => {
                    const isSelected = localCriteria.preferredDropCities.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => toggleDropCity(city)}
                        className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {city} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Financial Thresholds (Min Fare & Min Commission) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Minimum Fare (न्यूनतम किराया)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      step="500"
                      value={localCriteria.minFare}
                      onChange={(e) =>
                        setLocalCriteria((prev) => ({ ...prev, minFare: Number(e.target.value) }))
                      }
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Minimum Commission (कमीशन)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      step="100"
                      value={localCriteria.minCommission}
                      onChange={(e) =>
                        setLocalCriteria((prev) => ({ ...prev, minCommission: Number(e.target.value) }))
                      }
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Notification Channels (Audio & Visual) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-extrabold text-slate-800 block">
                  Notification Delivery Channels
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">Visual Popups</div>
                      <div className="text-[10px] text-slate-500">In-app top banner</div>
                    </div>
                    <button
                      onClick={() =>
                        setLocalCriteria((prev) => ({
                          ...prev,
                          pushVisualsEnabled: !prev.pushVisualsEnabled,
                        }))
                      }
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        localCriteria.pushVisualsEnabled ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <span>Audio Chime</span>
                        <button
                          type="button"
                          onClick={handleTestSound}
                          className="text-[10px] text-amber-600 font-bold hover:underline"
                          title="Test chime sound"
                        >
                          (Test)
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500">Two-tone beep</div>
                    </div>
                    <button
                      onClick={() =>
                        setLocalCriteria((prev) => ({
                          ...prev,
                          soundEnabled: !prev.soundEnabled,
                        }))
                      }
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        localCriteria.soundEnabled ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Save & Test Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={handleSaveCriteria}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Save Saved Filter Criteria</span>
                </button>

                {saveSuccessMsg && (
                  <div className="text-center font-bold text-emerald-600 text-[11px] animate-in fade-in">
                    ✓ Notification criteria saved! Duty Radar will filter automatically.
                  </div>
                )}

                <button
                  type="button"
                  onClick={onSimulateDutyMatch}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Test Fire Simulated Match Notification</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
