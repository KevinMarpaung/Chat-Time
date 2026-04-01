import React from 'react';

const MessageBubble = ({ message, isMe }) => {
  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4`}>
      {!isMe && <span className="text-[10px] text-slate-500 ml-2 mb-1">{message.sender}</span>}
      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
        isMe 
          ? 'bg-indigo-600 text-white rounded-tr-none' 
          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
      }`}>
        {message.text}
      </div>
      <span className="text-[9px] text-slate-600 mt-1 px-1">{message.time}</span>
    </div>
  );
};

export default MessageBubble;
