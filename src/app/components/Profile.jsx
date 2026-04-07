"use client"
import styles from "../utills.module.css"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import logo from "@/logo.jpeg"

const Profile = ({setIsProfileOpen}) => {
  const [masterUser, setMasterUser] = useState("")
  useEffect(() => {
    const masterUser = localStorage.getItem("masterUser")
    console.log("Master User:", masterUser) // Debugging log
  if (masterUser) {
    setMasterUser(masterUser)
  }
  })
    const handleLogOut = () => {
      const user = localStorage.getItem("user")
      if (!user) {
        alert("No user is currently logged in.")
        return
      }
        localStorage.removeItem("user")
        alert("Logout Successful!")
        window.location.href = "/"
    }
  return (
      <div className={styles.profileContainer}>
        <i className={`fa fa-close ${styles.close}`} onClick={()=>setIsProfileOpen(false)}></i>
        <div className={styles.userInfo}>
          <Image src={logo} className={styles.image} alt="profile" />
          <h3 className={styles.profileName}>{masterUser}</h3>
        </div>
        <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Profile
