import { NextResponse } from "next/server";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { User } from "@/models/user.model";

export async function POST(req) {
    try {
        await verifyAdmin(req);

        const body = await req.json();

        const user = await User.create(body);

        return NextResponse.json(
            {
                success: true,
                data: user,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 403 }
        );
    }
}