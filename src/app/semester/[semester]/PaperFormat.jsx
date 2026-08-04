"use client";

import React, { useEffect, useState } from "react";
import styles from "../../utills.module.css";
import Image from "next/image";
import logo from "../../../logo.jpeg"

const PaperFormat = ({ owner, shortQuestions = [], longQuestions = [], setDisplay, subject, noSQs, noLQs, shortMarks, longMarks, paperId }) => {
  const [savedPaperId, setSavedPaperId] = useState(paperId || null);
  const [savedUser, setSavedUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("user not found!")
    }
    try {
      const userId =
        user?._id ||
        user?.id ||
        user?.user?._id ||
        user?.user?.id;

      if (!userId) {
        console.error("User ID not found:", user);
        return;
      }

      const res = await fetch(`/api/users/${userId}`);      
      const data = await res.json()
      if (data.success) {
        setSavedUser(data.user)
      }
    } catch (error) {
      console.log("Fetching user Error", error)
    }  
   } 
   fetchUser()
  }, [])

  const currentDate = new Date().toLocaleString();
  const handlePrint = () => {
    window.print()
  }
  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      const paper = {
        userId: user._id || user.id,
        subject,
        shortQuestions,
        longQuestions,
        noSQs,
        noLQs,
        shortMarks,
        longMarks,
        year: new Date().getFullYear().toString(),
        semester: "1",
        term: "Mid",
      };

      // save paper...
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = async () => {
    const id = savedPaperId || paperId;

    if (!id) {
      alert("Please save the paper before sharing.");
      return;
    }

    const email = prompt("Enter recipient's email:");
    if (!email) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/papers/${id}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to share paper");
      }

      alert(data.message || "Paper shared successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    }
  };
  return (
    <div className={styles.paperWrapper}>
        <i className={`fa fa-close ${styles.closeIcon} `} onClick={() => setDisplay(false)}>close</i>
      <div className={styles.paperContainer}>
        
        {/* Header */}
        <div className={styles.paperHeader}>
          <div className={styles.headerLogo}><Image src={logo} className={styles.logo} alt="logo" /></div>
          <div className={styles.headerUtils}>
            <span>Prepared By: {owner?.fullName || "User"}</span>
            <h1 className={styles.heading}>unisoft exam elevator</h1>
          <h2 className={styles.subject}>{subject}</h2>
          <p>{currentDate}</p>
          <p>Attempt all questions</p>
          <strong>Total Marks: {(shortMarks * noSQs) + (longMarks * noLQs)}</strong>
          </div>
        </div>

        {/* Short Questions */}
        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Short Questions </h2> <span>{`${noSQs} x ${shortMarks} = ${noSQs * shortMarks}`}</span>
          </div>

          {shortQuestions.length === 0 ? (
            <p className={styles.empty}>No questions available</p>
          ) : (
              <ol className={styles.questionList}>
                {shortQuestions
                  .filter((q) => q != null)
                  .map((q, i) => (
                    <li key={q?.id || i} className={styles.li}>
                      {i + 1}.{" "}
                      {typeof q === "string"
                        ? q
                        : q?.question ||
                        q?.text ||
                        q?.name ||
                        "No question text available"}
                    </li>
                  ))}
              </ol>
          )}
        </div>

        {/* Long Questions */}
        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Long Questions </h2> <span>{`${noLQs} x ${longMarks} = ${noLQs * longMarks}`}</span>
          </div>

          {longQuestions.length === 0 ? (
            <p className={styles.empty}>No questions available</p>
          ) : (
              <ol className={styles.questionList}>
                {longQuestions
                  .filter((q) => q != null)
                  .map((q, i) => (
                    <li key={q?.id || i} className={styles.li}>
                      {i + 1}.{" "}
                      {typeof q === "string"
                        ? q
                        : q?.question ||
                        q?.text ||
                        q?.name ||
                        "No question text available"}
                    </li>
                  ))}
              </ol>
          )}
        </div>
          <div className={styles.paperButtonsDiv}>
          <button onClick={handleShare} className={styles.printBtn}>Share</button>
          <button onClick={handlePrint} className={styles.printBtn}>Print</button>
            <button onClick={handleSave} className={styles.saveBtn}>Save</button>
          </div>
      </div>
    </div>
  );
};

export default PaperFormat;