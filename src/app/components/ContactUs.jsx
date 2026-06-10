"use client";

import React from "react";
import styles from "../utills.module.css";

function ContactUs() {
  return (
    <div className={styles.contactus}>
      <div className={styles.contactHeader}>
        <span className={styles.contactTag}>
          Let's Connect
        </span>

        <h2>Get in Touch</h2>

        <p>
          Have a project in mind or need a software solution?
          Our team at
          <span className={styles.brand}> UniSoft </span>
          is ready to transform your ideas into reality.
        </p>
      </div>

      <div className={styles.contactInfo}>
        <div className={styles.contactCard}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-envelope"></i>
          </div>

          <div>
            <span>Email Us</span>

            <a href="mailto:unisoftpvt@gmail.com">
              unisoftpvt@gmail.com
            </a>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-phone"></i>
          </div>

          <div>
            <span>Call Us</span>

            <a href="tel:+923053019712">
              +92 305 3019712
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;