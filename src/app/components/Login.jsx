"use client";

import styles from "../utills.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import Link from "next/link"
import axios from "axios";
import Loading from "./Loading";

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

  const userLogin = async (values) => {
    try {
      const res = await axios.post("/api/auth/login", values, {
      headers: { "Content-Type": "application/json" }
});
  const {user, accessToken} = res.data
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("user", JSON.stringify(user))
    // alert("Login Successful")
    // setIsLogin(true)
    alert(`Welcome: ${user.fullName}`)
    console.log(res.data);
onLogin()
} catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error?.response?.data);
  
  const message =
  error?.response?.data?.message ||
  error.message ||
  "Something went wrong";
  alert(message)
}
finally{
  setIsLogin(false)
}
}

const onSubmit = async (values, { resetForm }) => {
    resetForm();
    setIsLogin(true)
    userLogin(values)
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
    <>
    {isLogin && <Loading/>}
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
          Don't have an account? <Link href="/register"><span>Register</span></Link>
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
    </>
  );
};

export default Login;