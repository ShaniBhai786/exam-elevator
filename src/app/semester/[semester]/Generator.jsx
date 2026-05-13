"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../generatoor.css"
import PaperFormat from "./PaperFormat";

const Generator = ({ semesterSeven, subject }) => {
  const [shortQuestions, setShortQuestions] = useState([]);
  const [longQuestions, setLongQuestions] = useState([]);
  const [display, setDisplay] = useState(false);
  const [noSQs, setNoSQs] = useState(0)
  const [noLQs, setNoLQs] = useState(0)
  const [shortMarks, setShortMarks] = useState(0)
  const [longMarks, setLongMarks] = useState(0)

  const generatePaper = (short, long) => {

    const filteredShortQuestions = semesterSeven.filter(
      (item) =>
        item.Subject === subject &&
        item.category === "short" 
    );

    const shuffled = filteredShortQuestions.sort(
      () => 0.5 - Math.random()
    );

    const filteredLongQuestions = semesterSeven.filter(
      (item) =>
        item.Subject === subject &&
        item.category === "long" 
    );

    const shuffledLong = filteredLongQuestions.sort(
      () => 0.5 - Math.random()
    );

    const selectedShortQuestions = shuffled
      .slice(0, short)
      .map((item) => item.question);

      const selectedLongQuestions = shuffledLong
      .slice(0, long)
      .map((item) => item.question);

    setShortQuestions(selectedShortQuestions);
    setNoSQs(short)
    setShortMarks(5)
    setLongQuestions(selectedLongQuestions)
    setNoLQs(long)
    setLongMarks(10)
    window.scrollTo(0, 1000000)
  };
  const handleDisplay = () => {
    setDisplay(true)
    window.scrollTo(0, 0)
  }

  return (
    <>
    {display && (
      <div className="paper-Div">
        <PaperFormat shortQuestions={shortQuestions} longQuestions={longQuestions} setDisplay={setDisplay} noSQs={noSQs} noLQs={noLQs} shortMarks={shortMarks} longMarks={longMarks} subject={subject} />
      </div>
    )}
    <div className="generator-container">
      <motion.div
        className="generator-card"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glow"></div>

        <motion.h1
          className="generator-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Generate Your Paper <span>In One Click</span>
        </motion.h1>

        <p className="generator-subtitle">
          Instantly create pressional exam papers with AI-powered generation.
        </p>

        <div className="buttons">
            <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="generate-btn"
          onClick={() => generatePaper(3, 1)}
        >3 Short | 1 Long 🚀 
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="generate-btn"
          onClick={() => generatePaper(4, 2)}
        >4 Short | 2 Long 🚀 
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="generate-btn"
          onClick={() => generatePaper(5, 2)}
        >5 Short | 2 Long 🚀 
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="generate-btn"
          onClick={() => generatePaper(6, 3)}
        >6 Short | 3 Long 🚀 
        </motion.button>
        </div>

        {shortQuestions.length > 0 && (
          <div className="questions-container">
            <h2>Short Questions</h2>

            {shortQuestions.map((question, index) => (
              <div key={index} className="question-box">
                <span>Q{index + 1}.</span> <strong contentEditable="true" suppressContentEditableWarning={true}>
                  {question}
                </strong>
              </div>
            ))}
          </div>
        )}

        {longQuestions.length > 0 && (
          <div className="questions-container">
            <h2>Long Questions</h2>

            {longQuestions.map((question, index) => (
              <div key={index} className="question-box">
                <span>Q{index + 1}.</span> <strong contentEditable="true" suppressContentEditableWarning={true}>
                  {question}
                </strong>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
    <button onClick={handleDisplay} className="genBtn">Generate Paper</button>
    </>
  );
};

export default Generator;