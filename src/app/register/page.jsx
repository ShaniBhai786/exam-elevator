"use client";

import React, {useRef, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../utills.module.css";
import Link from "next/link";

const Register = () => {
  const [passwordDisplay, setPasswordDisplay] = useState("password")
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] = useState("password")

  const initialValues = {
    Contact: "",
    fullName: "",
    email: "",
    CNIC: "",
    password: "",
    confirmPassword: "",
    Profile: ""
  };

  const validationSchema = Yup.object({
    Contact: Yup.string().min(11).required("Contact is mandatory"),
    fullName: Yup.string().min(3).required("Full Name is mandatory"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    CNIC: Yup.string().min(13).matches(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC format").required("CNIC/ B-Form is required"),
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), "null"], "Passwords must be match")
      .required("Confirm your password"),
    Profile: Yup.string().required("Profile Picture is mandatory")  
  });

  const onSubmit = (values, { resetForm }) => {
    alert("Registration Successfully!");
    console.table(values);
    resetForm();
    localStorage.setItem("masterUser", values.fullName)
  };

  const eyeRef = useRef()
  const eyeSlashRef = useRef()

  const eyeConRef = useRef()
  const eyeSlashConRef = useRef()

  const handlePasswordDisplay = () => {
    if (passwordDisplay === "password") {
      setPasswordDisplay("text")
      eyeSlashRef.current.style.display = "none"
      eyeRef.current.style.display = "block"
    }
    else{
      setPasswordDisplay("password")
      eyeSlashRef.current.style.display = "block"
      eyeRef.current.style.display = "none" 
    }
  }

  const handleConfirmPasswordDisplay = () => {
    if (confirmPasswordDisplay === "password") {
      setConfirmPasswordDisplay("text")
      eyeSlashConRef.current.style.display = "none"
      eyeConRef.current.style.display = "block"
    }
    else{
      setConfirmPasswordDisplay("password")
      eyeSlashConRef.current.style.display = "block"
      eyeConRef.current.style.display = "none" 
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>register user!</h1>
        <h2>Create Account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.inputsDiv}>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
              <Field  type="text" name="fullName" className={styles.input}  placeholder="Enter Full Name" />
              <label>Full Name</label>
              <ErrorMessage name="fullName" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <Field  type="email" name="email" className={styles.input} placeholder="Enter Email" />
              <label>Email</label>
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-phone ${styles.inputIcon}`}></i>
              <Field  type="text" name="Contact" className={styles.input} placeholder="Enter Contact#" />
              <label>Contact</label>
              <ErrorMessage name="Contact" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-id-card ${styles.inputIcon}`}></i>
              <Field  name="CNIC" >
              {({field, form}) => (
                <input {...field} maxLength={15} onChange={(e) => {
                  let value = e.target.value.replace(/\D/g,"")
                  if (value.length > 5 && value.length <= 12) {
                    value = value.slice(0,5) + "-" + value.slice(5)
                  } else if (value.length > 12) {
                    value = value.slice(0,5) + "-" + value.slice(5,12) + "-" + value.slice(12,13)
                  }
                  form.setFieldValue("CNIC", value)
                }}
                type="text" className={styles.input} placeholder="Enter CNIC/ B-Form"
                />
              )}
              </Field>
              <label>CNIC/ B-Form</label>
              <ErrorMessage name="CNIC" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <Field  type={passwordDisplay} name="password" className={styles.input} placeholder="Enter Password" />
              <label>Password</label>
              <i onClick={handlePasswordDisplay} className={`fa-solid fa-eye ${styles.inputIconEye}` } ref={eyeRef}></i>
              <i onClick={handlePasswordDisplay} className={`fa-solid fa-eye-slash ${styles.inputIconEye}`} ref={eyeSlashRef}></i>
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <Field  type={confirmPasswordDisplay} name="confirmPassword" className={styles.input} placeholder="Enter Confirm Password" />
              <label>Confirm Password</label>
              <i onClick={handleConfirmPasswordDisplay} className={`fa-solid fa-eye ${styles.inputIconEye}` } ref={eyeConRef}></i>
              <i onClick={handleConfirmPasswordDisplay} className={`fa-solid fa-eye-slash ${styles.inputIconEye}`} ref={eyeSlashConRef}></i>
              <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-image ${styles.inputIcon}`} style={{cursor: "pointor"}}></i>
              <Field name="Profile" className={styles.input} >
                {({form}) => (
                  <input type="file" accept="image/*" onChange={(e) => {
                    form.setFieldValue("Profile", e.target.files[0])
                  }}
                  />
                )}
              </Field>
              <label>Profile</label>
              <ErrorMessage name="Profile" component="div" className={styles.errorMessage} />
            </div>
            </div>
            <p className={styles.signupText}>
              Already Registered! <Link href="/"><span>Login Now</span></Link>
            </p>

            <div className={styles.buttonGroup}>
              <button type="reset" className={styles.btn + " " + styles.reset}>
                Reset
              </button>
              <button type="submit" className={styles.btn + " " + styles.submit}>
                Register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;