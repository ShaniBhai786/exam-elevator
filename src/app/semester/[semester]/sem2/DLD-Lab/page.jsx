"use client"
import React, { useState } from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterTwo } from '../../../../components/2/semesterTwo'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { DigitalLogicDesignCourse } from './outline'


const page = () => {
    const [isSelected, setIsSelected] = useState(false)
    let subject = "Digital Logic Design";
    return (
        <>
            <div className={styles.container}>
                <h1>Digital Logic Design Lab</h1>
                <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>Generate with AI</button>
                </div>
            </div>
            {
                isSelected === 1 ?
                    <Selector semesterSeven={semesterTwo} subject={subject} setIsSelected={setIsSelected} /> :
                    isSelected === 2 ?
                        <Generator semesterSeven={semesterTwo} subject={subject} setIsSelected={setIsSelected} /> :
                        isSelected === 3 ?
                            <AiGenerator CourseOutline={DigitalLogicDesignCourse} subject={subject} setIsSelected={setIsSelected} /> : null
            }
            <SideBar />
        </>
    )
}

export default page