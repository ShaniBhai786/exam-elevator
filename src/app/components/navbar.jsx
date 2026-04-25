"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import styles from "../utills.module.css"
import Image from 'next/image'
import logo from "@/logo.jpeg"
import Profile from './Profile' 
import newLogo from "../../newlogo.png"
import NavLinks from "./NavLinks"

function Navbar() {
  const [user, setUser] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setUser(parsedUser)
    }
  }, [])
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleDropDown = () => {
    setShowNav(showNav === false ? true : false)
  }
  return (
    <>
    <div className={styles.navbar}>
      <i className={`${styles.bars} fa fa-bars`} onClick={handleDropDown}></i>
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
        <button><Image src={user?.Profile || logo} alt='profile' width={50} height={30} className={styles.userImage}/></button>
      </div>
    </div>
    {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
    {showNav && <NavLinks handleDropDown={handleDropDown} />}
    </>
  )
}

export default Navbar
