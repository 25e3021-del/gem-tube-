
import React, { useState } from 'react';
import { Video, Loader2, Zap, Globe } from 'lucide-react';
import { aiService } from '../services/gemini';

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
      const url = await aiService.generateVideo(prompt);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || 'Generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-6">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">AI Video Creator</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic tracking-tighter font-futuristic uppercase">
            Create with AI
          </h1>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto tracking-wide">
            Turn your ideas into videos using advanced AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="p-8 glass rounded-[40px] border border-white/5 shadow-2xl relative group">
              <label className="block text-[11px] font-bold text-cyan-400/50 mb-6 uppercase tracking-[0.4em]">Enter your prompt</label>
              <textarea
                className="w-full h-56 bg-black/40 rounded-3xl p-6 outline-none border border-white/5 focus:border-cyan-500/50 text-white placeholder-zinc-700 resize-none text-lg font-medium transition-all"
                placeholder="Describe the video you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className={`w-full mt-10 py-5 rounded-3xl font-black text-xl flex items-center justify-center space-x-4 transition-all uppercase tracking-[0.2em] relative overflow-hidden group ${
                  isGenerating ? 'bg-zinc-900 text-zinc-700' : 'bg-white text-black hover:bg-cyan-400'
                }`}
              >
                {isGenerating ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /><span>Creating...</span></>
                ) : (
                  <><Zap className="w-6 h-6 fill-current" /><span>Create Video</span></>
                )}
              </button>
              {error && <p className="mt-4 text-red-500 text-xs font-bold uppercase text-center">{error}</p>}
            </div>
          </div>

          <div className="relative aspect-video bg-black rounded-[40px] border border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
            {videoUrl ? (
              <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay loop />
            ) : isGenerating ? (
              <div className="text-center p-12">
                <h3 className="text-2xl font-bold uppercase italic tracking-widest mb-4">Creating Video</h3>
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.5em]">Syncing with neural mesh...</p>
              </div>
            ) : (
              <div className="text-center opacity-20">
                <Video className="w-24 h-24 text-zinc-500 mx-auto mb-6" />
                <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">Waiting for prompt</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
