import React from 'react'
import Link from "next/link"
import styles from "../utills.module.css"

const NavLinks = ({handleDropDown}) => {
  return (
    <div>
      <nav className={styles.navLinks} onClick={handleDropDown}>
        <Link className={styles.links} onClick={handleDropDown} href="/">
        <i className="fa-solid fa-house"></i> HOME
        </Link>
        <Link className={styles.links} onClick={handleDropDown} href="/contact">
        <i className="fa-solid fa-phone"></i> CONTACTS
        </Link>
        <Link className={styles.links} onClick={handleDropDown} href="/pastpapers">
        <i className="fa-solid fa-info-circle"></i> Past-Papers
        </Link>
        <Link className={styles.links} onClick={handleDropDown} href="/blogs">
        <i className="fa-solid fa-blog"></i> BLOGS
        </Link>
        <Link className={styles.links} onClick={handleDropDown} href="/semester">
        <i className="fa-solid fa-school"></i> Semesters
        </Link>
      </nav>
    </div>
  )
}

export default NavLinks
