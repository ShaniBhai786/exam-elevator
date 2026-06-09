import {connectDB} from "../../../lib/db"
import {User} from "../.././../models/User";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        await connectDB();

        const teachers = await User.find(
            { userRole: "teacher" }
        ).select("-password").sort({ createdAt: -1 }).lean();

        return NextResponse.json({
            success: true,
            count: teachers.length,
            teachers,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch teachers" },
            { status: 500 }
        )
    }
}