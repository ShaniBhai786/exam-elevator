import React from 'react'
import Semester1 from "../../components/Semester1"
import Semester2 from "../../components/Semester2"
import Semester3 from "../../components/Semester3"
import Semester4 from "../../components/Semester4"
import Semester5 from "../../components/Semester5"
import Semester6 from "../../components/Semester6"
import Semester7 from "../../components/Semester7"
import Semester8 from "../../components/Semester8"
import SideBar from '../../components/SideBar'

const Page = async ({ params }) => {
  const { semester } = await params
  
  return (
    <div>
      {
      semester === "1" ? <><SideBar /><Semester1 /></> :
      semester === "2" ? <><SideBar /><Semester2 /></> :
      semester === "3" ? <><SideBar /><Semester3 /></> :
      semester === "4" ? <><SideBar /><Semester4 /></> :
      semester === "5" ? <><SideBar /><Semester5 /></> :
      semester === "6" ? <><SideBar /><Semester6 /></> :
      semester === "7" ? <><SideBar /><Semester7 /></> :
      semester === "8" ? <><SideBar /><Semester8 /></> :
      <h1>Invalid Semester</h1>
      }
    </div>
  )
}

export default Page