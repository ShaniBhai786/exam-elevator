"use client"
import Link from "next/link"
import styles from "../../app/utills.module.css"
import LoginError from "../components/LoginError"

const page = () => {
    const isLoggedIn = localStorage.getItem("user")
    const semesters = [1,2,3,4,5,6,7,8]
    if (isLoggedIn) return (
    <div className={styles.semestersDiv}>
      <h1>BSCS All Semesters</h1>
      <div className={styles.class}>
        {
        semesters.map((value) => {
          return <Link href={`/semester/${value}`} key={value} className={styles.semesters}>Semester: {value}</Link>
        })
      }
      </div>
    </div>
  )
  else return  <LoginError />
}

export default page
