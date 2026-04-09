"use client";
import { useState } from "react";
import styles from "../utills.module.css";

export default function Semester1() {
  const [outline, setOutline] = useState("");
  const [result, setResult] = useState([]);

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ outline }),
    });

    const data = await res.json();
    setResult(data.questions || []);
  };

  return (
    <div className={styles.outlineDiv}>
      <textarea
        className={styles.textarea}
        onChange={(e) => setOutline(e.target.value)}
        placeholder="Enter outline...."
      />

      <button onClick={handleGenerate}>
        Generate
      </button>
 
      {result.length > 0 && (
        <ol className={styles.results}>
          {result.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      )}
    </div>
  );
}