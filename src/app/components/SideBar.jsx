"use client"

import React, { useRef, useState } from 'react'
import styles from "../utills.module.css"
import Link from "next/link"

const SideBar = () => {
    const [openNav, setOpenNav] = useState(false)
    const [arrow, setArrow] = useState("right")
    let sideBar = useRef()
    const handleSideBar = () => {
        if (sideBar.current) {
            sideBar.current.classList.toggle(styles.active)
        }
        setArrow(arrow === "left" ? "right" : "left")
    }
  return (
    <div className={styles.newSideBar}>
        <div className={styles.sideBar} ref={sideBar}>
        <div className={styles.topSection}>
            <h1>UNISOFT EXAM ELEVATOR</h1>
        </div>
        <div className={styles.sideMenu} >
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}><p>Generate Paper</p></div></Link>
            <Link href="/saved-papers" className={styles.sideButtons}><i className='fa fa-save'></i><div className={styles.sideLinks}><p>Saved Papers</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-gear'></i><div className={styles.sideLinks}><p>Default Settings</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}  ><p>Generate</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}  ><p>Generate</p></div></Link>
        </div>
        <i className={`fa fa-arrow-${arrow} ${styles.openArrow}`} onClick={handleSideBar}></i>
    </div>
    </div>
)
}

export default SideBar
