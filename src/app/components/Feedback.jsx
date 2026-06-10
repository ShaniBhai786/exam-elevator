"use client";

import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import styles from "../utills.module.css"; 

const Feedback = ({ setLoading }) => {
  const form = useRef();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      await emailjs.sendForm(
        "service_3xs9iqc",
        "template_u09iiy3",
        form.current,
        { publicKey: "5NYUNk6egOmHicaIZ" }
      );

      alert("Feedback Sent Successfully!");
      resetForm();
      console.table(values);
    } catch (error) {
      console.log(error);
      alert("Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.feedbackForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form ref={form} className={styles.feedbackFormContainer}>
          <div className={styles.feedbackHeader}>
            <span className={styles.feedbackTag}>
              We'd Love to Hear From You
            </span>

            <h2>Send Your Feedback</h2>

            <p>
              Share your thoughts, suggestions, or report an issue.
              Your feedback helps us improve UniSoft Exam Elevator.
            </p>
          </div>

          <div className={styles.formGroup}>
            <i className={`fa-solid fa-user ${styles.fieldIcon}`}></i>

            <Field
              type="text"
              name="name"
              placeholder="Full Name"
              className={styles.inputField}
            />

            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <i className={`fa-solid fa-envelope ${styles.fieldIcon}`}></i>

            <Field
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.inputField}
            />

            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <i className={`fa-solid fa-comment ${styles.fieldIcon}`}></i>

            <Field
              as="textarea"
              name="message"
              placeholder="Write your message..."
              className={`${styles.inputField} ${styles.textarea}`}
            />

            <ErrorMessage
              name="message"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            <i className="fa-solid fa-paper-plane"></i>
            Send Feedback
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Feedback;