"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import { semesterFive } from "../../../../components/5/5semesterpastpaper"
import SideBar from '../../../../components/SideBar'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { JavaWebProgrammingCourse } from './outline'

const page = () => {
  const [isSelected, setIsSelected] = useState(false)
    let subject = "Web Technologies";
    return (
        <>
            <div className={styles.container}>
                <h1>Web Technologies Lab</h1>
                <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>Generate with AI</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterFive} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterFive} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ? 
                <AiGenerator CourseOutline={JavaWebProgrammingCourse} subject={subject} setIsSelected={setIsSelected} /> : null
                }
            <SideBar />
        </>
    )
}

export default page