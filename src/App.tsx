import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { TypingIndicator } from './components/TypingIndicator';
import { GeminiApiService } from './services/geminiApi';
import { Message, ChatState } from './types/chat';
import { Brain, AlertCircle, Sparkles, Zap, Stars } from 'lucide-react';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await GeminiApiService.generateResponse(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get response',
      }));
    }
  };

  const handleClearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  };

  const dismissError = () => {
    setChatState(prev => ({ ...prev, error: null }));
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden fixed inset-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative w-full h-full flex flex-col backdrop-blur-sm">
        <ChatHeader 
          onClearChat={handleClearChat}
          messageCount={chatState.messages.length}
        />
        
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8"
        >
          {chatState.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center relative">
              {/* Welcome animation */}
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl border border-white/20">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Welcome to ArdynIQ
              </h2>
              <p className="text-white/70 max-w-2xl text-lg leading-relaxed mb-8">
                Experience the future of AI conversation. ArdynIQ combines advanced intelligence with intuitive design to provide you with powerful, contextual assistance.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Advanced AI</h3>
                  <p className="text-white/60 text-sm">Powered by cutting-edge language models for intelligent responses</p>
                </div>
                
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-white/60 text-sm">Optimized for speed with real-time response generation</p>
                </div>
                
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Stars className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Premium Experience</h3>
                  <p className="text-white/60 text-sm">Beautiful interface designed for productivity and enjoyment</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {chatState.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {chatState.isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </>
          )}
          
          {chatState.error && (
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 rounded-3xl shadow-2xl">
              <AlertCircle className="w-6 h-6 text-red-300 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-200 font-medium">{chatState.error}</p>
              </div>
              <button
                onClick={dismissError}
                className="text-red-300 hover:text-red-200 transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20"
              >
                ×
              </button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={chatState.isLoading}
        />
        
        {/* Footer with creator attribution */}
        <div className="relative border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-indigo-950/90 to-slate-950/95 backdrop-blur-xl"></div>
          <div className="relative px-6 py-4 text-center">
            <p className="text-white/50 text-sm font-medium">
              Built with ❤️ by{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                Ardyn (Amit)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;