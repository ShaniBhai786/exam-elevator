import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Paper } from "../../../../models/Database";

export async function DELETE(req, context) {
    try {
        await connectDB();

        const { id } = await context.params;

        console.log("Deleting Paper ID:", id);

        const deletedPaper = await Paper.findByIdAndDelete(id);

        if (!deletedPaper) {
            return NextResponse.json(
                { message: "Paper not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Paper deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}