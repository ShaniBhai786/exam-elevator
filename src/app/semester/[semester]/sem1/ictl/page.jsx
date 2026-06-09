"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterOne } from '../../../../components/1/semesterOne'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { ITSkillsAndProductivityCourse } from './outline'

const page = () => {
    const [isSelected, setIsSelected] = useState(false)
    let subject = "introduction to ICT"
  return (
    <>
    <div className={styles.container}>
      <h1>Introduction to ICT-Lab</h1>
      <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generated</button>
                </div>
            </div>
      {
        isSelected === 1 ?
          <Selector semesterSeven={semesterOne} subject={subject} setIsSelected={setIsSelected} /> :
          isSelected === 2 ?
            <Generator semesterSeven={semesterOne} subject={subject} setIsSelected={setIsSelected} /> :
            isSelected === 3 ?
              <AiGenerator subject={subject} CourseOutline={ITSkillsAndProductivityCourse} setIsSelected={setIsSelected} /> : null
      }
      <SideBar />
    </>
  )
}

export default page
