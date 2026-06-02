import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester5() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 5</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/5/sem5/os" className={styles.crs}>Introduction to Operating Systems</Link>
          <Link href="/semester/5/sem5/os-lab" className={styles.crs}>Operating Systems Lab</Link>
          <Link href="/semester/5/sem5/algorithm" className={styles.crs}>Algorithm Design and Analysis</Link>
          <Link href="/semester/5/sem5/compiler-construction" className={styles.crs}>Compiler Construction</Link>
          <Link href="/semester/5/sem5/database" className={styles.crs}>Database Management Systems</Link>
          <Link href="/semester/5/sem5/database-lab" className={styles.crs}>Database Management Systems Lab</Link>
          <Link href="/semester/5/sem5/web-tech" className={styles.crs}>Web Technologies</Link>
          <Link href="/semester/5/sem5/web-tech-lab" className={styles.crs}>Web Technologies Lab</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester5