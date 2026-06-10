"use client";

import React, { useState } from "react";
import styles from "../utills.module.css";
import Link from "next/link";

const SideBar = () => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.newSideBar}>
            <div className={`${styles.sideBar} ${open ? styles.active : ""}`}>

                {/* TOGGLE BUTTON */}
                <div className={styles.header}>
                    <button className={styles.toggleBtn} onClick={toggleSidebar}>
                        {/* {open ? "⮜" : "⮞"} */}
                        <i className="fa fa-bars bars"></i>
                    </button>

                    <div className={styles.topSection}>
                        <h1>UNISOFT EXAM ELEVATOR</h1>
                    </div>
                </div>

                <div className={styles.sideMenu}>
                    <Link href="/semester" className={styles.sideButtons}>
                        <i className="fa fa-print"></i>
                        <div className={styles.sideLinks}><p>Generate Paper</p></div>
                    </Link>

                    <Link href="/saved-papers" className={styles.sideButtons}>
                        <i className="fa fa-save"></i>
                        <div className={styles.sideLinks}><p>Saved Papers</p></div>
                    </Link>

                    <Link href="/semester" className={styles.sideButtons}>
                        <i className="fa fa-gear"></i>
                        <div className={styles.sideLinks}><p>Settings</p></div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;