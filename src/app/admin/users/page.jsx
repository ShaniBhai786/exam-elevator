"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../../admin.css";
import Loading from "../../components/Loading";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("")

    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        userRole: "",
        Profile: null,
    });

    const getUsers = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
            // setUserRole(res.users.userRole)
            console.log(userRole)
        } catch (error) {
            console.error(error);
            alert("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);

        setFormData({
            fullName: user.fullName || "",
            email: user.email || "",
            userRole: user.userRole || "",
            Profile: null,
        });
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            Profile: e.target.files[0],
        }));
    };

    const handleUpdate = async () => {
        try {
            const data = new FormData();

            data.append("id", editingUser._id);
            data.append("fullName", formData.fullName);
            data.append("email", formData.email);
            data.append("userRole", formData.userRole);

            if (formData.Profile) {
                data.append("Profile", formData.Profile);
            }

            const res = await fetch("/api/users", {
                method: "PUT",
                credentials: "include",
                body: data,
            });

            const result = await res.json();

            if (result.success) {
                alert("User updated successfully");
                setEditingUser(null);
                getUsers();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch("/api/users", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== userId)
                );

                alert("User deleted successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="usersContainer">
            <div className="pageHeader">
                <h1>Users Management</h1>
                <p>Manage system users and permissions</p>
            </div>

            {editingUser && (
                <div className="editModal">
                    <div className="editCard">
                        <h2>Edit User</h2>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />

                        <select
                            name="userRole"
                            value={formData.userRole}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <div className="actionBtns">
                            <button
                                className="saveBtn"
                                onClick={handleUpdate}
                            >
                                Update User
                            </button>

                            <button
                                className="cancelBtn"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="usersGrid">
                {users.map((user) => {
                    const imageSrc =
                        user.Profile?.startsWith("http")
                            ? user.Profile
                            : "/default-avatar.png";

                    return (
                        <div className="userCard" key={user._id}>
                            <div className="avatarWrapper">
                                <Image
                                    src={imageSrc}
                                    alt={user.fullName}
                                    width={100}
                                    height={100}
                                    className="avatar"
                                />
                            </div>

                            <h3>{user.fullName}</h3>
                            <p>{user.email}</p>

                            <span className="roleBadge">
                                {user.userRole}
                            </span>

                            <div className="cardActions">
                                <button
                                    className="editBtn"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="deleteBtn"
                                    onClick={() =>
                                        handleDelete(user._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}