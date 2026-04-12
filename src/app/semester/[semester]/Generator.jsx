"use client"

import React, { useState } from 'react'
import styles from '../../utills.module.css'

const Generator = ({semesterSeven, subject}) => {
    const [shortQuestions, setShortQuestions] = useState([])
    const [longQuestions, setLongQuestions] = useState([])
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
      <div className={styles.generator}>
        <h2>Short Questions</h2>
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
                                    <label htmlFor={item.question} className={styles.question}>{item.question} {item.year}</label>
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
        <h2>Long Questions</h2>
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
                                    <label htmlFor={item.question} className={styles.question}>{item.question}{item.year}</label>
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
  )
}

export default Generator
