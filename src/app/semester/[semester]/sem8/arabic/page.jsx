"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterEight } from '../../../../components/8/8thSemesterPastpaper'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
// import { NumericalComputing } from './outline'
import { ArabicLanguageCourse } from './outline'

const page = () => {
    const [isSelected, setIsSelected] = useState(false)
  let subject = "Arabic language";
  return (
    <>
    <div className={styles.container}>
      <h1>Arabic Language</h1>
      <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generated</button>
                </div>
            </div>
      {
        isSelected === 1 ?
          <Selector semesterSeven={semesterEight} subject={subject} setIsSelected={setIsSelected} /> :
          isSelected === 2 ?
            <Generator semesterSeven={semesterEight} subject={subject} setIsSelected={setIsSelected} /> :
            isSelected === 3 ?
              <AiGenerator subject={subject} CourseOutline={ArabicLanguageCourse} setIsSelected={setIsSelected} /> : null
      }
      <SideBar />
    </>
  )
}

export default page
