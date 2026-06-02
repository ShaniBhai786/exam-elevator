import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester6() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 6</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/6/sem6/computer-networks" className={styles.crs}>Introduction to Computer Networks</Link>
          <Link href="/semester/6/sem6/computer-networks-lab" className={styles.crs}>Computer Networks Lab</Link>
          <Link href="/semester/6/sem6/pdc" className={styles.crs}>Parallel and Distributed Computing</Link>
          <Link href="/semester/6/sem6/EAD" className={styles.crs}>Enterprise Application Development</Link>
          <Link href="/semester/6/sem6/mobile-application" className={styles.crs}>Mobile Application Development</Link>
          <Link href="/semester/6/sem6/artificial-intelligence" className={styles.crs}>Artificial Intelligence</Link>
          <Link href="/semester/6/sem6/artificial-intelligence-lab" className={styles.crs}>Artificial Intelligence Lab</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester6