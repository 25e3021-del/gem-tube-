
import React, { useState } from 'react';
import { Sparkles, Video, Download, RotateCcw, Loader2, Zap, Terminal, Globe } from 'lucide-react';
import { generateAIVideo } from '../services/gemini';

const Generate: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateAIVideo(prompt);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'Quantum synthesis interrupted.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-6">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">Universal Matter Engine</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic tracking-tighter font-futuristic uppercase">
            Reality Engine
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto tracking-wide">
            Manifest high-fidelity visual constructs from pure linguistic thought.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="p-8 glass rounded-[40px] border border-white/5 shadow-2xl relative group">
              <div className="absolute top-4 right-6 text-zinc-800">
                <Terminal className="w-12 h-12" />
              </div>
              <label className="block text-[11px] font-black text-cyan-400/50 mb-6 uppercase tracking-[0.4em]">
                Neural Construct Parameter
              </label>
              <textarea
                className="w-full h-56 bg-black/40 rounded-3xl p-6 outline-none border border-white/5 focus:border-cyan-500/50 text-white placeholder-zinc-700 resize-none text-lg font-medium tracking-tight transition-all"
                placeholder="Ex: A synchronized dance of crystalline structures in a zero-gravity nebula, cinematic rendering, 8k neural fidelity..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
              
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block w-full mb-2">Synthesis Presets:</span>
                <button 
                  onClick={() => setPrompt('Hyper-detailed macro of a silicon lifeform heartbeat')}
                  className="text-[10px] font-bold bg-white/5 hover:bg-cyan-500/20 px-4 py-2 rounded-full border border-white/5 transition-all uppercase tracking-widest text-zinc-400 hover:text-cyan-400"
                >
                  Bio-Tech
                </button>
                <button 
                  onClick={() => setPrompt('Vast oceanic cities of Europa under icy crust, neon glowing')}
                  className="text-[10px] font-bold bg-white/5 hover:bg-cyan-500/20 px-4 py-2 rounded-full border border-white/5 transition-all uppercase tracking-widest text-zinc-400 hover:text-cyan-400"
                >
                  Expedition
                </button>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className={`w-full mt-10 py-5 rounded-3xl font-black text-xl flex items-center justify-center space-x-4 transition-all uppercase tracking-[0.2em] relative overflow-hidden group ${
                  isGenerating 
                    ? 'bg-zinc-900 cursor-not-allowed text-zinc-700' 
                    : 'bg-white text-black hover:bg-cyan-400'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>SYNTHeSIZING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 fill-current" />
                    <span>Manifest Reality</span>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            <div className="p-8 bg-purple-900/10 rounded-3xl border border-purple-500/20">
              <h4 className="font-black text-xs text-purple-400 flex items-center mb-4 uppercase tracking-[0.3em]">
                <Sparkles className="w-5 h-5 mr-3" />
                Quantum Coherence Tip
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Veo 3.1 architecture supports multi-frame consistency. Include temporal cues like "accelerating" or "evolving" for complex motion vectors.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative aspect-video bg-black rounded-[40px] border border-white/5 overflow-hidden flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  className="w-full h-full object-cover" 
                  controls 
                  autoPlay 
                  loop
                />
              ) : isGenerating ? (
                <div className="text-center p-12 relative z-10">
                  <div className="relative mb-10">
                     <div className="w-32 h-32 border-[2px] border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
                     <div className="absolute inset-0 m-auto w-24 h-24 border-[1px] border-purple-500/20 border-b-purple-400 rounded-full animate-spin-reverse"></div>
                     <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black font-futuristic uppercase italic tracking-widest mb-4">Materializing Stream</h3>
                  <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.5em]">Allocating Neural Bandwidth...</p>
                </div>
              ) : (
                <div className="text-center p-12 opacity-20">
                  <Video className="w-24 h-24 text-zinc-500 mx-auto mb-6" />
                  <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-xs">Awaiting Input Signal</p>
                </div>
              )}
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
              
              {error && (
                <div className="absolute bottom-8 left-8 right-8 glass bg-red-950/40 backdrop-blur px-6 py-4 rounded-2xl text-xs text-red-200 border border-red-500/30 font-black tracking-widest uppercase italic">
                  Critical Error: {error}
                </div>
              )}
            </div>

            {videoUrl && (
              <div className="mt-8 flex gap-6 animate-in slide-in-from-top-4 duration-500">
                <a 
                  href={videoUrl} 
                  download="aetherflow-manifest.mp4"
                  className="flex-1 glass hover:bg-cyan-500/20 py-5 rounded-3xl flex items-center justify-center space-x-3 transition-all font-black uppercase tracking-widest border border-white/10 text-cyan-400 shadow-xl"
                >
                  <Download className="w-6 h-6" />
                  <span>Store Fragment</span>
                </a>
                <button 
                  onClick={() => { setVideoUrl(null); setPrompt(''); }}
                  className="flex-1 glass hover:bg-white/5 py-5 rounded-3xl flex items-center justify-center space-x-3 transition-all font-black uppercase tracking-widest border border-white/10 text-zinc-500 shadow-xl"
                >
                  <RotateCcw className="w-6 h-6" />
                  <span>Reset Core</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Generate;
