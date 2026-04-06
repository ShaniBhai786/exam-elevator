"use client"

import React, { useState } from 'react'
import Link from "next/link"
import styles from "../utills.module.css"
import Image from 'next/image'
import logo from "@/logo.jpeg"
import Profile from './Profile'

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <>
    <div className={styles.navbar}>
    <div className={styles.logoSection}>
      <div className={styles.logoDiv}>
        <Link href="/"><Image src={logo} alt='logo' className={styles.logo} /></Link>
      </div>
      <div className={styles.titleDiv}>
        <h2><Link href="/">UniSoft Exam Elevator</Link></h2>
      </div>
    </div>
      <nav className={styles.nav}>
        <Link className={styles.links} href="/">
        <i className="fa-solid fa-house"></i> HOME
        </Link>
        <Link className={styles.links} href="/contact">
        <i className="fa-solid fa-phone"></i> CONTACTS
        </Link>
        <Link className={styles.links} href="/pastpapers">
        <i className="fa-solid fa-info-circle"></i> Past-Papers
        </Link>
        <Link className={styles.links} href="/blogs">
        <i className="fa-solid fa-blog"></i> BLOGS
        </Link>
        <Link className={styles.links} href="/semester">
        <i className="fa-solid fa-school"></i> Semesters
        </Link>
      </nav>
      <div className={styles.heroBtn} onClick={toggleProfile}>
        <button>Profile</button>
      </div>
    </div>
    {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
    </>
  )
}

export default Navbar
