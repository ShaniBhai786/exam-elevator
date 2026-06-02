import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester8() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 8</h1>
        <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/8/sem8/arabic" className={styles.crs}>Arabic Language</Link>
          <Link href="/semester/8/sem8/information-security" className={styles.crs}>Information Security</Link>
          <Link href="/semester/8/sem8/pom" className={styles.crs}>Principles of Management</Link>
          <Link href="/semester/8/sem8/social-services" className={styles.crs}>Social Services</Link>
          <Link href="/semester/8/sem8/topl" className={styles.crs}>Theory of Programming Languages</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester8