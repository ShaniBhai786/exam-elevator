"use client";

import React, { useState } from "react";
import styles from "../../utills.module.css";
import PaperFormat from "./PaperFormat";

const AiGenerator = ({subject, CourseOutline, setIsSelected}) => {
  const [outline, setOutline] = useState("");
  const [shortQuestions, setShortQuestions] = useState([]);
  const [longQuestions, setLongQuestions] = useState([]);
  const [selectedShort, setSelectedShort] = useState([]);
  const [selectedLong, setSelectedLong] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [display, setDisplay] = useState(false);
  const [noSQs, setNoSQs] = useState(0);
  const [noLQs, setNoLQs] = useState(0);
  // const subject = "Numerical Computing";
  // ================= API CALL =================
  const handleGenerate = async () => {
    if (!outline.trim()) {
      setError("Please enter an outline first....");
      return;
    }

    setLoading(true);
    setError("");
    setWarning("");

    setShortQuestions([]);
    setLongQuestions([]);
    setSelectedShort([]);
    setSelectedLong([]);

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outline }),
      });

      const data = await res.json();

console.log("API RESPONSE:", data);

if (data.error) setError(data.error);
if (data.warning) setWarning(data.warning);

const allQuestions = data.questions || [];

const short = [];
const long = [];

allQuestions.forEach((q) => {
  const text = q.toLowerCase();

  const longKeywords = [
    "explain",
    "describe",
    "discuss",
    "compare",
    "differentiate",
    "analyze"
  ];

  const isLong = longKeywords.some(word => text.includes(word));

  if (isLong) {
    long.push(q);
  } else {
    short.push(q);
  }
});

setShortQuestions(short);
setLongQuestions(long);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // ================= SELECTION LOGIC =================
  const toggleSelect = (type, value) => {
    if (type === "short") {
      setSelectedShort((prev) =>
        prev.includes(value)
          ? prev.filter((q) => q !== value)
          : [...prev, value]
      );
    } else {
      setSelectedLong((prev) =>
        prev.includes(value)
          ? prev.filter((q) => q !== value)
          : [...prev, value]
      );
    }
  };

  // ================= RANDOM SELECTION =================
  const getRandom = (arr, count) => {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, count);
  };

  const autoSelectRandom = () => {
    if (!shortQuestions.length && !longQuestions.length) return;
    const randomSQs = Math.floor(Math.random() * 10 + 1);
    const randomLQs = Math.floor(Math.random() * 10 + 1);
    setNoSQs(randomSQs);
    setNoLQs(randomLQs);

    setSelectedShort(getRandom(shortQuestions, randomSQs));
    setSelectedLong(getRandom(longQuestions, randomLQs));
  };

  const clearSelection = () => {
    setSelectedShort([]);
    setSelectedLong([]);
    setNoSQs(0);
    setNoLQs(0);
  };

  const pasteOutline =() => {
    setOutline(CourseOutline.outline);
  }

  // ================= UI =================
  return (
    <div className={styles.aiWrapper}>
        
        <i className={`fa fa-arrow-left ${styles.backIcon}`} onClick={() => setIsSelected(0)}></i>
      {/* HEADER */}
      <div className={styles.aiHeader}>
        <h1>AI Exam Paper Generator</h1>
        <p>Generate structured short & long questions instantly</p>
      </div>

      {/* INPUT */}
      <div className={styles.aiCard}>
        <textarea
          className={styles.textarea}
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder="Enter syllabus outline..."
          />

        <div className={styles.buttonRow}>
          <button
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={loading}
            >
            {loading ? "Generating..." : "Generate Questions"}
          </button>

          <button
            className={styles.randomBtn}
            onClick={autoSelectRandom}
            disabled={!shortQuestions.length && !longQuestions.length}
            >
            Auto Select
          </button>

          <button
            className={styles.clearBtn}
            onClick={clearSelection}
            >
            Clear Selection
          </button>
          <button onClick={() => setOutline("")} className={styles.clearBtn}>Clear Outline</button>
          <button onClick={pasteOutline} className={styles.pasteBtn}>Paste Outline</button>
          <button className={styles.printBtn} onClick={() => setDisplay(true)} >Print Paper</button>
        </div>
              {/* SUMMARY */}
            {(selectedShort.length > 0 || selectedLong.length > 0) && (
              <div className={styles.summaryBox}>
                <h2>Paper Summary</h2>
                <p><b>Short Selected:</b> {selectedShort.length}</p>
                <p><b>Long Selected:</b> {selectedLong.length}</p>
                
              </div>
            )}

        {error && <div className={styles.errorBox}>{error}</div>}
        {warning && <div className={styles.warningBox}>{warning}</div>}
      </div>

      {/* DEBUG (REMOVE IN PRODUCTION) */}
      {/* <pre style={{ color: "#fff" }}>{JSON.stringify({ shortQuestions, longQuestions }, null, 2)}</pre> */}

      {/* SHORT QUESTIONS */}
      {shortQuestions.length > 0 && (
        <div className={styles.resultBox}>
          <h2>Short Questions</h2>

          <ol>
            {shortQuestions.map((q, i) => (
              <li key={`short-${i}`} className={styles.resultItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedShort.includes(q)}
                    onChange={() => toggleSelect("short", q)}
                  />
                  <span>{q}</span>
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* LONG QUESTIONS */}
      {longQuestions.length > 0 && (
        <div className={styles.resultBox}>
          <h2>Long Questions</h2>

          <ol>
            {longQuestions.map((q, i) => (
              <li key={`long-${i}`} className={styles.resultItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedLong.includes(q)}
                    onChange={() => toggleSelect("long", q)}
                  />
                  <span>{q}</span>
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}
      
      {display && <PaperFormat shortQuestions={selectedShort} longQuestions={selectedLong} setDisplay={setDisplay} shortMarks={5} longMarks={10} noSQs={noSQs} noLQs={noLQs} subject={subject} />}
    </div>
  );
};

export default AiGenerator;