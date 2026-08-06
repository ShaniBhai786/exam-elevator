"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./reset.module.css";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            return alert("Please fill all fields.");
        }

        if (password !== confirmPassword) {
            return alert("Passwords do not match.");
        }

        if (password.length < 8) {
            return alert("Password must be at least 8 characters.");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            alert("Password reset successfully.");

            router.push("/");

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <h1>Reset Password</h1>

                <p>Create a new password for your account.</p>

                <input
                    type="email"
                    value={email || ""}
                    readOnly
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    className={styles.input}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    onClick={handleResetPassword}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>

            </div>

        </div>
    );
}