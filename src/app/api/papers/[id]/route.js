import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "../../../../lib/db";
import { Paper } from "../../../../models/Database";

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        console.log("DELETE route reached");
        console.log("ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid paper ID",
                },
                { status: 400 }
            );
        }

        const paper = await Paper.findByIdAndDelete(id);

        if (!paper) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Paper not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: err.message,
            },
            { status: 500 }
        );
    }
}

// GET a single paper
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const paper = await Paper.findById(id)
            .populate("userId", "fullName email");
            console.log(paper.userId);
        if (!paper) {
            return NextResponse.json(
                { success: false, message: "Paper not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            paper,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
