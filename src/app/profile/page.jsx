"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../utills.module.css";
import logo from "@/logo.jpeg"

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className={styles.userProfileContainer}>
  <div className={styles.userProfileCard}>

    <div className={styles.imageWrapper}>
      <Image
        src={user?.Profile}
        alt="Profile"
        width={120}
        height={120}
        className={styles.image}
      />
    </div>

    <h2 className={styles.name}>
      {user?.fullName}
      {user?.subscription === "verified" && (
        <span className={styles.badge}>✔</span>
      )}
    </h2>

    <p className={styles.role}>{user?.userRole}</p>

    <div className={styles.infoBox}>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Contact:</strong> {user?.Contact}</p>
      <p><strong>CNIC:</strong> {user?.CNIC}</p>
      <p><strong>Subscription:</strong> {user?.subscription}</p>
    </div>

    <div className={styles.btnGroup}>
      <button className={styles.editBtn}>Edit Profile</button>
      <button className={styles.logoutBtn}>Logout</button>
    </div>

  </div>
</div>
  );
};

export default Page;
