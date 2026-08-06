"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../utills.module.css";
import logo from "../../../logo.jpeg";
import AnswerGenerator from "./AnswerGenerator";

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
  const [paper, setPaper] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false)

  const currentDate = new Date().toLocaleString();

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
        console.error(err);
      }
    };

    fetchPaper();
  }, [paperId]);

  // ===============================
  // Fetch Logged-in User From DB
  // ===============================
  useEffect(() => {
    if (paperId) return;

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
          setLoggedInUser(data.user);
        }
      } catch (error) {
        console.error("Fetch User Error:", error);
      }
    };

    fetchUser();
  }, [paperId]);
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
      if (!loggedInUser) {
        alert("User not loaded.");
        return;
      }

      const paperData = {
        userId: loggedInUser._id,
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
        body: JSON.stringify(paperData),
      });

      const data = await res.json();
      console.log("Fetched Paper:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to save paper.");
      }

      setSavedPaperId(data.paper._id);
      setPaperId?.(data.paper._id);

      const paperRes = await fetch(`/api/papers/${data.paper._id}`);
      const fetchedPaper = await paperRes.json();

      if (fetchedPaper.success) {
        setPaper(fetchedPaper.paper);
      }
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
  useEffect(() => {
    console.log("Paper:", paper);

    if (paper?.userId) {
      console.log("Owner:", paper.userId);
      console.log("Owner Name:", paper.userId.fullName);
    }
  }, [paper]);
  const generateAnswers = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowAnswers(true);
  }
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
              Prepared By: {" "}
              <strong>{paper?.userId?.fullName ||
                loggedInUser?.fullName ||
                "Loading..."}</strong>
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
          <button onClick={generateAnswers} className={styles.saveBtn}>Generate Answers</button>
        </div>
      </div>
      {showAnswers && <AnswerGenerator
        questions={[
          ...shortQuestions.filter(Boolean),
          ...longQuestions.filter(Boolean),
        ]}
        setShowAnswers={setShowAnswers}
      />}
    </div>
  );
};

export default PaperFormat;