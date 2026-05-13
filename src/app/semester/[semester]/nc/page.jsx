"use client"
import React, {useState} from 'react'
import styles from '../../../utills.module.css'
import { semesterSeven } from '../../../components/7/7thsemsterpastpaper'
import SideBar from '../../../components/SideBar'
import Selector from '../Selector'
import Generator from '../Generator'

const page = () => {
  const [isSelected, setIsSelected] = useState(false)
    let subject = "numerical computing";
    return (
        <>
            <div className={styles.container}>
                <h1>Numerical Computing</h1>
                <div className={styles.selection}>
                    <button onClick={() => setIsSelected(1)}>Self-Selection</button>
                    <button onClick={() => setIsSelected(2)}>Random-Selection</button>
                </div>
            </div>
                {
                isSelected === 1 ? 
                <Selector semesterSeven={semesterSeven} subject={subject} /> :
                isSelected === 2 ?
                <Generator semesterSeven={semesterSeven} subject={subject}/> : null
                }
            <SideBar />
        </>
    )
}

export default page