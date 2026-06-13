"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../utills.module.css";
import axios from "axios";
import Loading from "../components/Loading";

const EditProfile = () => {
  const [passwordDisplay, setPasswordDisplay] = useState("password");
  const [loading, setLoading] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.assign("/");
      return;
    }

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
      password: "",
      Profile: null,
    });
  }, []);

  // Validation
  const validationSchema = Yup.object({
    Contact: Yup.string().min(11, "Invalid contact"),
    username: Yup.string().min(5, "Minimum 5 characters"),
    fullName: Yup.string().min(3, "Minimum 3 characters"),
    email: Yup.string().email("Invalid email"),
    CNIC: Yup.string().matches(
      /^\d{5}-\d{7}-\d{1}$/,
      "Invalid CNIC format"
    ),
    password: Yup.string().min(8, "Minimum 8 characters"),
    Profile: Yup.mixed().notRequired(),
    subscription: Yup.string(),
    userRole: Yup.string(),
  });

  // Update profile API (FIXED fetch → axios)
  const updateProfile = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("fullName", values.fullName);
      formData.append("Contact", values.Contact);
      formData.append("CNIC", values.CNIC);
      formData.append("userRole", values.userRole);
      formData.append("subscription", values.subscription);

      if (values.password) {
        formData.append("password", values.password);
      }

      if (values.Profile) {
        formData.append("Profile", values.Profile);
      }

      const token = localStorage.getItem("accessToken");

      const res = await axios.put(
        `/api/users/${storedUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile updated successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // Submit handler
  const onSubmit = async (values, { resetForm }) => {
    await updateProfile(values);
    resetForm();
  };

  // Password toggle (FIXED React way)
  const togglePassword = () => {
    setPasswordDisplay((prev) =>
      prev === "password" ? "text" : "password"
    );
  };

  return (
    <>
      {loading && <Loading />}

      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1>Edit Profile</h1>
          <h2>Update Account Details</h2>

          <Formik
            initialValues={
              initialValues || {
                username: "",
                email: "",
                fullName: "",
                Contact: "",
                CNIC: "",
                userRole: "",
                subscription: "",
                password: "",
                Profile: null,
              }
            }
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ resetForm }) => (
              <Form className={styles.form}>
                <div className={styles.inputsDivReg}>

                  {/* Full Name */}
                  <div className={styles.inputGroup}>
                    <Field
                      type="text"
                      name="fullName"
                      className={styles.input}
                      placeholder="Full Name"
                    />
                    <label>Full Name</label>
                    <ErrorMessage name="fullName" component="div" />
                  </div>

                  {/* Email */}
                  <div className={styles.inputGroup}>
                    <Field
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="Email"
                    />
                    <label>Email</label>
                    <ErrorMessage name="email" component="div" />
                  </div>

                  {/* Username */}
                  <div className={styles.inputGroup}>
                    <Field
                      type="text"
                      name="username"
                      className={styles.input}
                      placeholder="Username"
                    />
                    <label>Username</label>
                    <ErrorMessage name="username" component="div" />
                  </div>

                  {/* Contact */}
                  <div className={styles.inputGroup}>
                    <Field
                      type="text"
                      name="Contact"
                      className={styles.input}
                      placeholder="Contact"
                    />
                    <label>Contact</label>
                    <ErrorMessage name="Contact" component="div" />
                  </div>

                  {/* CNIC */}
                  <div className={styles.inputGroup}>
                    <Field name="CNIC">
                      {({ field, form }) => (
                        <input
                          {...field}
                          className={styles.input}
                          placeholder="xxxxx-xxxxxxx-x"
                          maxLength={15}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");

                            if (value.length <= 5) {
                              value = value;
                            } else if (value.length <= 12) {
                              value =
                                value.slice(0, 5) + "-" + value.slice(5);
                            } else {
                              value =
                                value.slice(0, 5) +
                                "-" +
                                value.slice(5, 12) +
                                "-" +
                                value.slice(12, 13);
                            }

                            form.setFieldValue("CNIC", value);
                          }}
                        />
                      )}
                    </Field>
                    <label>CNIC</label>
                    <ErrorMessage name="CNIC" component="div" />
                  </div>

                  {/* Role */}
                  <div className={styles.inputGroup}>
                    <Field as="select" name="userRole" className={styles.input}>
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </Field>
                    <label>User Role</label>
                  </div>

                  {/* Subscription */}
                  <div className={styles.inputGroup}>
                    <Field as="select" name="subscription" className={styles.input}>
                      <option value="">Subscription</option>
                      <option value="verified">Verified</option>
                      <option value="trial">Trial</option>
                    </Field>
                    <label>Subscription</label>
                  </div>

                  {/* Password */}
                  <div className={styles.inputGroup}>
                    <Field
                      type={passwordDisplay}
                      name="password"
                      className={styles.input}
                      placeholder="Password"
                    />

                    <label>Password</label>

                    <i
                      onClick={togglePassword}
                      className={`fa-solid ${passwordDisplay === "password"
                          ? "fa-eye-slash"
                          : "fa-eye"
                        }`}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  {/* Profile Image */}
                  <div className={styles.inputGroup}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setInitialValues((prev) => ({
                          ...prev,
                          Profile: e.target.files[0],
                        }));
                      }}
                    />
                    <label>Profile Image</label>
                  </div>
                </div>

                {/* Buttons */}
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
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
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