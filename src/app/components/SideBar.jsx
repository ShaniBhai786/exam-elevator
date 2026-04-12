"use client"

import React, { useRef, useState } from 'react'
import styles from "../utills.module.css"
import Link from "next/link"

const SideBar = () => {
    const [openNav, setOpenNav] = useState(false)
    let sideBar = useRef()
    const handleSideBar = () => {
        if (sideBar.current) {
            sideBar.current.classList.toggle(styles.active)
        }
    }
  return (
    <div className={styles.sideBar} ref={sideBar}>
        <div className={styles.topSection}>
            <i className={`fa fa-bars ${styles.bars}`} onClick={handleSideBar}></i>
        </div>
        <div className={styles.sideMenu} >
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}><p>Generate Paper</p></div></Link>
            <Link href="/saved-papers" className={styles.sideButtons}><i className='fa fa-save'></i><div className={styles.sideLinks}><p>Saved Papers</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-gear'></i><div className={styles.sideLinks}><p>Default Settings</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}  ><p>Generate</p></div></Link>
            <Link href="/semester" className={styles.sideButtons}><i className='fa fa-print'></i><div className={styles.sideLinks}  ><p>Generate</p></div></Link>
        </div>
    </div>
)
}

export default SideBar
