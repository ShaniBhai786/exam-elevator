import React from 'react'
import styles from '../../utills.module.css'
import Link from 'next/link'

function Semester2() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 2</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/pastpapers/2/sem2/DLD" className={styles.crs}>Digital Logic Design</Link>
          <Link href="/pastpapers/2/sem2/islamic-studies" className={styles.crs}>Islamic Studies</Link>
          <Link href="/pastpapers/2/sem2/communication-skills" className={styles.crs}>Communication Skills</Link>
          <Link href="/pastpapers/2/sem2/linear-algebra" className={styles.crs}>Linear Algebra</Link>
          <Link href="/pastpapers/2/sem2/pak-study" className={styles.crs}>Pakistan Studies</Link>
          <Link href="/pastpapers/2/sem2/PF" className={styles.crs}>Programming Fundamentals</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester2