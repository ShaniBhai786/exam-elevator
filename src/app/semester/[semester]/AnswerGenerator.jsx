"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./AnswerGenerator.module.css";

export default function AnswerGenerator({
    questions = [],
    setShowAnswers,
}) {
    const [answers, setAnswers] = useState("");
    const [loading, setLoading] = useState(true);

    const generateAnswers = async () => {
        setLoading(true);

        try {
            const formattedQuestions = questions
                .filter(Boolean)
                .map((q) => {
                    if (typeof q === "string") return q;

                    if (typeof q === "object") {
                        return q.question || q.text || q.name || "";
                    }

                    return "";
                })
                .filter((q) => q.trim() !== "");

            console.log("Questions:", formattedQuestions);

            const res = await fetch("/api/generate-answers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questions: formattedQuestions,
                }),
            });

            const data = await res.json();

            console.log("API Response:", data);

            // Ensure answers is always an array
            setAnswers(data.answers || "");
        } catch (err) {
            console.error("Generate Answers Error:", err);
            setAnswers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (questions?.length) {
            generateAnswers();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div>
                        <h2>Generated Answers</h2>
                        <p>AI Generated Exam Solutions</p>
                    </div>

                    <button
                        className={styles.closeBtn}
                        onClick={() => setShowAnswers(false)}
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.loader}></div>

                        <h3>Generating Answers...</h3>

                        <p>Please wait while AI prepares detailed answers.</p>
                    </div>
                ) : (
                        <div className={styles.answerContainer}>
                            {answers ? (
                                <ReactMarkdown>
                                    {answers}
                                </ReactMarkdown>
                            ) : (
                                <p>No answers generated.</p>
                            )}
                        </div>
                )}
            </div>
        </div>
    );
}