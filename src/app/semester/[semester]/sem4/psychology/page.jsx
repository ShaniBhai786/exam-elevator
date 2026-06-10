"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterFour } from '../../../../components/4/4semesterpastpaper'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { PsychologyCourse } from './outline'

const page = () => {
  const [isSelected, setIsSelected] = useState(false)
    let subject = "Introduction to Psychology";
    return (
        <>
            <div className={styles.container}>
                <h1>Introduction to Psychology</h1>
                <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>Generate with AI</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterFour} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterFour} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ? 
                <AiGenerator CourseOutline={PsychologyCourse} subject={subject} setIsSelected={setIsSelected} /> : null
                }
            <SideBar />
        </>
    )
}

export default page