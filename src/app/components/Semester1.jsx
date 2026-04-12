"use client";
import { useState } from "react";
import styles from "../utills.module.css";

export default function Semester1() {
  const [outline, setOutline] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleGenerate = async () => {
    if (!outline.trim()) {
      setError("Please enter an outline first.");
      return;
    }

    setLoading(true);
    setError("");
    setWarning("");
    setResult([]);

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ outline }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      }

      if (data.warning) {
        setWarning(data.warning);
      }

      setResult(data.questions || []);

    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.outlineDiv}>
      
      <textarea
        className={styles.textarea}
        value={outline}
        onChange={(e) => setOutline(e.target.value)}
        placeholder="Enter outline..."
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Warning */}
      {warning && <p style={{ color: "orange" }}>{warning}</p>}

      {/* Results */}
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