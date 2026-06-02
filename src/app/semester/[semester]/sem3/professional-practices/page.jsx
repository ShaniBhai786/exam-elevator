"use client"
import React, { useState } from 'react'
import styles from '../../../../utills.module.css'
import { semesterSeven } from "../../../../components/7/7thsemsterpastpaper"
import SideBar from '../../../../components/SideBar'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { SoftwareEngineeringEthicsCourse } from './outline'

const page = () => {
    const [isSelected, setIsSelected] = useState(false)
    let subject = "professional practices";
    return (
        <>
        <div className={styles.container}>
            <h1>Professional Practices</h1>
            <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generated</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterSeven} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterSeven} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ?
                <AiGenerator CourseOutline={SoftwareEngineeringEthicsCourse} subject={subject} setIsSelected={setIsSelected} /> : null
                }
        <SideBar />
        </>
    )
}

export default page