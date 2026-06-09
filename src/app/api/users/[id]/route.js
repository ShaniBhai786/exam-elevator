import { NextResponse } from "next/server";
import { User } from "../../../../models/User";
import {connectDB} from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const user = await User.findById(params.id).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}


export async function PUT(req, { params }) {
    try {
        await connectDB();

        const body = await req.json();

        const user = await User.findByIdAndUpdate(
            params.id,
            body,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}





const currentUser = await User.findById(decodedToken._id);

if (!currentUser || currentUser.userRole !== "admin") {
    return NextResponse.json(
        {
            success: false,
            message: "Access denied",
        },
        { status: 403 }
    );
}