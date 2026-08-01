"use client";

import React, { useState } from "react";
import styles from "../../../../utills.module.css";
import SideBar from "../../../../components/SideBar";
import { semesterThree } from "../../../../components/3/semesterThree";
import PaperFormat from "../../PaperFormat";

const Page = () => {
    const [paper, setPaper] = useState(null);

    const subject = "Professional Practice";

    const openPaper = (year, term) => {
        const questions = semesterThree.filter(
            (q) =>
                q.Subject === subject &&
                q.year === year &&
                q.term.toLowerCase() === term.toLowerCase()
        );

        const shortQuestions = questions.filter(
            (q) => q.category === "short" && q.question
        );

        const longQuestions = questions.filter(
            (q) => q.category === "long" && q.question
        );

        setPaper({
            year,
            term,
            shortQuestions,
            longQuestions,
            noSQs: shortQuestions.length,
            noLQs: longQuestions.length,
            shortMarks: shortQuestions[0]?.marks || 0,
            longMarks: longQuestions[0]?.marks || 0,
        });
    };

    return (
        <>
            <SideBar />

            <div className={styles.container}>
                <span className={styles.badge}>Past Papers</span>

                <h1>{subject}</h1>

                <div className={styles.selection}>
                    
                    <button onClick={() => openPaper(2023, "Fall")}>
                        Fall 2023
                    </button>

                </div>
            </div>

            {paper && (
                <PaperFormat
                    shortQuestions={paper.shortQuestions}
                    longQuestions={paper.longQuestions}
                    setDisplay={() => setPaper(null)}
                    subject={subject}
                    year={paper.year}
                    term={paper.term}
                    noSQs={paper.noSQs}
                    noLQs={paper.noLQs}
                    shortMarks={paper.shortMarks}
                    longMarks={paper.longMarks}
                />
            )}
        </>
    );
};

export default Page;