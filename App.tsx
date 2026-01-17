
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Generate from './pages/Generate';
import { Sparkles, MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Identity confirmed. Welcome to AetherFlow. How can I assist your neural exploration today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User Query: ${userMessage}
        Current Platform: AetherFlow (Neural Media Ecosystem 2050)
        Context: The user is browsing a futuristic video platform. 
        Tone: Cyberpunk, helpful, highly technical but concise.
        Current Location: ${location.pathname}`,
        config: {
          systemInstruction: "You are the AetherFlow Neural Guide. You assist users in navigating the mesh and understanding futuristic concepts. Keep responses under 50 words."
        }
      });
      
      setChatHistory(prev => [...prev, { role: 'ai', text: response.text || 'Signal lost. Please re-transmit.' }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Uplink failure. Check your neural bandwidth.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050505] text-white">
      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onToggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/generate" element={<Generate />} />
          </Routes>

          {/* Neural Guide Interface */}
          {isGuideOpen && (
            <div className="fixed bottom-24 right-8 w-96 h-[500px] glass rounded-3xl border border-cyan-500/30 flex flex-col z-[150] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase">Neural_Guide_v4</span>
                </div>
                <button onClick={() => setIsGuideOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/20">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[11px] font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-tr-none' 
                        : 'bg-white/5 text-zinc-300 border border-white/5 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 px-4 py-2 rounded-2xl rounded-tl-none border border-white/5">
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/40">
                <div className="relative flex items-center">
                  <input 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Input thought vector..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/50 transition-all pr-12"
                  />
                  <button type="submit" className="absolute right-2 p-1.5 text-cyan-400 hover:scale-110 transition-transform">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Neural Guide Floating Toggle */}
          <button 
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className={`fixed bottom-8 right-8 z-[100] group transition-all duration-500 ${isGuideOpen ? 'scale-0' : 'scale-100'}`}
          >
            <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative glass p-4 rounded-full border border-cyan-500/30 group-hover:scale-110 transition-all shadow-2xl">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-cyan-400 group-hover:animate-spin-slow" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
            </div>
            <div className="absolute right-20 bottom-0 bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-all -translate-y-2 pointer-events-none whitespace-nowrap">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">Neural Guide Online</span>
              <p className="text-[9px] text-zinc-500 uppercase mt-1 tracking-tighter">Ready for command sync</p>
            </div>
          </button>
        </main>
      </div>
    </div>
  );
};

export default App;
