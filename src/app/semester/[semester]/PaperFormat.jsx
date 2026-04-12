"use client";

import React from "react";
import styles from "../../utills.module.css";
import Image from "next/image";
import logo from "../../../logo.jpeg"

const PaperFormat = ({ shortQuestions = [], longQuestions = [], setDisplay, subject , noSQs, noLQs, shortMarks, longMarks }) => {
  const handlePrint = () => {
    window.print()
  }
  return (
    <div className={styles.paperWrapper}>
        <i className={`fa fa-close ${styles.closeIcon} `} onClick={() => setDisplay(false)}>close</i>
      <div className={styles.paperContainer}>
        
        {/* Header */}
        <div className={styles.paperHeader}>
          <div className={styles.headerLogo}><Image src={logo} className={styles.logo} alt="logo" /></div>
          <div className={styles.headerUtils}>
            <h1>unisoft exam elevator</h1>
          <h2 className={styles.subject}>{subject}</h2>
          <p>Attempt all questions</p>
          <strong>Total Marks: {(shortMarks * noSQs) + (longMarks * noLQs)}</strong>
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
                <li key={i} contentEditable={true} suppressContentEditableWarning={true} className={styles.li} >
                  {i+1}. {q}
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
                <li key={i} className={styles.li} suppressContentEditableWarning={true} contentEditable={true}>
                  {i+1}. {q}
                </li>
              ))}
            </ol>
          )}
        </div>
          <button onClick={handlePrint} className={styles.printBtn}>Print</button>
      </div>
    </div>
  );
};

export default PaperFormat;