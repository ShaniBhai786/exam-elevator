"use client"
import React, {useState} from 'react'
import styles from '../../../../utills.module.css'
import SideBar from '../../../../components/SideBar'
import { semesterThree } from '../../../../components/3/semesterThree'
import Selector from '../../Selector'
import Generator from '../../Generator'
import AiGenerator from '../../AiGenerator'
import { EconomicsCourse } from './outline'

const page = () => {
    const [isSelected, setIsSelected] = useState(false)
  let subject = "Introduction to Economics"
  return (
    <>
    <div className={styles.container}>
      <h1>Introduction to Economics</h1>
      <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                    <button onClick={() => setIsSelected(3)}>AI-Generated</button>
                </div>
            </div>
      {
        isSelected === 1 ?
          <Selector semesterSeven={semesterThree} subject={subject} setIsSelected={setIsSelected} /> :
          isSelected === 2 ?
            <Generator semesterSeven={semesterThree} subject={subject} setIsSelected={setIsSelected} /> :
            isSelected === 3 ?
              <AiGenerator subject={subject} CourseOutline={EconomicsCourse} setIsSelected={setIsSelected} /> : null
      }
      <SideBar />
    </>
  )
}

export default page
