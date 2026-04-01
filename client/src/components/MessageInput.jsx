import React, { useState } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };
  return (
    <footer className="p-4 bg-slate-900 border-t border-slate-800">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-5xl mx-auto">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik pesan anonim..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
          <Send size={20} />
        </button>
      </form>
    </footer>
  );
};

export default MessageInput;
