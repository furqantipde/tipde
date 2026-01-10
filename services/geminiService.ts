
import { GoogleGenAI } from "@google/genai";

export const generateChatResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: "You are Tipde AI v2.6, a highly intelligent and professional multi-modal assistant. Your goal is to provide exceptional, original, and valuable content to users. If a user asks to create, generate, or visualize an image, provide a vivid description and prefix it with '[IMAGE_GEN]'. Ensure all information is accurate, safe, and helpful. Maintain a tone that is professional, authoritative yet accessible. Avoid robotic cliches; sound like a high-level expert consultant."
    }
  });
  return response.text;
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
