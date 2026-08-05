"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../utills.module.css";
import logo from "../../../logo.jpeg";

const PaperFormat = ({
  shortQuestions = [],
  longQuestions = [],
  setDisplay,
  subject,
  noSQs,
  noLQs,
  shortMarks,
  longMarks,
  paperId,
  setPaperId,
}) => {
  const [savedPaperId, setSavedPaperId] = useState(paperId || null);
  const [savedUser, setSavedUser] = useState(null);
  const currentDate = new Date().toLocaleString();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    if (!paperId) return;

    const fetchPaper = async () => {
      try {
        const res = await fetch(`/api/papers/${paperId}`);
        const data = await res.json();

        if (data.success) {
          setPaper(data.paper);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPaper();
  }, [paperId]);

  // ===============================
  // Fetch Logged-in User From DB
  // ===============================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (!localUser) return;

        const userId =
          localUser._id ||
          localUser.id ||
          localUser.user?._id ||
          localUser.user?.id;

        if (!userId) return;

        const res = await fetch(`/api/users/${userId}`);

        const data = await res.json();

        if (res.ok && data.success) {
          setSavedUser(data.user);
        }
      } catch (error) {
        console.error("Fetch User Error:", error);
      }
    };

    fetchUser();
  }, []);

  // ===============================
  // Print
  // ===============================
  const handlePrint = () => {
    window.print();
  };

  // ===============================
  // Save Paper
  // ===============================
  const handleSave = async () => {
    try {
        const paper = {
        userId: savedUser._id || savedUser.id,
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

      const res = await fetch("/api/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paper),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save paper.");
      }

      setSavedPaperId(data.paper._id);

      if (setPaperId) {
        setPaperId(data.paper._id);
      }
      setPaper(data.paper);

      alert("Paper Saved Successfully ✅");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // ===============================
  // Share Paper
  // ===============================
  const handleShare = async () => {
    const id = savedPaperId || paperId;

    if (!id) {
      alert("Please save the paper first.");
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
        throw new Error(data.message || "Failed to share paper.");
      }

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.paperWrapper}>
      <i
        className={`fa fa-close ${styles.closeIcon}`}
        onClick={() => setDisplay(false)}
      >
        close
      </i>

      <div className={styles.paperContainer}>
        {/* Header */}

        <div className={styles.paperHeader}>
          <div className={styles.headerLogo}>
            <Image src={logo} alt="Logo" className={styles.logo} />
          </div>

          <div className={styles.headerUtils}>
            <span>
              <strong>Prepared By:</strong>{" "}
              {savedUser?.fullName ?? "Loading..."}
            </span>

            <h1 className={styles.heading}>UniSoft Exam Elevator</h1>

            <h2 className={styles.subject}>{subject}</h2>

            <p>{currentDate}</p>

            <p>Attempt all questions.</p>

            <strong>
              Total Marks: {(shortMarks * noSQs) + (longMarks * noLQs)}
            </strong>
          </div>
        </div>

        {/* Short Questions */}

        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Short Questions</h2>

            <span>
              {noSQs} × {shortMarks} = {noSQs * shortMarks}
            </span>
          </div>

          {shortQuestions.length === 0 ? (
            <p>No Questions Available.</p>
          ) : (
            <ol className={styles.questionList}>
              {shortQuestions
                .filter(Boolean)
                .map((q, i) => (
                  <li key={i} className={styles.li}>
                    {typeof q === "string"
                      ? q
                      : q.question || q.text || q.name || "Question"}
                  </li>
                ))}
            </ol>
          )}
        </div>

        {/* Long Questions */}

        <div className={styles.section}>
          <div className={styles.paperStatement}>
            <h2 className={styles.sectionTitle}>Long Questions</h2>

            <span>
              {noLQs} × {longMarks} = {noLQs * longMarks}
            </span>
          </div>

          {longQuestions.length === 0 ? (
            <p>No Questions Available.</p>
          ) : (
            <ol className={styles.questionList}>
              {longQuestions
                .filter(Boolean)
                .map((q, i) => (
                  <li key={i} className={styles.li}>
                    {typeof q === "string"
                      ? q
                      : q.question || q.text || q.name || "Question"}
                  </li>
                ))}
            </ol>
          )}
        </div>

        {/* Buttons */}

        <div className={styles.paperButtonsDiv}>
          <button onClick={handleShare} className={styles.printBtn}>
            Share
          </button>

          <button onClick={handlePrint} className={styles.printBtn}>
            Print
          </button>

          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperFormat;