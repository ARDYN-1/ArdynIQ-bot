import React, { useState } from 'react';
import { Copy, Check, Brain, User, Sparkles } from 'lucide-react';
import { Message } from '../types/chat';
import { formatTime } from '../utils/formatTime';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className={`flex items-start space-x-4 group ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl border border-white/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border border-white/30">
            <Sparkles className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
          </div>
        </div>
      )}
      
      <div className={`max-w-xs sm:max-w-md lg:max-w-2xl ${message.isUser ? 'order-first' : ''}`}>
        <div className={`relative rounded-3xl px-6 py-4 shadow-2xl backdrop-blur-sm border ${
          message.isUser 
            ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-white/20' 
            : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-white border-white/10'
        }`}>
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed font-medium">
            {message.content}
          </div>
          
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm border border-white/10"
            title="Copy message"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-300" />
            ) : (
              <Copy className="w-4 h-4 text-white/70" />
            )}
          </button>
        </div>
        
        <div className={`text-xs text-white/50 mt-2 font-medium ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {message.isUser && (
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-xl border border-white/20">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border border-white/30"></div>
        </div>
      )}
    </div>
  );
};