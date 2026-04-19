"use client"

import React, { useEffect, useState } from 'react'
import styles from '../../utills.module.css'
import PaperFormat from './PaperFormat'

const Generator = ({semesterSeven, subject}) => {
    const [shortQuestions, setShortQuestions] = useState([])
    const [longQuestions, setLongQuestions] = useState([])
    const [display, setDisplay] = useState(false)
    const [noSQs, setNoSQs] = useState(0)
    const [noLQs, setNoLQs] = useState(0)
    const [shortMarks, setShortMarks] = useState(null)
    const [longMarks, setLongMarks] = useState(null)
    useEffect(() => {
        setNoSQs(shortQuestions.length)
        setNoLQs(longQuestions.length)
    },[shortQuestions, longQuestions])
    const handleChange = (e, category) => {
        let value = e.target.value;
        if (category === "short") {
            if (e.target.checked) {
                setShortQuestions(prev => [...prev, value])
            }
            else{
                setShortQuestions(prev => prev.filter(item => item !== value))
            }
        }
        if (category === "long") {
            if (e.target.checked) {
                setLongQuestions(prev => [...prev, value])
            }
            else{
                setLongQuestions(prev => prev.filter(item => item !== value))
            }
        }
    }
  return (
      <>
      <div className={styles.generator}>
        <div className={styles.selected}><h2>Short Questions</h2> <span className={styles.select}>Selected: {noSQs}</span></div>
        {/* <p>Slected Short: <strong>{shortQuestions}</strong></p> */}
        {/* <p>Slected Long: <strong>{longQuestions}</strong></p> */}
      {
        semesterSeven.filter(item => item.Subject === subject && item.category === "short").map((item, index) => {
            return (
                <div key={index} className={styles.questionsDiv}>
                    {
                        item.Subject === subject && (
                            <div className={styles.shortQuestionDiv}>
                            {
                                item.category === "short" && (
                                    <>
                                    <input type="checkbox" value={item.question} name={item.question} id={item.question} onChange={(e) => handleChange(e, "short")} />
                                    <label htmlFor={item.question} className={styles.question}>{item.question} <span className={styles.year}>Year: {item.year}</span></label>
                                    {setShortMarks(item.marks)}
                                    </>
                                )
                            }
                            </div>
                        )
                    }
                </div>
            )
        })
      }

      {/* <p>Slected: <strong>{questions.join(",")}</strong></p> */}
        <div className={styles.selected}><h2>Long Questions</h2> <span className={styles.select}>Selected: {noLQs}</span></div>
      {
        semesterSeven.filter(item => item.Subject === subject && item.category === "long").map((item, index) => {
            return (
                <div key={index} className={styles.questionsDiv}>
                    {
                        item.Subject === subject && (
                            <div className={styles.shortQuestionDiv}>
                            {
                                item.category === "long" && (
                                    <>
                                    <input type="checkbox" value={item.question} name={item.question} id={item.question} onChange={(e) => handleChange(e, "long")} />
                                    <label htmlFor={item.question} className={styles.question}>{item.question}<span className={styles.year} >Year: {item.year}</span></label>
                                    {setLongMarks(item.marks)}
                                    </>
                                )
                            }
                            </div>
                        )
                    }
                </div>
            )
        })
      }
    </div>
    <button className={styles.previewBtn} onClick={() => setDisplay(true)}>Generate</button>
    {display && <PaperFormat shortQuestions={shortQuestions} subject={subject} longQuestions={longQuestions} setDisplay={setDisplay} noLQs={noLQs} noSQs={noSQs} shortMarks={shortMarks} longMarks={longMarks} />}
      </>
  )
}

export default Generator
