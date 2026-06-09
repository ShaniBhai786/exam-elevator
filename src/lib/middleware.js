import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const verifyAdmin = async (req) => {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        throw new Error("No token found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userRole !== "admin") {
        throw new Error("Not authorized as admin");
    }

    return decoded;
};