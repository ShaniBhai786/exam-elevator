"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../../admin.css";
import Loading from "../../components/Loading";

const Page = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const getTeachers = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/teachers");
            const data = await res.json();

            console.log(data);

            if (data.success) {
                setTeachers(data.teachers);
                setFilteredTeachers(data.teachers);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    useEffect(() => {
        const filtered = teachers.filter(
            (teacher) =>
                teacher.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                teacher.CNIC
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        );

        setFilteredTeachers(filtered);
    }, [search, teachers]);

    if (loading) return <Loading />;

    return (
        <div className="teachersPage">
            <div className="header">
                <h1>Teachers List</h1>

                <input
                    type="text"
                    placeholder="Search teacher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchInput"
                />
            </div>

            <div className="teachersGrid">
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => {
                        const imageSrc =
                            teacher.Profile?.startsWith("http")
                                ? teacher.Profile
                                : "/default-avatar.png";

                        return (
                            <div
                                key={teacher._id}
                                className="teacherCard"
                            >
                                <Image
                                    src={imageSrc}
                                    alt={teacher.fullName}
                                    width={90}
                                    height={90}
                                    className="teacherImg"
                                />

                                <h3>{teacher.fullName}</h3>
                                <p>{teacher.email}</p>

                                <span className="role">
                                    {teacher.userRole}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <p className="noData">
                        No teachers found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Page;