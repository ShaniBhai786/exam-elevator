import React from 'react'
import styles from '../utills.module.css'
import Link from 'next/link'

function Semester3() {
  return (
    <div className={styles.semestersDiv}>
      <h1>Welcome to BSCS Semester 3</h1>
      <div className={styles.coursesCard}>
        <h1>Courses</h1>
        <div className={styles.courses}>
          <Link href="/semester/3/sem3/assembly-language" className={styles.crs}>Assembly Language</Link>
          <Link href="/semester/3/sem3/assembly-language-lab" className={styles.crs}>Assembly Language Lab</Link>
          <Link href="/semester/3/sem3/economics" className={styles.crs}>Introduction to Economics</Link>
          <Link href="/semester/3/sem3/oop" className={styles.crs}>Object-Oriented Programming</Link>
          <Link href="/semester/3/sem3/oop-lab" className={styles.crs}>Object-Oriented Programming Lab</Link>
          <Link href="/semester/3/sem3/calculas" className={styles.crs}>Calculas and Analytical Geometry</Link>
          <Link href="/semester/3/sem3/professional-practices" className={styles.crs}>Professional Practices</Link>
        </div>
      </div>
    </div>
  )
}

export default Semester3