import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Engenheiro Virtual Sênior da CentriTech, uma fabricante líder de centrífugas industriais.
Seu objetivo é ajudar clientes a identificar a melhor solução de separação para suas necessidades.

Nossos produtos principais:
1. Centrífuga Decanter (Série D): Para separação sólido-líquido contínua com alta concentração de sólidos. Ideal para tratamento de efluentes, mineração e processamento de alimentos.
2. Centrífuga Separadora de Discos (Série S): Para clarificação de líquidos e separação de dois líquidos imiscíveis. Ideal para laticínios, biocombustíveis e óleos.
3. Centrífuga Vertical (Série V): Para secagem de peças ou separação em batelada de produtos químicos finos.

Diretrizes:
- Seja profissional, técnico, mas acessível.
- Pergunte sobre o tipo de material, vazão desejada e indústria do cliente se eles não fornecerem.
- Recomende o modelo específico (Série D, S, ou V) com base nas respostas.
- Responda sempre em Português do Brasil.
- Mantenha as respostas concisas (máximo de 3 parágrafos).
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert history to format expected by Chat (if keeping history state in Chat object is preferred, 
    // strictly strictly speaking with @google/genai we usually use sendMessage with history managed by the Chat object instance. 
    // However, for a stateless service function, we can pass history in contents or just treat it as a fresh generation with context if needed.
    // Ideally, we create a chat session. For this implementation, we will use a fresh generation with system instruction 
    // and append previous context to the prompt or use chat session if persistent.)
    
    // Better approach for this demo: Maintain a chat session client-side or re-instantiate with history. 
    // To keep it simple and robust per request:
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Ocorreu um erro ao conectar com o assistente inteligente. Por favor, tente novamente mais tarde.";
  }
};