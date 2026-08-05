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

        const { id } = await params;
        const body = await req.json();

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
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}