import Groq from "groq-sdk";

export async function POST(req) {
    try {
        const { questions } = await req.json();

        if (!questions || questions.length === 0) {
            return new Response(
                JSON.stringify({
                    answers: "",
                    message: "No questions provided",
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const prompt = `
You are an expert university professor and exam paper solver.

Generate high-quality, exam-oriented answers.

Rules:

1. Start every answer with
Question 1:
Answer:

2. Keep language simple and easy to memorize.

3. Answer exactly according to university exam style.

4. Include:
- Definition
- Explanation
- Important Points
- Examples (if needed)

5. Long questions:
- Introduction
- Headings
- Bullet Points
- Conclusion

6. Short questions:
- 100-150 words

7. Long questions:
- 300-500 words

8. Do NOT give unnecessary textbook explanations.

9. Format using Markdown.

Questions:


${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a university professor who writes detailed exam answers.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.4,
        });

        const text = completion.choices[0].message.content;

        return new Response(
            JSON.stringify({
                answers: text,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({
                error: err.message,
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