import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message, ChatSession } from '../types';
import { generateChatResponse, generateImage } from '../services/geminiService';

interface ChatInterfaceProps {
  session: ChatSession;
  onUpdateMessages: (messages: Message[]) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ session, onUpdateMessages }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [renderLimit, setRenderLimit] = useState(30); 
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const visibleMessages = useMemo(() => {
    if (session.messages.length <= renderLimit) return session.messages;
    return session.messages.slice(-renderLimit);
  }, [session.messages, renderLimit]);

  const hasMoreMessages = session.messages.length > renderLimit;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isLoading]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 300);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLoadMore = () => {
    setRenderLimit(prev => prev + 30);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      type: 'text'
    };

    const updatedMessages = [...session.messages, userMessage];
    onUpdateMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const isImageRequest = input.toLowerCase().startsWith('/image');
      
      if (isImageRequest) {
        const prompt = input.replace(/^\/image\s*/i, '');
        const imageUrl = await generateImage(prompt);
        if (imageUrl) {
          const imageMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Visual synthesis complete for task: "${prompt}"`,
            timestamp: Date.now(),
            type: 'image',
            imageUrl
          };
          onUpdateMessages([...updatedMessages, imageMsg]);
        } else {
          throw new Error('Image generation failed');
        }
      } else {
        const history = updatedMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
          parts: [{ text: msg.content }]
        }));
        
        const responseText = await generateChatResponse(input, history);
        
        if (responseText?.includes('[IMAGE_GEN]')) {
          const description = responseText.replace('[IMAGE_GEN]', '').trim();
          const imageUrl = await generateImage(description);
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseText.replace('[IMAGE_GEN]', ''),
            timestamp: Date.now(),
            type: imageUrl ? 'image' : 'text',
            imageUrl: imageUrl || undefined
          };
          onUpdateMessages([...updatedMessages, aiMsg]);
        } else {
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseText || 'System recalibration required. Please retry.',
            timestamp: Date.now(),
            type: 'text'
          };
          onUpdateMessages([...updatedMessages, aiMsg]);
        }
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Structural Error: Response synthesis interrupted. Verify network parity.',
        timestamp: Date.now(),
        type: 'text'
      };
      onUpdateMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `tipde-ai-synthesis-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative bg-slate-900 border-x border-slate-800/30">
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-12 custom-scrollbar"
      >
        {session.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-20 opacity-80 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 animate-pulse border border-blue-500/20 shadow-2xl">
               <i className="fas fa-microchip text-4xl"></i>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight">System Core Ready</h3>
              <p className="max-w-md text-slate-500 mt-3 text-lg font-medium leading-relaxed">
                Experience the 2026 professional neural interface. Use <code className="text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg">/image</code> for high-fidelity visualization.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
               <button onClick={() => setInput('Explain the multi-modal transformer architecture of 2026')} className="p-6 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-3xl text-left text-sm text-slate-400 transition-all shadow-sm">
                 "Explain multi-modal transformer architecture..."
               </button>
               <button onClick={() => setInput('/image A futuristic research lab specializing in neural synthesis')} className="p-6 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-3xl text-left text-sm text-slate-400 transition-all shadow-sm">
                 "/image Futuristic neural research lab"
               </button>
            </div>
          </div>
        )}

        {hasMoreMessages && (
          <div className="flex justify-center pb-8">
             <button 
               onClick={handleLoadMore}
               className="px-8 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-700 transition-all hover:text-slate-300"
             >
               Load Contextual History
             </button>
          </div>
        )}

        {visibleMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group items-start gap-5 animate-fade-in`}
          >
            {msg.role === 'assistant' && (
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-blue-500 border border-slate-700/50 shadow-lg shrink-0 mt-1">
                 <i className="fas fa-terminal text-lg"></i>
              </div>
            )}
            <div className={`relative max-w-[85%] md:max-w-[72%] rounded-[2.2rem] px-7 py-6 shadow-2xl transition-all ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none border border-blue-500/50' 
                : 'bg-slate-800/90 border border-slate-700/40 rounded-tl-none backdrop-blur-md'
            }`}>
              <div className="text-[16px] whitespace-pre-wrap leading-[1.8] font-medium tracking-normal">
                {msg.content}
              </div>
              
              {msg.type === 'image' && msg.imageUrl && (
                <div className="mt-6 relative group/img overflow-hidden rounded-3xl border border-slate-700/50 shadow-inner bg-slate-900">
                  <img 
                    src={msg.imageUrl} 
                    alt="AI Synthesis" 
                    loading="lazy"
                    className="w-full h-auto cursor-zoom-in group-hover/img:scale-[1.02] transition-transform duration-700 ease-out"
                    onClick={() => window.open(msg.imageUrl, '_blank')}
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center gap-5 backdrop-blur-sm">
                    <button 
                      onClick={() => downloadImage(msg.imageUrl!)}
                      className="w-16 h-16 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                    >
                      <i className="fas fa-download text-2xl"></i>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-5 gap-6">
                 <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-600'}`}>
                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SYNCED
                 </div>
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                   {msg.role === 'assistant' && (
                     <button 
                       onClick={() => copyToClipboard(msg.content, msg.id)}
                       className="text-slate-500 hover:text-white transition-colors p-2.5 hover:bg-slate-700/50 rounded-xl"
                     >
                       <i className={`fas ${copiedId === msg.id ? 'fa-check text-emerald-500' : 'fa-copy'} text-xs`}></i>
                     </button>
                   )}
                 </div>
              </div>
            </div>
            {msg.role === 'user' && (
               <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/10 shadow-lg shrink-0 mt-1">
                 <i className="fas fa-user-shield text-lg"></i>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-start gap-5 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500 border border-slate-700/50 shrink-0 mt-1">
              <i className="fas fa-circle-notch fa-spin text-lg"></i>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/30 rounded-[2.2rem] rounded-tl-none px-10 py-6 flex items-center gap-5 backdrop-blur-sm">
              <span className="text-xs font-black text-slate-500 tracking-[0.3em] uppercase">Orchestrating Logic...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-8" />
      </div>

      {showScrollButton && (
        <button 
          onClick={scrollToBottom}
          className="fixed bottom-32 right-8 md:right-12 w-14 h-14 bg-slate-800/80 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md transition-all border border-slate-700 animate-in fade-in zoom-in z-30"
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      )}

      <div className="p-6 md:p-8 border-t border-slate-800/50 bg-slate-900/98 backdrop-blur-2xl sticky bottom-0 z-20">
        <form onSubmit={handleSubmit} className="flex items-end gap-5 max-w-4xl mx-auto relative">
          <div className="flex-1 relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder="Query System Interface..."
              className="w-full bg-slate-800/40 border border-slate-700/60 rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all resize-none min-h-[72px] max-h-56 font-medium text-[16px] placeholder:text-slate-600 shadow-inner scrollbar-hide"
              rows={1}
            />
          </div>
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-16 h-16 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800/50 disabled:text-slate-700 text-white rounded-[1.5rem] transition-all shadow-2xl flex items-center justify-center group shrink-0 active:scale-90 border border-blue-400/20"
          >
            <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-arrow-up'} text-2xl group-hover:-translate-y-0.5 transition-transform`}></i>
          </button>
        </form>
        <div className="mt-5 text-[10px] text-center text-slate-700 font-black uppercase tracking-[0.4em] flex items-center justify-center gap-6">
          <span className="h-[1px] bg-slate-800/50 flex-1"></span>
          Tipde AI v2.6.0 PRO
          <span className="h-[1px] bg-slate-800/50 flex-1"></span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;