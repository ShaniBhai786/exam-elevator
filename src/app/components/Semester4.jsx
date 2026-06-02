import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester4() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 4</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/4/sem4/psychology" className={styles.crs}>Introduction to Psychology</Link>
          <Link href="/semester/4/sem4/calculas" className={styles.crs}>Multivariate Calculus</Link>
          <Link href="/semester/4/sem4/software-engineering" className={styles.crs}>Software Engineering</Link>
          <Link href="/semester/4/sem4/toa" className={styles.crs}>Theory of Automata</Link>
          <Link href="/semester/4/sem4/dsa" className={styles.crs}>Data Structures and Algorithms</Link>
          <Link href="/semester/4/sem4/dsa-lab" className={styles.crs}>Data Structures and Algorithms Lab</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester4