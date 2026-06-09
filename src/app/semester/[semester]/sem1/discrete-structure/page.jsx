"use client"
import React, { useState } from 'react'
import styles from '../../../../utills.module.css'
import { semesterOne } from '../../../../components/1/semesterOne'
import SideBar from '../../../../components/SideBar'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { DiscreteMathematicsCourse } from "./outline"

const page = () => {
        const [isSelected, setIsSelected] = useState(false)
    let subject = "Discrete Structures";
    return (
        <>
        <div className={styles.container}>
            <h1>Discrete Structure</h1>
            <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generation</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterOne} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterOne} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ?
                            <AiGenerator subject={subject} CourseOutline={DiscreteMathematicsCourse} setIsSelected={setIsSelected} /> :
                <div className={styles.container}>
                    <h2>Please select a method to generate the question paper.</h2>
                </div>
                }
        <SideBar />
        </>
    )
}

export default page