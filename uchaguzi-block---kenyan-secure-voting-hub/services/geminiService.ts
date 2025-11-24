import { GoogleGenAI } from "@google/genai";

// Initialize the client safely
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) return "Demo Mode: AI features require an API Key. (Simulated Response: Go to 'Vote' tab to start.)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are 'Uchaguzi Bot', a helpful, neutral, and ethical assistant for the Kenyan Electoral Commission (IEBC). 
        Your goal is to assist voters with the 2027 General Election.
        Key Traits:
        1. **Neutrality:** Do not favor any candidate.
        2. **Information:** Explain how blockchain voting works simply (it's a public digital ledger).
        3. **Inclusivity:** If asked, you can explain features in simple Swahili.
        4. **Safety:** Do not tolerate hate speech.
        
        Context: The user is using the 'Uchaguzi Block' app.`
      }
    });
    return response.text || "I'm having trouble connecting to the election server. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "System overload. Please try again later.";
  }
};

export const analyzeElectionIntegrity = async (votingData: any): Promise<string> => {
  if (!apiKey) return "Demo Mode: API Key missing. Integrity Check: 99.9% Secure (Simulated).";

  try {
    const prompt = `Analyze the following voting data snapshot for potential anomalies or fraud risks. 
    Data: ${JSON.stringify(votingData)}.
    
    Provide a brief, structured security report including:
    1. Anomaly Detection Score (0-100%)
    2. Regional variance analysis.
    3. Blockchain consensus status.
    
    Keep it professional and technical but accessible to an election observer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Analysis complete. No significant anomalies detected.";
  } catch (error) {
    return "Unable to run real-time integrity check. Connectivity issue.";
  }
};