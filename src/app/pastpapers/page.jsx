"use client";

import React from "react";
import Link from "next/link";
import styles from "../utills.module.css";

const papers = [
  {
    id: 1,
    title: "Applied Physics",
    semester: "Semester 1",
    year: "2025",
  },
  {
    id: 2,
    title: "Introduction to ICT",
    semester: "Semester 1",
    year: "2024",
  },
  {
    id: 3,
    title: "Probability & Statistics",
    semester: "Semester 1",
    year: "2025",
  },
];

function page() {
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
        {papers.map((paper) => (
          <div key={paper.id} className={styles.paperCard}>
            <span className={styles.paperSemester}>
              {paper.semester}
            </span>

            <h2>{paper.title}</h2>

            <p>Examination Year: {paper.year}</p>

            <Link
              href={`/pastpapers/${paper.id}`}
              className={styles.paperBtn}
            >
              View Paper
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;