import React from 'react'
import Image from 'next/image'
import styles from "../utills.module.css"
import logo from "../../logo.jpeg"

function Loading() {
  return (
    <>
     <div className={styles.loading_container}>
        <div className={styles.loading}>
            <div className={styles.imgload}><Image src={logo} alt="" /></div>
                <div className={styles.dotsDiv}>
                    <span>Working on it</span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
        </div>
     </div> 
    </>
  )
}

export default Loading
