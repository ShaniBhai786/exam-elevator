"use client"
import React, { useState } from 'react'
import styles from '../../../../utills.module.css'
import { semesterSeven } from "../../../../components/7/7thsemsterpastpaper"
import SideBar from '../../../../components/SideBar'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
// import { NumericalComputing } from './outline'
import { ParallelDistributedCloudComputing } from "./outline"

const page = () => {
        const [isSelected, setIsSelected] = useState(false)
    let subject = "parallel distributed cloud computing";
    return (
        <>
        <div className={styles.container}>
            <h1>Parallel Distributed Cloud Computing</h1>
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
                            <AiGenerator subject={subject} CourseOutline={ParallelDistributedCloudComputing} setIsSelected={setIsSelected} /> :
                <div className={styles.container}>
                    <h2>Please select a method to generate the question paper.</h2>
                </div>
                }
        <SideBar />
        </>
    )
}

export default page