import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { User, Compass, Users, Shield, ArrowRight, Heart, Filter } from 'lucide-react';

import JoinScreen from './components/JoinScreen';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import UserSidebar from './components/UserSidebar';

const socket = io.connect("http://localhost:3001");

export default function App() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [chatPartner, setChatPartner] = useState(null);
  const [messages, setMessages] = useState({}); // { socketId: [messages] }
  const [isSearching, setIsSearching] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("update_user_list", (users) => setAllUsers(users));

    socket.on("receive_private_message", (data) => {
      setMessages((prev) => ({
        ...prev,
        [data.sender.socketId]: [...(prev[data.sender.socketId] || []), data]
      }));
    });

    socket.on("auth_success", (userData) => {
      setUser(userData);
      socket.emit("join_room", userData.nickname);
    });

    socket.on("auth_error", (errMsg) => alert(errMsg));

    return () => {
      socket.off("update_user_list");
      socket.off("receive_private_message");
      socket.off("auth_success");
      socket.off("auth_error");
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, chatPartner]);

  const handleJoinAction = (isSignUp, email, password, nickname) => {
    socket.emit("authenticate", { isSignUp, email, password, nickname });
  };

  const handleStartSearching = () => {
    setIsSearching(true);
    setChatPartner(null);
    // Simulasi mencari partner
    setTimeout(() => {
      const others = allUsers.filter(u => u.nickname !== user.nickname);
      if (others.length > 0) {
        const random = others[Math.floor(Math.random() * others.length)];
        setChatPartner(random);
      } else {
        alert("Maaf, saat ini belum ada partner yang tersedia.");
      }
      setIsSearching(false);
    }, 2500);
  };

  const handleSend = (text) => {
    if (!chatPartner) return;
    const messageData = { 
      id: Date.now(), 
      text, 
      sender: { nickname: user.nickname, socketId: socket.id }, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => ({
      ...prev,
      [chatPartner.socketId]: [...(prev[chatPartner.socketId] || []), messageData]
    }));

    socket.emit("private_message", { 
      to: chatPartner.socketId, 
      message: text, 
      from: { nickname: user.nickname, socketId: socket.id } 
    });
  };

  if (!user) return <JoinScreen onJoinAction={handleJoinAction} />;

  const currentChatMessages = messages[chatPartner?.socketId] || [];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-100 selection:bg-indigo-500/30">
      <UserSidebar 
        users={allUsers} 
        onSelectUser={setChatPartner} 
        currentUserNickname={user.nickname} 
        onStartFinding={handleStartSearching}
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative bg-[url('[https://www.transparenttextures.com/patterns/dark-matter.png](https://www.transparenttextures.com/patterns/dark-matter.png)')]">
        <ChatHeader 
          nickname={user.nickname} 
          partner={chatPartner} 
          onLogout={() => window.location.reload()} 
        />
        
        <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-10">
          {!chatPartner && !isSearching ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <div className="relative w-32 h-32 bg-slate-900 border border-slate-800 rounded-[3rem] flex items-center justify-center rotate-12 shadow-2xl">
                  <Compass size={64} className="text-indigo-400 -rotate-12" />
                </div>
              </div>
              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Temukan Teman Chat</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto mb-12 leading-relaxed">
                Ngobrol santai, aman, dan seru dengan partner anonim dari seluruh dunia.
              </p>
              
              <button 
                onClick={handleStartSearching}
                className="group relative px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-xl transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 flex items-center gap-3"
              >
                MULAI MENCARI
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-16 flex items-center gap-8 text-slate-500">
                <div className="flex flex-col items-center gap-2">
                  <Filter size={20} className="text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Preferensi</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users size={20} className="text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Semua Orang</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Heart size={20} className="text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Minat Sama</span>
                </div>
              </div>
            </div>
          ) : isSearching ? (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-pulse">
              <div className="w-24 h-24 border-4 border-indigo-600/30 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Mencari Partner...</h3>
                <p className="text-slate-500 text-sm italic">Mohon tunggu sebentar, sistem sedang memasangkan Anda.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {currentChatMessages.length === 0 && (
                <div className="flex justify-center my-10">
                  <span className="bg-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] px-6 py-2 rounded-full border border-slate-700 font-bold">
                    Awal Percakapan dengan {chatPartner.nickname}
                  </span>
                </div>
              )}
              {currentChatMessages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} isMe={msg.sender.nickname === user.nickname} />
              ))}
            </div>
          )}
        </main>

        {chatPartner && !isSearching && <MessageInput onSend={handleSend} />}
      </div>
    </div>
  );
}
