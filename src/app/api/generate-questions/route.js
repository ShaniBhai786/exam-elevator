// app/api/generate-questions/route.js
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { outline } = await req.json();

    if (!outline || outline.trim() === "") {
      return new Response(
        JSON.stringify({ questions: [], message: "Please provide an outline" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
You are an expert exam question generator.
Given the following outline, generate a list of clear, exam‑style questions.
Provide each question on its own line.

Outline:
${outline}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { type: "text", text: prompt }
        ],
        config: {
          systemInstruction: "Generate exam questions only — list them clearly without extra commentary.",
          temperature: 0.6,
        },
      });

      // Gemini response text
      const text = response.output_text || response.text || "";
      const questions = text
        .split(/\n|•|-/)
        .map(q => q.trim())
        .filter(q => q.length > 0);

      return new Response(
        JSON.stringify({ questions }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    } 
    catch (error) {
      console.error("Gemini API error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}