import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester1() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 1</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/1/sem1/ict" className={styles.crs}>Introduction to ICT</Link>
          <Link href="/semester/1/sem1/ictl" className={styles.crs}>Introduction to ICT-Lab</Link>
          <Link href="/semester/1/sem1/discrete-structure" className={styles.crs}>Discrete Structure</Link>
          <Link href="/semester/1/sem1/statistics" className={styles.crs}>Probability and Statistics</Link>
          <Link href="/semester/1/sem1/english" className={styles.crs}>English Composition & Comprehension</Link>
          <Link href="/semester/1/sem1/applied-physics" className={styles.crs}>Applied Physics</Link>
          <Link href="/semester/1/sem1/math-deficiency" className={styles.crs}>Math Deficiency</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester1