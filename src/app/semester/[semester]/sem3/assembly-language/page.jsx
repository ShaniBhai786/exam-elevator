"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterThree } from '../../../../components/3/semesterThree'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { ComputerSystemsArchitectureCourse } from './outline'

const page = () => {
  const [isSelected, setIsSelected] = useState(false)
    let subject = "Computer Organization & Assembly Language";
    return (
        <>
            <div className={styles.container}>
                <h1>Assembly Language and Computer Architecture</h1>
                <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>Generate with AI</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterThree} subject={subject} setIsSelected={setIsSelected} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterThree} subject={subject} setIsSelected={setIsSelected} /> : 
                isSelected === 3 ? 
                <AiGenerator CourseOutline={ComputerSystemsArchitectureCourse} subject={subject} setIsSelected={setIsSelected} /> : null
                }
            <SideBar />
        </>
    )
}

export default page