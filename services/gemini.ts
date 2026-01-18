
import { GoogleGenAI, Type, GenerateContentParameters } from "@google/genai";

class GeminiService {
  private ai: GoogleGenAI;
  private modelName = "gemini-3-flash-preview";
  private videoModelName = "veo-3.1-fast-generate-preview";

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Semantic search using vector-like logic in LLM
   */
  async searchVideos(query: string, videos: any[]) {
    if (!query) return videos;
    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: `Search Query: "${query}"
        Available Video Metadata: ${JSON.stringify(videos.map(v => ({ id: v.id, title: v.title, category: v.category })))}
        Task: Return a JSON array of video IDs that semantically match the search. Respond ONLY with the JSON array.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          systemInstruction: "You are the Aethex Flows Neural Indexer. Match user intent to video data fragments accurately."
        }
      });

      const ids = JSON.parse(response.text || '[]');
      const filtered = videos.filter(v => ids.includes(v.id));
      return filtered.length > 0 ? filtered : videos.filter(v => 
        v.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("AI Search Error:", error);
      return videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()));
    }
  }

  /**
   * Curates a personalized neural feed
   */
  async getNeuralFeed(history: any[], allVideos: any[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: `User History: ${JSON.stringify(history.slice(0, 5).map(h => h.title))}
        Content Library: ${JSON.stringify(allVideos.slice(0, 20).map(v => ({ id: v.id, title: v.title })))}
        Goal: Curate 10 interesting videos. Return JSON array of IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      const ids = JSON.parse(response.text || '[]');
      return allVideos.filter(v => ids.includes(v.id)).slice(0, 10);
    } catch (error) {
      return allVideos.sort(() => Math.random() - 0.5).slice(0, 10);
    }
  }

  /**
   * Summarizes video content
   */
  async summarizeVideo(title: string, description: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: `Summarize this video: ${title}. Description: ${description}`,
        config: {
          systemInstruction: "Provide a 1-sentence futuristic summary."
        }
      });
      return response.text;
    } catch (error) {
      return "Neural summary failed.";
    }
  }

  /**
   * Generates video using Veo
   */
  async generateVideo(prompt: string) {
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) await (window as any).aistudio?.openSelectKey();

    try {
      let operation = await this.ai.models.generateVideos({
        model: this.videoModelName,
        prompt: `${prompt}, cinematic, 8k, futuristic`,
        config: { resolution: '720p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(r => setTimeout(r, 5000));
        operation = await this.ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      if (error.message?.includes("entity was not found")) {
        await (window as any).aistudio?.openSelectKey();
      }
      throw error;
    }
  }
}

export const aiService = new GeminiService();
