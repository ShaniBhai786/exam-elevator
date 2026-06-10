"use client";

import React from "react";
import styles from "../utills.module.css";

const blogs = [
    {
        id: 1,
        title: "How to Prepare for Exams Effectively",
        description:
            "Discover practical strategies to improve focus, manage time, and score better in your semester examinations.",
        category: "Study Tips",
        date: "10 June 2026",
    },
    {
        id: 2,
        title: "Benefits of AI in Education",
        description:
            "Learn how artificial intelligence is transforming the learning experience for students worldwide.",
        category: "Technology",
        date: "8 June 2026",
    },
    {
        id: 3,
        title: "Top 10 Productivity Hacks for Students",
        description:
            "Simple habits and techniques that can help students stay organized and productive.",
        category: "Student Life",
        date: "5 June 2026",
    },
];

const Page = () => {
    return (
        <div className={styles.blogContainer}>
            <div className={styles.blogHero}>
                <h1>UniSoft Blogs</h1>
                <p>
                    Explore educational insights, study tips, and the latest trends in
                    technology to enhance your learning journey.
                </p>
            </div>

            <div className={styles.blogGrid}>
                {blogs.map((blog) => (
                    <div key={blog.id} className={styles.blogCard}>
                        <span className={styles.blogCategory}>
                            {blog.category}
                        </span>

                        <h2>{blog.title}</h2>

                        <p>{blog.description}</p>

                        <div className={styles.blogFooter}>
                            <span>{blog.date}</span>

                            <button className={styles.readMoreBtn}>
                                Read More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;