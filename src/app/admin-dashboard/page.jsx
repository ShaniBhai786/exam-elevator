import React from "react";
import "../admin.css";
import Link from "next/link";

const Page = () => {
    const tools = [
        {
            title: "User Management",
            href: "/admin/users",
            icon: "👥",
            description: "Create, update and manage all users."
        },
        {
            title: "Students",
            href: "/admin/students",
            icon: "🎓",
            description: "Manage admissions and records."
        },
        {
            title: "Teachers",
            href: "/admin/teachers",
            icon: "👨‍🏫",
            description: "Manage teachers."
        }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>School Management System Control Panel</p>
                </div>

                <button className="profile-btn">Administrator</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h2>1,250</h2>
                    <p>Total Students</p>
                </div>

                <div className="stat-card">
                    <h2>85</h2>
                    <p>Total Teachers</p>
                </div>

                <div className="stat-card">
                    <h2>42</h2>
                    <p>Total Staff</p>
                </div>

                <div className="stat-card">
                    <h2>Rs. 850K</h2>
                    <p>Monthly Revenue</p>
                </div>

                <div className="stat-card">
                    <h2>96%</h2>
                    <p>Attendance Rate</p>
                </div>

                <div className="stat-card">
                    <h2>15</h2>
                    <p>Pending Admissions</p>
                </div>
            </div>

            <h2 className="section-title">Management Tools</h2>

            <div className="tools-grid">
                {tools.map((tool, index) => (
                    <div className="tool-card" key={index}>
                        <span className="tool-icon">{tool.icon}</span>
                        <h3>{tool.title}</h3>
                        <p>{tool.description}</p>

                        <Link href={tool.href}>
                            <button>Open Module</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;