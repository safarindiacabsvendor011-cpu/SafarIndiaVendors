import React from 'react';
import { 
  Send, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  ArrowLeft, 
  Phone, 
  MessageCircle,
  Car
} from 'lucide-react';
import { ChatThread, ChatMessage } from '../types';

interface ChatTabProps {
  chatThreads: ChatThread[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  onSendMessage: (threadId: string, text: string) => void;
  onPayCommissionFromChat: (thread: ChatThread) => void;
  onSendCommissionOffer: (threadId: string, amount: number) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  chatThreads,
  activeChatId,
  setActiveChatId,
  onSendMessage,
  onPayCommissionFromChat,
  onSendCommissionOffer,
}) => {
  const [chatType, setChatType] = React.useState<'posted' | 'received'>('received');
  const [inputText, setInputText] = React.useState('');

  const filteredThreads = chatThreads.filter((t) => t.type === chatType);
  const activeThread = chatThreads.find((t) => t.id === activeChatId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  const quickReplies = [
    'Car is ready at pickup location',
    'AC full working, boot space clean',
    'Please send commission link to confirm deal',
  ];

  // If in detailed chat thread view
  if (activeThread) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs pb-16">
        
        {/* Thread Header */}
        <div className="p-3 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveChatId(null)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="font-bold text-xs text-slate-900 leading-tight">
                {activeThread.otherPartyName}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {activeThread.bookingTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              activeThread.isCommissionPaid 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {activeThread.isCommissionPaid ? 'Ride Secured' : 'Discussing'}
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {/* Security Banner */}
          <div className="p-2.5 bg-blue-50/80 border border-blue-200/60 rounded-xl text-center text-xs text-blue-900 space-y-0.5">
            <div className="font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>SafarIndiaCabs Secure Mediator Escrow</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Never pay commission directly to unknown persons. Pay through company escrow to guarantee 100% refund on cancellations.
            </p>
          </div>

          {activeThread.messages.map((msg) => {
            const isMe = msg.senderId === 'user-self';
            const isSystem = msg.senderId === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{msg.senderName}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{msg.text}</p>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? 'bg-amber-500 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Interactive Commission Link card if offered */}
                  {msg.isCommissionOffer && (
                    <div className="mt-2.5 p-2.5 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                      <div className="flex justify-between items-center text-[11px] text-amber-400 font-bold">
                        <span>Commission Deal Confirmation</span>
                        <span>₹{msg.commissionAmount}</span>
                      </div>
                      <p className="text-[10px] text-slate-300">
                        Company mediator holds ₹{msg.commissionAmount} safely. Unlocks client details instantly.
                      </p>

                      {activeThread.isCommissionPaid ? (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold pt-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Commission Paid & Lead Secured</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onPayCommissionFromChat(activeThread)}
                          className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay ₹{msg.commissionAmount} & Secure Ride</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Quick replies bar */}
        <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => onSendMessage(activeThread.id, qr)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white shadow-xs transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    );
  }

  // Threads List View
  return (
    <div className="space-y-4 pb-20">
      
      {/* 1. Sub Tabs: Posted | Received */}
      <div className="bg-slate-100 p-1.5 rounded-full flex items-center justify-between gap-1 shadow-inner max-w-md mx-auto">
        <button
          onClick={() => setChatType('posted')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            chatType === 'posted'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Posted
        </button>

        <button
          onClick={() => setChatType('received')}
          className={`flex-1 py-2 text-xs font-bold rounded-full transition-all text-center ${
            chatType === 'received'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Received
        </button>
      </div>

      {/* Threads List */}
      <div className="space-y-2.5">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveChatId(thread.id)}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-2 shadow-xs hover:border-amber-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {thread.otherPartyName}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    {thread.bookingTitle}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono">{thread.lastTimestamp}</span>
                  {thread.unreadCount > 0 && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 ml-auto mt-1" />
                  )}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 text-xs text-slate-600 truncate border border-slate-100 flex items-center justify-between">
                <span className="truncate mr-2">{thread.lastMessage}</span>
                <span className="font-bold text-amber-600 shrink-0 font-mono">
                  Com: ₹{thread.commissionAmount}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2">
            <p className="text-sm font-bold text-slate-700">No active chats in this section</p>
            <p className="text-xs text-slate-500">
              Click the "Chat" button on any booking card in the Market to start chatting with an agent.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
