import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const GMS_SYSTEM_INSTRUCTION = `
You are an expert Android System Engineer specializing in Google Mobile Services (GMS) certification.
Your goal is to help users understand what GMS is and how to pass the certification (CTS, GTS, VTS, STS).

Key Knowledge Areas:
1. **GMS Components**: Play Store, Chrome, YouTube, GMS Core (Play Services), etc.
2. **Certification Suites**:
   - CTS (Compatibility Test Suite)
   - GTS (GMS Test Suite)
   - VTS (Vendor Test Suite)
   - STS (Security Test Suite)
   - CTS-Verifier
3. **Process**: MADA signing, CDD compliance, obtaining a GMS license, submitting via PLS (Partner Logic System).

Guidelines:
- Explain technical terms clearly.
- If asked about specific failures (e.g., "Camera CTS fail"), suggest debugging steps (logcat, media profiles, permissions).
- Keep answers professional, concise, and structured (use bullet points).
- Output strictly in Chinese (Simplified).
`;

export const streamGMSAdvice = async (
  userMessage: string, 
  history: { role: string; text: string }[]
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: GMS_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    return await chat.sendMessageStream({ message: userMessage });
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
