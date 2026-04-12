import React from 'react'
import styles from '../../../utills.module.css'
import Generator from '../Generator'
import { semesterSeven } from '../../../components/7/7thsemsterpastpaper'
import SideBar from '../../../components/SideBar'

const page = () => {
    let subject = "software quality assurance";
    return (
        <>
        <div className={styles.container}>
            <h1>Software Quality Assurance</h1>
            <Generator semesterSeven={semesterSeven} subject={subject} />
        </div>
        <SideBar />
        </>
    )
}

export default page