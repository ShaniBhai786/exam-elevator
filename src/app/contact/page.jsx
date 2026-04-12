"use client";

import React, { useState } from "react";
import Feedback from "../components/Feedback";
import ContactUs from "../components/ContactUs";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import styles from "../utills.module.css"; 

function Contact() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      {/* Back Icon */}

      <div className={styles.contact} id="contact">
      <i
        className={`fa-solid fa-arrow-left ${styles.backIcon}`}
        title="Back"
        onClick={handleBackClick}
      ></i>
        <div className={styles.feedback}>
          <Feedback setLoading={setLoading} />
        </div>

        <div className={styles.contactUs}>
          <ContactUs />
        </div>

        {loading && <Loading />}
      </div>
    </>
  );
}

export default Contact;