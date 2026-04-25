"use client";

import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../utills.module.css";
import Link from "next/link";
import axios from "axios";
import Loading from "../components/Loading";

const EditProfile = () => {
  const [passwordDisplay, setPasswordDisplay] = useState("password");
  const [loading, setLoading] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.assign("/");
    } else {
      const parsedUser = JSON.parse(user);
      setStoredUser(parsedUser);
      setInitialValues({
        username: parsedUser.username || "",
        email: parsedUser.email || "",
        fullName: parsedUser.fullName || "",
        Contact: parsedUser.Contact || "",
        CNIC: parsedUser.CNIC || "",
        userRole: parsedUser.userRole || "",
        subscription: parsedUser.subscription || "",
        password: parsedUser.password || "",
        Profile: null,
      });
    }
  }, []);

  const validationSchema = Yup.object({
    Contact: Yup.string().min(11),
    username: Yup.string().min(5),
    fullName: Yup.string().min(3),
    email: Yup.string().email("Invalid email"),
    CNIC: Yup.string()
      .min(13)
      .matches(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format"),
    password: Yup.string().min(8),
    Profile: Yup.mixed().required("Profile Picture is mandatory"),
    subscription: Yup.string(),
    userRole: Yup.string(),
  });

  const registerUser = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("fullName", values.fullName);
      formData.append("Contact", values.Contact);
      formData.append("CNIC", values.CNIC);
      formData.append("userRole", values.userRole);
      formData.append("subscription", values.subscription);
      formData.append("Profile", values.Profile);

      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registration Successful");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setLoading(false);

      alert(message);
      console.log(message);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (values, { resetForm }) => {
    console.table(values);
    await registerUser(values);
    resetForm();
  };

  const eyeRef = useRef();
  const eyeSlashRef = useRef();

  const eyeConRef = useRef();
  const eyeSlashConRef = useRef();

  const handlePasswordDisplay = () => {
    if (passwordDisplay === "password") {
      setPasswordDisplay("text");
      eyeSlashRef.current.style.display = "none";
      eyeRef.current.style.display = "block";
    } else {
      setPasswordDisplay("password");
      eyeSlashRef.current.style.display = "block";
      eyeRef.current.style.display = "none";
    }
  };

  const handleConfirmPasswordDisplay = () => {
    if (confirmPasswordDisplay === "password") {
      setConfirmPasswordDisplay("text");
      eyeSlashConRef.current.style.display = "none";
      eyeConRef.current.style.display = "block";
    } else {
      setConfirmPasswordDisplay("password");
      eyeSlashConRef.current.style.display = "block";
      eyeConRef.current.style.display = "none";
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1>register user!</h1>
          <h2>Create Account</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ resetForm }) => (
              <Form className={styles.form}>
                <div className={styles.inputsDivReg}>
                  <div className={styles.inputGroup}>
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                    <Field
                      type="text"
                      name="fullName"
                      className={styles.input}
                      placeholder="Enter Full Name"
                    />
                    <label>Full Name</label>
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i
                      className={`fa-solid fa-envelope ${styles.inputIcon}`}
                    ></i>
                    <Field
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="Enter Email"
                    />
                    <label>Email</label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                    <Field
                      type="text"
                      name="username"
                      className={styles.input}
                      placeholder="Enter username"
                    />
                    <label>Username</label>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i className={`fa-solid fa-phone ${styles.inputIcon}`}></i>
                    <Field
                      type="text"
                      name="Contact"
                      className={styles.input}
                      placeholder="Enter Contact#"
                    />
                    <label>Contact</label>
                    <ErrorMessage
                      name="Contact"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i
                      className={`fa-solid fa-id-card ${styles.inputIcon}`}
                    ></i>
                    <Field name="CNIC">
                      {({ field, form }) => (
                        <input
                          {...field}
                          maxLength={15}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 5 && value.length <= 12) {
                              value = value.slice(0, 5) + "-" + value.slice(5);
                            } else if (value.length > 12) {
                              value =
                                value.slice(0, 5) +
                                "-" +
                                value.slice(5, 12) +
                                "-" +
                                value.slice(12, 13);
                            }
                            form.setFieldValue("CNIC", value);
                          }}
                          type="text"
                          className={styles.input}
                          placeholder="Enter CNIC/ B-Form"
                        />
                      )}
                    </Field>
                    <label>CNIC/ B-Form</label>
                    <ErrorMessage
                      name="CNIC"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup} id={styles.inputGroup}>
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                    <Field
                      as="select"
                      type="text"
                      name="userRole"
                      className={styles.input}
                      id={styles.input}
                    >
                      <option className={styles.options} value="">
                        Select User Role
                      </option>
                      <option className={styles.options} value="admin">
                        Admin
                      </option>
                      <option className={styles.options} value="teacher">
                        Teacher
                      </option>
                      <option className={styles.options} value="student">
                        Student
                      </option>
                    </Field>
                    <label>User Role</label>
                    <ErrorMessage
                      name="userRole"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i className={`fa-solid fa- ${styles.inputIcon}`}></i>
                    <Field
                      as="select"
                      type="text"
                      name="subscription"
                      className={styles.input}
                    >
                      <option value="">Subscription Status</option>
                      <option value="verified">Verified</option>
                      <option value="trial">Trial</option>
                    </Field>
                    <label>Subscription Status</label>
                    <ErrorMessage
                      name="subscription"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
                    <Field
                      type={passwordDisplay}
                      name="password"
                      className={styles.input}
                      placeholder="Enter Password"
                    />
                    <label>Password</label>
                    <i
                      onClick={handlePasswordDisplay}
                      className={`fa-solid fa-eye ${styles.inputIconEye}`}
                      ref={eyeRef}
                    ></i>
                    <i
                      onClick={handlePasswordDisplay}
                      className={`fa-solid fa-eye-slash ${styles.inputIconEye}`}
                      ref={eyeSlashRef}
                    ></i>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <i
                      className={`fa-solid fa-image ${styles.inputIcon}`}
                      style={{ cursor: "pointor" }}
                    ></i>
                    <Field name="Profile" className={styles.input}>
                      {({ form }) => (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            form.setFieldValue("Profile", e.target.files[0]);
                          }}
                        />
                      )}
                    </Field>
                    <label>Profile</label>
                    <ErrorMessage
                      name="Profile"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className={styles.btn + " " + styles.reset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className={styles.btn + " " + styles.submit}
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
