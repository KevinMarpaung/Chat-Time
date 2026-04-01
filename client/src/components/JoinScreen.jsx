import React, { useState } from 'react';
import { Shield, ArrowRight, User, Mail, Lock, ChevronLeft } from 'lucide-react';

const JoinScreen = ({ onJoinAction }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleStartChat = () => {
    if (nickname.trim().length < 3) {
      setError('Nama samaran minimal terdiri dari 3 karakter.');
      return;
    }
    setError('');
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Kata sandi minimal terdiri dari 6 karakter.');
      return;
    }
    onJoinAction(isSignUp, email, password, nickname);
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans">
        <div className="w-full max-w-md bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl rotate-6">
                <Shield size={48} className="text-white -rotate-6" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Chat-Time</h1>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Berkomunikasi secara bebas tanpa identitas asli. <br/> Cepat, Aman, dan Anonim.
              </p>
              <div className="w-full space-y-2 text-left mb-6">
                <label className="text-xs font-medium text-slate-500 ml-1 uppercase">Pilih Nama Samaran Anda</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="text" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Contoh: KucingOren"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                {error && <p className="text-red-400 text-xs ml-1 font-medium italic">*{error}</p>}
              </div>
              <button onClick={handleStartChat} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                Mulai Percakapan <ArrowRight size={22} />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-600 uppercase tracking-[0.2em] font-bold">Privasi Terjamin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
        <button onClick={() => setShowForm(false)} className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-sm">
          <ChevronLeft size={18} /> Kembali
        </button>
        <div className="mt-8 flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Daftar Akun' : 'Masuk Kembali'}</h2>
          <p className="text-slate-400 text-xs mt-1">Halo <span className="text-indigo-400 font-bold">{nickname}</span>, silakan lengkapi data Anda.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@anda.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400 ml-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
          </div>
          {error && <p className="text-red-400 text-[11px] ml-1 font-medium italic">*{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 mt-2">
            {isSignUp ? 'Daftar Sekarang' : 'Masuk ke Chat'}
          </button>
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-xs text-indigo-400 hover:underline mt-2">
            {isSignUp ? 'Sudah memiliki akun? Silakan masuk' : 'Belum memiliki akun? Daftar di sini'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinScreen;
