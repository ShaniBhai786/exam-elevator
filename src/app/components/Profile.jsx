"use client";
import styles from "../utills.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/logo.jpeg";
import Link from "next/link";

const Profile = ({ setIsProfileOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [masterUser, setMasterUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      setMasterUser(parsedUser);
    }
    if (parsedUser) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogOut = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("No user is currently logged in.");
      return;
    }
    localStorage.removeItem("user");
    alert("Logout Successful!");
    window.location.href = "/";
  };
  return (
    <div className={styles.profileContainer}>
      <i
        className={`fa fa-close ${styles.close}`}
        onClick={() => setIsProfileOpen(false)}
      ></i>
      <div className={styles.userInfo}>
        {isLoggedIn ? (
          <>
            <Image src={masterUser.Profile} width={1024} height={768} className={styles.image} alt="profile" />
            <Link href="/profile">
            <h3 className={styles.profileName}>{masterUser.subscription === "verified" ? (
              <>
              {masterUser.fullName}{" "} <i className="fa fa-circle-check"></i>
              </>
            ): (masterUser.subscription)}</h3>
            </Link>

            <h3>{masterUser.email}</h3>
            <p className={styles.subscription}><span>{masterUser.subscription} <i className="fa-solid fa-circle-check"></i></span>{" "} <span className={styles.userRole}><span>{masterUser.userRole}</span></span></p>
          </>
        ) : (
          "user not logged in!"
        )}
      </div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default Profile;
