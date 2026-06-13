"use client";

import React, { useEffect, useState } from "react";
import styles from "../utills.module.css";
import PaperFormat from "../semester/[semester]/PaperFormat";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading"

const Page = () => {
  const [papers, setPapers] = useState([]);
  const [showPaper, setShowPaper] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        console.log("Stored User:", user);

        if (!user?.id) {
          console.log("User not found");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/papers?userId=${user.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch papers");
        }

        const data = await res.json();

        console.log("Fetched Papers:", data);

        setPapers(data.papers || []);
      } catch (error) {
        console.error("Error fetching papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const viewSavedPaper = (paperId) => {
    const paper = papers.find((paper) => paper._id === paperId);

    if (!paper) {
      console.log("Paper not found");
      return;
    }

    setSelectedPaper(paper);
    setShowPaper(true);
  };

  const deletePaper = async (paperId) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/papers/${paperId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      setPapers((prev) =>
        prev.filter((paper) => paper._id !== paperId)
      );

      console.log(data.message);
    } catch (error) {
      console.error("Delete Error:", error);
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <SideBar />

        <h1 className={styles.saveheading}>Saved Papers</h1>

        {loading ? (
          <Loading />
        ) : papers.length === 0 ? (
          <p>No saved papers found.</p>
        ) : (
          <div className={styles.grid}>
            {papers.map((item) => (
              <div
                key={item._id}
                className={`${ styles.savedCard } ${
  deletingId === item._id ? styles.delete : ""
} `}
              >
                <div className={styles.cardTop}>
                  <h2>{item.subject}</h2>

                  <span>
                    {item.term} {item.year}
                  </span>
                </div>

                <div className={styles.stats}>
                  <div>
                    <p>Short Questions</p>
                    <h3>{item.noSQs}</h3>
                  </div>

                  <div>
                    <p>Long Questions</p>
                    <h3>{item.noLQs}</h3>
                  </div>
                </div>

                <button
                  className={styles.viewBtn}
                  onClick={() => viewSavedPaper(item._id)}
                >
                  View Paper
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deletePaper(item._id)}
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id
                    ? <Loading />
                    : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPaper && selectedPaper && (
        <PaperFormat
          shortQuestions={selectedPaper.shortQuestions}
          longQuestions={selectedPaper.longQuestions}
          subject={selectedPaper.subject}
          noSQs={selectedPaper.noSQs}
          noLQs={selectedPaper.noLQs}
          shortMarks={selectedPaper.shortMarks}
          longMarks={selectedPaper.longMarks}
          setDisplay={setShowPaper}
        />
      )}
    </>
  );
};

export default Page;

