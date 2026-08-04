import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Paper } from "../../../../../models/Database";
import { User } from "../../../../../models/User";
import mongoose from "mongoose";

export async function POST(request, context) {
    try {
        await connectDB();

        const { id } = await context.params;
        const { email } = await request.json();
        console.log("Context:", context);
        console.log("Params:", context.params);
        console.log("Paper ID:", id);
        console.log("Email:", email);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid paper ID",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const paper = await Paper.findById(id);

        if (!paper) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Paper not found",
                },
                { status: 404 }
            );
        }

        if (!paper.sharedWith) {
            paper.sharedWith = [];
        }

        const alreadyShared = paper.sharedWith.some(
            (sharedUserId) => sharedUserId.toString() === user._id.toString()
        );

        if (!alreadyShared) {
            paper.sharedWith.push(user._id);
            await paper.save();
        }

        return NextResponse.json({
            success: true,
            message: "Paper shared successfully.",
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