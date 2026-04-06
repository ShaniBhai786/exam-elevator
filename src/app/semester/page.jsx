"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import styles from "../../app/utills.module.css"
import LoginError from "../components/LoginError"

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const semesters = [1,2,3,4,5,6,7,8]

  // ⏳ Prevent flicker / SSR mismatch
  if (isLoggedIn === null) {
    return <p>Loading...</p>
  }

  if (!isLoggedIn) {
    return <LoginError />
  }

  return (
    <div className={styles.semestersDiv}>
      <h1>BSCS All Semesters</h1>

      <div className={styles.class}>
        {semesters.map((value) => (
          <Link
            href={`/semester/${value}`}
            key={value}
            className={styles.semesters}
          >
            Semester: {value}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page