import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Paper } from "../../../models/Database";

// GET
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        const papers = await Paper.find(userId ? { userId } : {});

        return NextResponse.json({ papers });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// POST
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const paper = await Paper.create(body);

        return NextResponse.json({ paper }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}