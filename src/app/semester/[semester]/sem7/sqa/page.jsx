"use client"
import React, { useState } from 'react'
import styles from '../../../../utills.module.css'
import { semesterSeven } from "../../../../components/7/7thsemsterpastpaper"
import SideBar from '../../../../components/SideBar'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
// import { NumericalComputing } from './outline'
import { SoftwareTestingAndQualityAssurance } from "./outline"

const page = () => {
        const [isSelected, setIsSelected] = useState(false)
    let subject = "software quality assurance";
    return (
        <>
        <div className={styles.container}>
            <h1>Software Quality Assurance</h1>
            <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generation</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterSeven} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterSeven} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ?
                            <AiGenerator subject={subject} CourseOutline={SoftwareTestingAndQualityAssurance} setIsSelected={setIsSelected} /> :
                <div className={styles.container}>
                    <h2>Please select a method to generate the question paper.</h2>
                </div>
                }
        <SideBar />
        </>
    )
}

export default page