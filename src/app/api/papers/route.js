import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db.js";
import { Paper } from "../../../models/Database.js";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required.",
                },
                { status: 400 }
            );
        }

        // Papers created by the user
        const myPapers = await Paper.find({
            userId,
        }).sort({ createdAt: -1 });

        // Papers shared with the user
        const sharedPapers = await Paper.find({
            sharedWith: userId,
        })
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            myPapers,
            sharedPapers,
        });
    } catch (error) {
        console.error("Fetch Papers Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            userId,
            subject,
            shortQuestions,
            longQuestions,
            noSQs,
            noLQs,
            shortMarks,
            longMarks,
            year,
            semester,
            term,
        } = body;

        if (!userId || !subject) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID and Subject are required.",
                },
                { status: 400 }
            );
        }

        const paper = await Paper.create({
            userId,
            subject,
            shortQuestions,
            longQuestions,
            noSQs,
            noLQs,
            shortMarks,
            longMarks,
            year,
            semester,
            term,
            sharedWith: [],
        });

        return NextResponse.json(
            {
                success: true,
                message: "Paper saved successfully.",
                paper,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Save Paper Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}