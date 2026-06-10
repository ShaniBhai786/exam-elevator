"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../utills.module.css";
import Image from "next/image";
import logo from "@/logo.jpeg";
import Profile from "./Profile";
import NavLinks from "./NavLinks";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleDropDown = () => {
    setShowNav((prev) => !prev);
  };

  const profileImg = user?.Profile ? user.Profile : logo;

  return (
    <>
      <div className={styles.navbar}>

        {/* HAMBURGER */}
        <span><i
          className={`fa fa-bars ${styles.barsBtn}`}
          onClick={handleDropDown}
        ></i></span>

        {/* LOGO SECTION */}
        <div className={styles.logoSection}>
          <div className={styles.logoDiv}>
            <Link href="/">
              <Image src={logo} alt="logo" className={styles.logo} />
            </Link>
          </div>

          <div className={styles.titleDiv}>
            <h2>
              <Link href="/">UniSoft Exam Elevator</Link>
            </h2>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <Link className={styles.links} href="/">
            <i className="fa-solid fa-house"></i> HOME
          </Link>

          <Link className={styles.links} href="/contact">
            <i className="fa-solid fa-phone"></i> CONTACTS
          </Link>

          <Link className={styles.links} href="/pastpapers">
            <i className="fa-solid fa-info-circle"></i> Past-Papers
          </Link>

          <Link className={styles.links} href="/blogs">
            <i className="fa-solid fa-blog"></i> BLOGS
          </Link>

          <Link className={styles.links} href="/semester">
            <i className="fa-solid fa-school"></i> Semesters
          </Link>
        </nav>

        {/* PROFILE */}
        <div className={styles.heroBtn} onClick={toggleProfile}>
          <button>
            <Image
              src={profileImg}
              alt="profile"
              width={45}
              height={45}
              className={styles.userImage}
            />
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {showNav && (
        <div className={styles.mobileNav}>
          <NavLinks handleDropDown={handleDropDown} />
        </div>
      )}

      {/* PROFILE MODAL */}
      {isProfileOpen && <Profile setIsProfileOpen={setIsProfileOpen} />}
    </>
  );
}

export default Navbar;