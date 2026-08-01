"use client";

import React, { useState } from "react";
import styles from "../../utills.module.css";
import Image from "next/image";
import logo from "../../../logo.jpeg"

const PaperFormat = ({ shortQuestions = [], longQuestions = [], setDisplay, subject , noSQs, noLQs, shortMarks, longMarks, term, year}) => {
  const [paperId, setPaperId] = useState(null);
  const currentDate = new Date().toLocaleString();
  const handlePrint = () => {
    window.print()
  }
  const handleShare = async () => {
    if (!paperId) {
      alert("Please save the paper before sharing.");
      return;
    }

    const email = prompt("Enter recipient's email:");

    if (!email) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/papers/${paperId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };
  return (
    <div className={styles.paperWrapper}>
        <i className={`fa fa-close ${styles.closeIcon} `} onClick={() => setDisplay(false)}>close</i>
      <div className={styles.paperContainer}>
        
        {/* Header */}
        <div className={styles.paperHeader}>
          <div className={styles.headerLogo}><Image src={logo} className={styles.logo} alt="logo" /></div>
          <div className={styles.headerUtils}>
            <h1>UniSoft Exam Elevator</h1>
            <h2 className={styles.subject}>{subject}</h2>
            <p>
              <strong>{term} {year}</strong>
            </p>
            <p>{currentDate}</p>
            <p>Attempt all questions</p>
            <strong>
              Total Marks: {(shortMarks * noSQs) + (longMarks * noLQs)}
            </strong>
          </div>
        </div>

        {/* Short Questions */}
        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Short Questions </h2> <span>{`${noSQs} x ${shortMarks} = ${noSQs * shortMarks}`}</span>
          </div>

          {shortQuestions.length === 0 ? (
            <p className={styles.empty}>No questions available</p>
          ) : (
              <ol className={styles.questionList}>
                {shortQuestions.map((q, i) => (
                  <li key={q.id || i} className={styles.li}>
                    {i + 1}.{" "}
                    {typeof q === "string"
                      ? q
                      : q.question || q.text || q.name || JSON.stringify(q)}
                  </li>
                ))}
              </ol>
          )}
        </div>

        {/* Long Questions */}
        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Long Questions </h2> <span>{`${noLQs} x ${longMarks} = ${noLQs * longMarks}`}</span>
          </div>

          {longQuestions.length === 0 ? (
            <p className={styles.empty}>No questions available</p>
          ) : (
              <ol className={styles.questionList}>
                {longQuestions.map((q, i) => (
                  <li key={q.id || i} className={styles.li}>
                    {i + 1}.{" "}
                    {typeof q === "string"
                      ? q
                      : q.question || q.text || q.name || JSON.stringify(q)}
                  </li>
                ))}
              </ol>
          )}
        </div>
          <div className={styles.paperButtonsDiv}>
          <button onClick={handleShare} className={styles.printBtn}>Share</button>
          <button onClick={handlePrint} className={styles.printBtn}>Print</button>
          </div>
      </div>
    </div>
  );
};

export default PaperFormat;