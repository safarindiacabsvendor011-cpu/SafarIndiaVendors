import React from 'react';
import { Headphones, Bell, LogOut, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenHelp: () => void;
  onOpenChats: () => void;
  onOpenNotifications: () => void;
  alertsEnabled: boolean;
  setAlertsEnabled: (val: boolean) => void;
  activeTab: string;
  onLogout?: () => void;
  unreadCount?: number;
  notificationUnreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHelp,
  onOpenChats,
  onOpenNotifications,
  alertsEnabled,
  setAlertsEnabled,
  activeTab,
  onLogout,
  unreadCount = 1,
  notificationUnreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-xs px-3.5 py-2.5 flex items-center justify-between">
      
      {/* Left side: Brand or Tab Title */}
      {activeTab === 'market' ? (
        <div className="flex items-center gap-2">
          <img
            src="/assets/aistudio/IMG-20261029-WA0001_67f0d119.jpg"
            alt="Safar India Cabs Logo"
            className="w-9 h-9 object-contain rounded-xl p-0.5 border border-amber-200/60 shadow-xs bg-white"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                Safar<span className="text-amber-500">India</span>Cabs
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block -mt-0.5">
              Duty Mandi & Network
            </span>
          </div>
        </div>
      ) : activeTab === 'bookings' ? (
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold text-slate-900">My Trips & Duties</h1>
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold text-slate-900">Vendor Analytics & Yield</h1>
        </div>
      ) : activeTab === 'driver' ? (
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold text-slate-900">Driver Suvidha Hub</h1>
        </div>
      ) : activeTab === 'chat' ? (
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold text-slate-900">Agent Chats & Escrow</h1>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Right side: Notification Bell, Chat Button, Alerts toggle & Help Button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Notification Center Bell Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Notification Center & Duty Radar"
        >
          <Bell className="w-4 h-4 text-slate-700" />
          {notificationUnreadCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-4 text-[10px] rounded-full bg-rose-500 text-white font-mono font-black flex items-center justify-center ring-2 ring-white shadow-xs">
              {notificationUnreadCount}
            </span>
          )}
        </button>

        {/* Quick Chat Header Shortcut */}
        <button
          onClick={onOpenChats}
          className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Agent Messages & Escrow"
        >
          <MessageSquare className="w-4 h-4 text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
          )}
        </button>

        {activeTab === 'market' && (
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-200/60">
            <span className="text-[11px] font-semibold text-slate-600">Alerts</span>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                alertsEnabled ? 'bg-amber-500 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm transform transition-transform" />
            </button>
          </div>
        )}

        <button
          onClick={onOpenHelp}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors border border-rose-100"
        >
          <Headphones className="w-3.5 h-3.5 text-rose-500" />
          <span>Help</span>
        </button>
      </div>

    </header>
  );
};
