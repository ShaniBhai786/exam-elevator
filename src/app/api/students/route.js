import { NextResponse } from "next/server";
import {connectDB} from "../../../lib/db";
import {User} from "../.././../models/User";

export async function GET() {
    try {
        await connectDB();

        const students = await User.find({
            userRole: "student",
        })
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            count: students.length,
            students,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}