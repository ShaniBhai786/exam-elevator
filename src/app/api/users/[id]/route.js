import { NextResponse } from "next/server";
import { User } from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import jwt from "jsonwebtoken";

// helper function
const getUserFromToken = (req) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return null;

        const token = authHeader.split(" ")[1];
        if (!token) return null;

        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};



export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const user = await User.findById(id)
            .select("-password -refreshToken -accessToken");

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}


export async function PUT(req, { params }) {
    try {
        await connectDB();

        // 🔐 AUTH CHECK
        const decodedToken = getUserFromToken(req);

        if (!decodedToken) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const currentUser = await User.findById(decodedToken._id);

        if (!currentUser || currentUser.userRole.toLowerCase() !== "admin") {
            return NextResponse.json(
                { success: false, message: "Access denied" },
                { status: 403 }
            );
        }

        const { id } = await params;

        const user = await User.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password -refreshToken -accessToken");

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, user },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}