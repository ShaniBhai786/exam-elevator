"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../../admin.css";
import Loading from "../../components/Loading"

const Page = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const getStudents = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/students");
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setStudents(data.students);
                setFilteredStudents(data.students);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    useEffect(() => {
        const filtered = students.filter(
            (student) =>
                student.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                student.CNIC.includes(search.toLowerCase())
        );

        setFilteredStudents(filtered);
    }, [search, students]);

    return (
        <div className="studentsPage">
            <div className="pageHeader">
                <div>
                    <h1>Students Management</h1>
                    <p>View and manage all registered students</p>
                </div>

                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchInput"
                />
            </div>

            {loading ? <Loading /> : (
                <div className="studentsGrid">
                    {filteredStudents.map((student) => (
                        <div
                            key={student._id}
                            className="studentCard"
                        >
                            <div className="imageWrapper">
                                <Image
                                    src={
                                        student.Profile ||
                                        "/default-avatar.png"
                                    }
                                    alt={student.fullName || "Student Image"}
                                    width={100}
                                    height={100}
                                    className="studentImage"
                                />
                            </div>

                            <h3>{student.fullName}</h3>

                            <span className="studentId">
                                {student.CNIC}
                            </span>

                            <div className="studentInfo">
                                <p>
                                    <strong>Father:</strong>{" "}
                                    {student.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {student.Contact}
                                </p>
                            </div>

                            <button className="viewBtn">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;