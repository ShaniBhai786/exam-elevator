"use client";

import React, { useEffect, useState } from "react";
import styles from "../utills.module.css";
import PaperFormat from "../semester/[semester]/PaperFormat";


const Page = () => {
  const [papers, setPapers] = useState([])
  const [showPaper, setShowPaper] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("papers") || "[]")
    setPapers(data)
  },[])
  const viewSavedPaper = (paperId) => {
    const paper = papers.find(p => p.id === paperId)
    setSelectedPaper(paper)
    setShowPaper(true)
  }
  const deletePaper = (paperId) => {
    setDeletingId(paperId)

    setTimeout(() => {
      const updatedPapers = papers.filter(p => p.id !== paperId)
      setPapers(updatedPapers)
      localStorage.setItem("papers", JSON.stringify(updatedPapers))
    }, 500)
    // setDeletingId(null)
  }
  return (
    <>
    <div className={styles.wrapper}>
      <h1 className={styles.saveheading}>Saved Papers</h1>

      <div className={styles.grid}>
        {papers.map((item) => (
          <div key={item.id} className={`${styles.savedCard} ${deletingId === item.id ? styles.delete : "" }`}>
            <div className={styles.cardTop}>
              <h2>{item.subject}</h2>
              <span>{item.date}</span>
            </div>

            <div className={styles.stats}>
              <div>
                <p>Short</p>
                <h3>{item.noSQs}</h3>
              </div>
              <div>
                <p>Long</p>
                <h3>{item.noLQs}</h3>
              </div>
            </div>

            <button className={styles.viewBtn} onClick={() => viewSavedPaper(item.id)}>
              View Paper
            </button>
            <button className={styles.deleteBtn} onClick={() => deletePaper(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>

    {showPaper && selectedPaper && (
  <PaperFormat
    shortQuestions={selectedPaper.shortQuestions}
    longQuestions={selectedPaper.longQuestions}
    subject={selectedPaper.subject}
    noSQs={selectedPaper.noSQs}
    noLQs={selectedPaper.noLQs}
    shortMarks={selectedPaper.shortMarks}
    longMarks={selectedPaper.longMarks}
    setDisplay={setShowPaper}
  />
)}
    </>
  );
};

export default Page;