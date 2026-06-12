import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Paper } from "../../../../models/Database";

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        await Paper.findByIdAndDelete(params.id);

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}