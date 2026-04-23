"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../utills.module.css";

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div style={container}>
      <div style={card}>
        
        {/* Profile Image */}
        <div style={imageWrapper}>
          <Image
            src={user?.Profile || "/default-avatar.png"}
            alt="Profile"
            width={120}
            height={120}
            style={image}
          />
        </div>

        {/* Name + Badge */}
        <h2 style={name}>
          {user?.fullName || "Guest"}
          {user?.subscription === "verified" && (
            <span style={badge}>✔</span>
          )}
        </h2>

        {/* Role */}
        <p style={role}>{user?.userRole || "User"}</p>

        {/* Info Section */}
        <div style={infoBox}>
          <p><strong>Email:</strong> {user?.email || "-"}</p>
          <p><strong>Contact:</strong> {user?.Contact || "-"}</p>
          <p><strong>CNIC:</strong> {user?.CNIC || "-"}</p>
          <p><strong>Subscription:</strong> {user?.subscription || "-"}</p>
        </div>

        {/* Buttons */}
        <div style={btnGroup}>
          <button style={editBtn}>Edit Profile</button>
          <button style={logoutBtn}>Logout</button>
        </div>

      </div>
    </div>
  );
};

export default Page;

//
// 🔥 Inline Styles (clean + modern)
//

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const imageWrapper = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "15px",
};

const image = {
  borderRadius: "100%",
  objectFit: "cover",
};

const name = {
  fontSize: "22px",
  fontWeight: "600",
};

const badge = {
  color: "#1DA1F2",
  marginLeft: "6px",
  fontSize: "18px",
};

const role = {
  color: "#777",
  marginBottom: "15px",
  textTransform: "capitalize",
};

const infoBox = {
  textAlign: "left",
  marginTop: "15px",
  fontSize: "14px",
  lineHeight: "1.8",
};

const btnGroup = {
  marginTop: "20px",
  display: "flex",
  gap: "10px",
};

const editBtn = {
  flex: 1,
  padding: "10px",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const logoutBtn = {
  flex: 1,
  padding: "10px",
  background: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};