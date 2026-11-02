import React from 'react';
import { X, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';
import { Duty, EmptyCar } from '../types';
import { generateDutyWhatsAppText, generateEmptyCarWhatsAppText } from '../utils/formatters';

interface WhatsAppShareModalProps {
  item: { type: 'duty'; data: Duty } | { type: 'empty'; data: EmptyCar } | null;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({ item, onClose, lang }) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const textToShare = item.type === 'duty' 
    ? generateDutyWhatsAppText(item.data) 
    : generateEmptyCarWhatsAppText(item.data);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(textToShare);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-slate-100">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {lang === 'en' ? 'Share to WhatsApp Groups' : 'व्हाट्सएप ग्रुप्स में शेयर करें'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Pre-formatted B2B operator broadcast text' : 'ऑपरेटर फॉर्मेट में तैयार व्हाट्सएप मैसेज'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatted Text Box */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300/90 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto selection:bg-emerald-500/30">
            {textToShare}
          </pre>
        </div>

        {/* Action buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Message</span>
              </>
            )}
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
