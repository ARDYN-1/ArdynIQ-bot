import React from 'react';
import { Brain } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 relative">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl border border-white/20 animate-pulse">
          <Brain className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-white/10 rounded-3xl px-6 py-4 shadow-2xl">
        <div className="flex items-center space-x-2">
          <span className="text-white/70 text-sm font-medium mr-2">ArdynIQ is thinking</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};