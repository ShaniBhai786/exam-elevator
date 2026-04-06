import React from 'react'
import Semester1 from "../../components/Semester1"
import Semester2 from "../../components/Semester2"
import Semester3 from "../../components/Semester3"
import Semester4 from "../../components/Semester4"
import Semester5 from "../../components/Semester5"
import Semester6 from "../../components/Semester6"
import Semester7 from "../../components/Semester7"
import Semester8 from "../../components/Semester8"

const Page = async ({ params }) => {
  const { semester } = await params
  
  return (
    <div>
      {
      semester === "1" ? <Semester1 /> :
      semester === "2" ? <Semester2 /> :
      semester === "3" ? <Semester3 /> :
      semester === "4" ? <Semester4 /> :
      semester === "5" ? <Semester5 /> :
      semester === "6" ? <Semester6 /> :
      semester === "7" ? <Semester7 /> :
      semester === "8" ? <Semester8 /> :
      <h1>Invalid Semester</h1>
      }
    </div>
  )
}

export default Page