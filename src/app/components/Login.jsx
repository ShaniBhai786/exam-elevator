"use client";

import styles from "../utills.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";

const Login = ({onLogin}) => {
  const [isLogin, setIsLogin] = useState(false)
  const [passwordDisplay, setPasswordDisplay] = useState("password")
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values.email === "unisoftpvt@gmail.com" && values.password === "uniSoftpvt786@")
    {
      alert("Login Successful!");
      console.log(values);
      setIsLogin(true)
      localStorage.setItem("user", isLogin)
    }
    resetForm();
    onLogin()
  };

  const eyeRef = useRef()
  const eyeSlashRef = useRef()

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

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>
          <i className="fa-solid fa-user"></i> Welcome Back
        </h2>
        <p className={styles.loginSubtitle}>Login to your account</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <Field type={passwordDisplay} name="password" placeholder="Password" />
              <i onClick={handlePasswordDisplay} className={`fa-solid fa-eye ${styles.inputIconEye}` } ref={eyeRef}></i>
              <i onClick={handlePasswordDisplay} className={`fa-solid fa-eye-slash ${styles.inputIconEye}`} ref={eyeSlashRef}></i>
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.loginOptions}>
              <span className={styles.forgot}>Forgot Password?</span>
            </div>

            <button type="submit" className={styles.loginBtn}>
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </button>
          </Form>
        </Formik>

        <p className={styles.signupText}>
          Don't have an account? <span>Sign up</span>
        </p>

        <div className={styles.socialLogin}>
          <button className={`${styles.socialBtn} ${styles.google}`}>
            <i className="fa-brands fa-google"></i> Login with Google
          </button>
          <button className={`${styles.socialBtn} ${styles.facebook}`}>
            <i className="fa-brands fa-facebook-f"></i> Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;