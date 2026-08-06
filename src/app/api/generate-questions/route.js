import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { outline } = await req.json();

    if (!outline || outline.trim() === "") {
      return new Response(
        JSON.stringify({
          questions: [],
          message: "Please provide an outline",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const prompt = `
You are an expert exam question generator.

Generate high-quality university exam questions from the following outline.

Rules:
- Return only questions.
- One question per line.
- Do not add numbering, explanations, headings, or markdown.
- Questions should be suitable for university examinations.

Outline:
${outline}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert university exam paper generator.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.6,
    });

    const text = completion.choices[0].message.content || "";

    const questions = text
      .split("\n")
      .map((q) => q.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    return new Response(
      JSON.stringify({ questions }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Groq API Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}