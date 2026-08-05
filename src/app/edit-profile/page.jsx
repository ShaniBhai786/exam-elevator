"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./edit.module.css";
import logo from "@/logo.jpeg";

export default function EditProfile() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    Contact: "",
    CNIC: "",
    Profile: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) return;

    const user = JSON.parse(stored);

    setUserId(user.id || user._id);

    setForm({
      fullName: user.fullName || "",
      email: user.email || "",
      Contact: user.Contact || "",
      CNIC: user.CNIC || "",
      Profile: user.Profile || "",
    });
  }, []);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

    if (target.name === "Profile") {
      setImageError(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("Profile", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message);
      }

      setForm((prev) => ({
        ...prev,
        Profile: data.url,
      }));

      setImageError(false);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Profile updated successfully.");

      router.push("/profile");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>Edit Profile</h1>

        <div className={styles.imageWrapper}>
          <Image
            src={!imageError && form.Profile ? form.Profile : logo}
            alt="Profile"
            width={130}
            height={130}
            className={styles.image}
            unoptimized
            onError={() => setImageError(true)}
          />
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.field}>
            <label>Full Name</label>
            <input
              required
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Contact</label>
            <input
              required
              name="Contact"
              value={form.Contact}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>CNIC</label>
            <input
              name="CNIC"
              value={form.CNIC}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Profile Picture</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}