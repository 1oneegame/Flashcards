import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!apiKey) {
    throw new Error("An API Key must be set when running in a browser");
}

const ai = new GoogleGenAI({apiKey: apiKey});

interface question {
  question: string;
  correct_answer: string;
}

export default async function AnalyzeWithAI (request: question) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: 'Question: ' + request.question + ' Answer: ' + request.correct_answer,
    config: {
      systemInstruction: "You are an expert in any field, with all the knowledge in the world. You are asked a question and the correct answer to it, and you need to explain it in simple words and very briefly.",
    },
  });
  
  console.log(response.text);
  return `Question: ${request.question} \n Answer: ${request.correct_answer} \n Explanation: ${response.text}`;
}
