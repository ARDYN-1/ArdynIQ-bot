import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Share2, Smile, Command, Zap, Mic, MicOff, Image, FolderOpen, ChevronDown, FileText, Video, Music } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Here you can handle the audio file
        console.log('Audio recorded:', audioBlob);
        console.log('Audio URL:', audioUrl);
        
        // You can add logic to convert speech to text or send audio
        // For now, we'll add a message indicating audio was recorded
        onSendMessage(`🎤 Audio message recorded (${(audioBlob.size / 1024).toFixed(1)} KB)`);
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileShare = (file: File, fileType: string) => {
    if (file) {
      const fileSize = (file.size / 1024).toFixed(1);
      
      let emoji = '📄';
      if (file.type.startsWith('image/')) emoji = '📸';
      else if (file.type.startsWith('video/')) emoji = '🎥';
      else if (file.type.startsWith('audio/')) emoji = '🎵';
      else if (file.type.includes('pdf')) emoji = '📕';
      else if (file.type.includes('document') || file.type.includes('word')) emoji = '📝';
      
      // Add message with file info
      onSendMessage(`${emoji} File shared: ${file.name} (${fileSize} KB)`);
    }
  };

  const quickPrompts = [
    "Explain quantum computing",
    "Write a creative story",
    "Help with coding",
    "Plan my day"
  ];

  return (
    <div className="relative">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-indigo-950/95 to-slate-950/98 backdrop-blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Quick prompts */}
        {message === '' && !isFocused && (
          <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setMessage(prompt)}
                className="px-4 py-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-indigo-600/40 hover:to-purple-600/40 backdrop-blur-sm border border-white/10 hover:border-indigo-400/30 rounded-2xl text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/20"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          {/* Enhanced input container */}
          <div className="flex-1 relative group">
            <div className={`relative transition-all duration-300 ${
              isFocused 
                ? 'transform scale-[1.02] shadow-2xl shadow-indigo-500/20' 
                : 'shadow-xl'
            }`}>
              {/* Input glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl transition-opacity duration-300 ${
                isFocused ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
                {/* Top border highlight */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent transition-opacity duration-300 ${
                  isFocused ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <div className="flex items-end">
                  {/* Left action buttons */}
                  <div className="flex items-center space-x-1 p-3">
                    {/* Audio Recording Button */}
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2.5 rounded-xl transition-all duration-200 group/btn hover:scale-110 ${
                        isRecording 
                          ? 'bg-red-500/20 hover:bg-red-500/30' 
                          : 'hover:bg-white/10'
                      }`}
                      title={isRecording ? "Stop recording" : "Record audio"}
                      disabled={isLoading}
                    >
                      {isRecording ? (
                        <MicOff className="w-4 h-4 text-red-400 animate-pulse" />
                      ) : (
                        <Mic className="w-4 h-4 text-white/60 group-hover/btn:text-blue-400 transition-colors" />
                      )}
                    </button>

                    {/* Simple File Upload Button */}
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="*/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileShare(file, 'File');
                          }
                          e.target.value = ''; // Reset input
                        }}
                        title="Upload file"
                      />
                      <button
                        type="button"
                        className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group/btn hover:scale-110 z-10"
                        title="Upload file"
                      >
                        <Share2 className="w-4 h-4 text-white/60 group-hover/btn:text-green-400 transition-colors" />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group/btn hover:scale-110"
                      title="Emoji"
                    >
                      <Smile className="w-4 h-4 text-white/60 group-hover/btn:text-yellow-400 transition-colors" />
                    </button>
                  </div>
                  
                  {/* Enhanced textarea */}
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask ArdynIQ anything... (Press Enter to send, Shift+Enter for new line)"
                    className="flex-1 min-h-[56px] max-h-40 px-4 py-4 bg-transparent text-white placeholder-white/40 focus:outline-none resize-none font-medium text-base leading-relaxed"
                    disabled={isLoading}
                    rows={1}
                  />
                  
                  {/* Character count and shortcuts */}
                  <div className="flex flex-col items-end justify-end p-3 space-y-2">
                    {message.length > 0 && (
                      <div className="text-xs text-white/40 font-medium">
                        {message.length}/2000
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-white/30">
                      <Command className="w-3 h-3" />
                      <span>Enter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced send button */}
          <div className="relative">
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/20 overflow-hidden group ${
                !message.trim() || isLoading
                  ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/50 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 hover:scale-110 hover:shadow-indigo-500/30 cursor-pointer'
              }`}
            >
              {/* Button glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 blur-xl transition-opacity duration-300 ${
                message.trim() && !isLoading ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <div className="relative">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                    <div className="absolute inset-0 w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="relative">
                    <Send className="w-6 h-6 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {message.trim() && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
                        <Zap className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
            </button>
          </div>
        </form>
        
        {/* Status indicator */}
        <div className="flex items-center justify-center space-x-2 text-xs text-white/40">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isRecording ? 'bg-red-400' : 'bg-green-400'
          }`}></div>
          <span className="font-medium">
            {isRecording ? 'Recording audio...' : 'ArdynIQ is ready to assist'}
          </span>
          {!isRecording && (
            <>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span>Powered by Gemini 2.0</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};