import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester7() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 7</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/7/sqa" className={styles.crs}>Software Quality Assurance</Link>
          <Link href="/semester/7/spm" className={styles.crs}>Software Project Management</Link>
          <Link href="/semester/7/tabw" className={styles.crs}>Technical & Business Writing</Link>
          <Link href="/semester/7/nc" className={styles.crs}>Numerical Computing</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester7