import React from 'react';
import { Hash, LogOut, Settings } from 'lucide-react';

const ChatHeader = ({ nickname, partner, onLogout }) => (
  <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
    <div className="flex items-center gap-3">
      <div className="bg-indigo-600 p-2 rounded-lg">
        <Hash size={20} className="text-white" />
      </div>
      <div>
        <h2 className="font-bold text-white text-sm">
          {partner ? partner.nickname : 'Halaman Utama'}
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Sistem Aktif</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end mr-2">
        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Akun Anda</span>
        <span className="text-xs font-bold text-indigo-400">{nickname}</span>
      </div>
      <button className="p-2 hover:bg-slate-800 text-slate-400 rounded-full transition-all">
        <Settings size={20} />
      </button>
      <button onClick={onLogout} className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-full transition-all">
        <LogOut size={20} />
      </button>
    </div>
  </header>
);

export default ChatHeader;
