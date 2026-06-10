"use client";

import React, { useState } from "react";
import styles from "../utills.module.css";
import { semesterOne } from "../components/1/semesterOne";
import PaperFormat from "../semester/[semester]/PaperFormat";

function Page() {
  const [shortQuestions, setShortQuestions] = useState([]);
  const [longQuestions, setLongQuestions] = useState([]);
  const [display, setDisplay] = useState(false);

  const [noSQs, setNoSQs] = useState(0);
  const [noLQs, setNoLQs] = useState(0);
  const [shortMarks, setShortMarks] = useState(0);
  const [longMarks, setLongMarks] = useState(0);
 
  const [selectedSubject, setSelectedSubject] = useState("");

  const openPaper = (paper) => {
    setSelectedSubject(paper.Subject);
    setDisplay(true);

    setShortQuestions([
      {
        id: paper.id,
        question: paper.question,
      },
    ]);

    setLongQuestions([]); // keep empty for now
  };

  return (
    <div className={styles.pastPaperContainer}>
      <div className={styles.pastPaperHero}>
        <h1>📚 Past Papers</h1>
        <p>
          Prepare smarter by practicing previous examination papers.
          Browse semester-wise and subject-wise resources.
        </p>
      </div>

      <div className={styles.paperGrid}>
        {semesterOne.map((paper, index) => (
          <div key={index} className={styles.paperCard}>
            <span className={styles.paperSemester}>
              {paper.term} {paper.year}
            </span>

            <h2>{paper.Subject}</h2>
            <h3>{paper.course_code}</h3>

            <button
              onClick={() => openPaper(paper)}
              className={styles.paperBtn}
            >
              View Paper
            </button>
          </div>
        ))}
      </div>

      {display && (
        <div className="paper-Div">
          <PaperFormat
            shortQuestions={shortQuestions}
            longQuestions={longQuestions}
            setDisplay={setDisplay}
            noSQs={noSQs}
            noLQs={noLQs}
            shortMarks={shortMarks}
            longMarks={longMarks}
            subject={selectedSubject}
          />
        </div>
      )}
    </div>
  );
}

export default Page;