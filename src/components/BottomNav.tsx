import React from 'react';
import { Store, CalendarDays, Plus, TrendingUp, Wrench, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPostModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenPostModal,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 shadow-lg px-1 py-1 max-w-lg mx-auto sm:rounded-t-2xl">
      <div className="flex items-center justify-between relative h-16">
        
        {/* Tab 1: Duty Hub */}
        <button
          onClick={() => setActiveTab('market')}
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors relative ${
            activeTab === 'market' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'market' && (
            <div className="absolute top-0 w-6 h-1 bg-amber-500 rounded-full" />
          )}
          <Store className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] truncate">Duty Hub</span>
        </button>

        {/* Tab 2: My Trips */}
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors relative ${
            activeTab === 'bookings' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'bookings' && (
            <div className="absolute top-0 w-6 h-1 bg-amber-500 rounded-full" />
          )}
          <CalendarDays className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] truncate">My Trips</span>
        </button>

        {/* Tab 3: (+) Center Floating Post Button */}
        <div className="flex-1 min-w-0 flex items-center justify-center -mt-4">
          <button
            onClick={onOpenPostModal}
            className="w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white flex items-center justify-center shadow-lg border-2 border-white transition-all transform"
            title="Post Duty or Khali Gaadi"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 4: Analytics (NEW!) */}
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors relative ${
            activeTab === 'analytics' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'analytics' && (
            <div className="absolute top-0 w-6 h-1 bg-amber-500 rounded-full" />
          )}
          <div className="relative">
            <TrendingUp className="w-4.5 h-4.5 mb-0.5" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-500 ring-1 ring-white" />
          </div>
          <span className="text-[10px] truncate">Analytics</span>
        </button>

        {/* Tab 5: Driver Hub */}
        <button
          onClick={() => setActiveTab('driver')}
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors relative ${
            activeTab === 'driver' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'driver' && (
            <div className="absolute top-0 w-6 h-1 bg-amber-500 rounded-full" />
          )}
          <div className="relative">
            <Wrench className="w-4.5 h-4.5 mb-0.5" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
          </div>
          <span className="text-[10px] truncate">Driver Hub</span>
        </button>

        {/* Tab 6: Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 transition-colors relative ${
            activeTab === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'profile' && (
            <div className="absolute top-0 w-6 h-1 bg-amber-500 rounded-full" />
          )}
          <User className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] truncate">Profile</span>
        </button>

      </div>
    </div>
  );
};
