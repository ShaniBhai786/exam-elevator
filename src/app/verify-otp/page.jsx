"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./verify.module.css";

export default function VerifyOTP() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerifyOTP = async () => {
        if (!email || !otp) {
            return alert("Please enter email and OTP.");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp,
                }),
            });
            console.log("Request sent to /api/users/verify-otp with email:", email, "and otp:", otp);

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            alert("OTP Verified Successfully.");

            router.push(`/reset-password?email=${encodeURIComponent(email)}`);

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            const res = await fetch("/api/users/forget-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await res.json();

            alert(data.message);

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <h1>Verify OTP</h1>

                <p>
                    Enter the OTP sent to your email address.
                </p>

                <input
                    type="email"
                    placeholder="Email Address"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    className={styles.input}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                />

                <button
                    className={styles.verifyBtn}
                    onClick={handleVerifyOTP}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                    className={styles.resendBtn}
                    onClick={handleResendOTP}
                >
                    Resend OTP
                </button>

            </div>

        </div>
    );
}