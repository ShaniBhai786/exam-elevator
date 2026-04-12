"use client";

import React from "react";
import styles from "../utills.module.css"; 

function ContactUs() {
  return (
    <div className={styles.contactus} id="contact">
      <div className={styles.contactHeader}>
        <h2>Contact Us</h2>
        <p>
          Have a project in mind or need a software solution? Our team at
          <span className={styles.brand}> uniSoft</span> is ready to help you build something amazing.
        </p>
      </div>

      <div className={styles.contactInfo}>
        <div className={styles.contactCard}>
          <h3>Email</h3>
          <a href="mailto:unisoftpvt@gmail.com">
            unisoftpvt@gmail.com
          </a>
        </div>

        <div className={styles.contactCard}>
          <h3>Phone</h3>
          <a href="tel:+923053019712">
            +92 305 3019712
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;