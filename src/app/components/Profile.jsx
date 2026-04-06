"use client"
import styles from "../utills.module.css"

const Profile = ({setIsProfileOpen}) => {
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
        <h1>Profile Page</h1>
        <p>Welcome to your profile! Here you can view and edit your personal information, manage your account settings, and access your activity history.</p>
        <p>Feel free to explore the various sections of your profile to customize your experience and stay updated with your activities.</p>
        <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default Profile
