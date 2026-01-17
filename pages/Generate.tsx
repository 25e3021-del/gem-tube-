
import React, { useState } from 'react';
import { Sparkles, Video, Download, RotateCcw, Loader2 } from 'lucide-react';
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
      setError(err.message || 'An unexpected error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-[calc(100vh-56px)]">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
          GEMINI VEO STUDIO
        </h1>
        <p className="text-zinc-400 text-lg">Bring your ideas to life with state-of-the-art AI video generation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl">
            <label className="block text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest">
              What do you want to create?
            </label>
            <textarea
              className="w-full h-40 bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-500 resize-none"
              placeholder="e.g. A futuristic neon city with flying cars in 4K resolution, cinematic lighting..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
            
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs font-medium text-zinc-500">Presets:</span>
              <button 
                onClick={() => setPrompt('Cinematic drone shot of a hidden tropical island')}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-full transition-colors"
              >
                Nature
              </button>
              <button 
                onClick={() => setPrompt('Cyberpunk samurai walking through a rainy market')}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-full transition-colors"
              >
                Sci-Fi
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all ${
                isGenerating 
                  ? 'bg-zinc-800 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Generating Video...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Magic</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 bg-blue-900/10 rounded-3xl border border-blue-500/20 text-sm text-blue-200">
            <h4 className="font-bold flex items-center mb-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Pro Tip
            </h4>
            <p>Describe the camera movement and lighting for better results. Veo 3.1 excels at following complex spatial instructions.</p>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 aspect-video bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden relative flex items-center justify-center shadow-inner">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                loop
              />
            ) : isGenerating ? (
              <div className="text-center p-8">
                <div className="relative mb-6">
                   <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                   <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Creating your masterpiece</h3>
                <p className="text-zinc-500 text-sm">This can take up to a minute. Great things take time!</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <Video className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
                <p className="text-zinc-600 font-medium">Your generated video will appear here</p>
              </div>
            )}
            
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-900/80 backdrop-blur px-4 py-2 rounded-lg text-xs text-white border border-red-500/50">
                {error}
              </div>
            )}
          </div>

          {videoUrl && (
            <div className="mt-6 flex gap-4">
              <a 
                href={videoUrl} 
                download="gemtube-ai-gen.mp4"
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-bold"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </a>
              <button 
                onClick={() => { setVideoUrl(null); setPrompt(''); }}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-bold"
              >
                <RotateCcw className="w-5 h-5" />
                <span>New Creation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
