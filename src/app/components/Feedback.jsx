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
        <Form ref={form} className={styles.form}>
          <div className={styles.inputsDiv}>
            <h1 className={styles.heading}>Feedback</h1>

            <div className={styles.input}>
              <Field
                name="name"
                placeholder="Your Name"
                className={styles.inputField}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.input}>
              <Field
                name="email"
                placeholder="Your Email"
                className={styles.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.input}>
              <Field
              as="textarea"
                name="message"
                placeholder="Your Message"
                className={styles.inputField}
              />
              <ErrorMessage
                name="message"
                component="div"
                className={styles.error}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Feedback;