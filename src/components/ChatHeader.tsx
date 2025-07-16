import React from 'react';
import { Brain, Trash2, Zap, Activity } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, messageCount }) => {
  return (
    <div className="relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 opacity-50 animate-pulse"></div>
      
      <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white/30 shadow-lg">
              <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"></div>
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                ArdynIQ
              </span>
              <div className="flex items-center space-x-1">
                <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
            </h1>
            <p className="text-white/70 text-sm font-medium">
              {messageCount > 0 ? (
                <span className="flex items-center space-x-2">
                  <span>{messageCount} conversations</span>
                  <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                  <span>AI Ready</span>
                </span>
              ) : (
                'Advanced AI Intelligence • Ready to Assist'
              )}
            </p>
          </div>
        </div>
        
        {messageCount > 0 && (
          <button
            onClick={onClearChat}
            className="group p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 shadow-lg"
            title="Clear conversation"
          >
            <Trash2 className="w-5 h-5 text-white/80 group-hover:text-red-300 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};