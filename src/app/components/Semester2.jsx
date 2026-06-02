import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester2() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 2</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/2/sem2/DLD" className={styles.crs}>Digital Logic Design</Link>
          <Link href="/semester/2/sem2/DLD-Lab" className={styles.crs}>Digital Logic Design-Lab</Link>
          <Link href="/semester/2/sem2/islamic-studies" className={styles.crs}>Islamic Studies</Link>
          <Link href="/semester/2/sem2/communication-skills" className={styles.crs}>Communication Skills</Link>
          <Link href="/semester/2/sem2/linear-algebra" className={styles.crs}>Linear Algebra</Link>
          <Link href="/semester/2/sem2/pak-study" className={styles.crs}>Pakistan Studies</Link>
          <Link href="/semester/2/sem2/PF" className={styles.crs}>Programming Fundamentals</Link>
          <Link href="/semester/2/sem2/PF-Lab" className={styles.crs}>Programming Fundamentals Labs</Link>
          <Link href="/semester/2/sem2/math-deficiency-2" className={styles.crs}>Math Deficiency II</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester2