import React from 'react';
import { Search, Users, Compass, ChevronRight } from 'lucide-react';

const UserSidebar = ({ users, onSelectUser, currentUserNickname, onStartFinding }) => {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl">
      {/* Profile Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            {currentUserNickname.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-white truncate max-w-[120px]">{currentUserNickname}</span>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <Users size={18} />
        </button>
      </div>

      {/* Main Actions */}
      <div className="p-4 space-y-2">
        <button 
          onClick={onStartFinding}
          className="w-full flex items-center justify-between px-4 py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-600/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Compass size={20} />
            <span className="text-sm font-bold">Cari Partner</span>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Friends / Online Users */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pengguna Aktif</p>
          <Search size={14} className="text-slate-600" />
        </div>
        <div className="space-y-1">
          {users.filter(u => u.nickname !== currentUserNickname).map((u, i) => (
            <div 
              key={i} 
              onClick={() => onSelectUser(u)}
              className="flex items-center gap-3 px-3 py-3 hover:bg-slate-800/50 rounded-2xl cursor-pointer transition-all group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 font-bold group-hover:border-indigo-500 transition-colors">
                  {u.nickname.charAt(0).toUpperCase()}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-slate-900 rounded-full ${u.status === 'online' ? 'bg-green-500' : 'bg-slate-600'}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 font-medium truncate">{u.nickname}</p>
                <p className="text-[10px] text-slate-500 truncate italic">Klik untuk mengobrol</p>
              </div>
            </div>
          ))}
          {users.length <= 1 && (
            <p className="text-xs text-slate-600 text-center py-10 italic">Belum ada orang lain yang aktif.</p>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-slate-900/50 border-t border-slate-800">
        <p className="text-[9px] text-slate-600 leading-relaxed">
          Percakapan Anda aman dan anonim. Gunakan fitur cari untuk menemukan teman baru.
        </p>
      </div>
    </aside>
  );
};

export default UserSidebar;
