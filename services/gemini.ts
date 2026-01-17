
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI with the environment key.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAISearchResults = async (query: string, videos: any[]) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search Query: "${query}"
      Available Videos: ${JSON.stringify(videos.map(v => ({ id: v.id, title: v.title, description: v.description })))}
      Task: Return the IDs of the most relevant videos from the list as a JSON array. If none are relevant, return an empty array. Respond ONLY with the JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        systemInstruction: "You are the AetherFlow Neural Indexer developed by Asanix Developers. Your job is to accurately match user intent to our video data fragments."
      }
    });

    const ids = JSON.parse(response.text || '[]');
    return videos.filter(v => ids.includes(v.id));
  } catch (error) {
    console.error("AI Search Error:", error);
    return videos.filter(v => 
      v.title.toLowerCase().includes(query.toLowerCase()) || 
      v.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getVideoSummary = async (title: string, description: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize this video briefly:
      Title: ${title}
      Description: ${description}`,
      config: {
        systemInstruction: "You are a concise video summarizer for AetherFlow by Asanix Developers. Provide a 2-3 sentence engaging, futuristic summary."
      }
    });
    return response.text;
  } catch (error) {
    return "Summary unavailable at this time.";
  }
};

export const generateAIVideo = async (prompt: string) => {
  const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
  if (!hasKey) {
    await (window as any).aistudio?.openSelectKey();
  }

  const ai = getAI();
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `${prompt}, cinematic, 8k, futuristic aesthetic, asanix quality`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      await (window as any).aistudio?.openSelectKey();
    }
    throw error;
  }
};
