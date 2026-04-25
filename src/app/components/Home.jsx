"use client"
import React, { useEffect, useState } from 'react'
import styles from "../utills.module.css"
import Link from "next/link"
import Image from 'next/image'
import logo from "../../logo.jpeg"

const Home = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user); 
    setData(parsedUser);
  }
}, []);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1>Welcome to UniSoft Exam Elevator  <span className={styles.plane}>🚀</span></h1>
        <p>
          Empowering students with structured learning, semester-wise resources, 
          and a modern digital experience. 
        </p>

        <div className={styles.btnGroup}>
          <Link href="/semester">
            <button className={styles.primaryBtn}>Explore Semesters</button>
          </Link>

          <Link href="/profile">
            <button className={styles.secondaryBtn}>My Profile</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.features}>
        <div className={styles.card}>
          <h3>📚 Organized Content</h3>
          <p>Access semester-wise subjects and materials in a structured way.</p>
        </div>

        <div className={styles.card}>
          <h3>⚡ Fast & Modern</h3>
          <p>Built with Next.js for high performance and smooth experience.</p>
        </div>

        <div className={styles.card}>
          <h3>🔒 Secure Access</h3>
          <p>Your data and progress are secure and protected.</p>
        </div>
      </div>

    </div>
  )
}

export default Home