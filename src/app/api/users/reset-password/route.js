import { NextResponse } from "next/server";
import { User } from "../../../../models/User"
import { connectDB } from "../../../../lib/db"
import bcrypt from "bcryptjs" 

export async function POST(req) {
    try {
        await connectDB()

        const {email, password} = await req.json()

        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not Found"
            },
        {
            status: 404
        })
    }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.otp = undefined;
        user.otpExpiry = undefined
        await user.save()

            return NextResponse.json(
                {
                    success: true,
                    message: "Password reset successfully.",
                },
                {
                    status: 200,
                }
            );

    } catch (error) {
        return NextResponse.json({
            status: false,
            message: `Unable to reset Password, ${error.message}`
        })
    }
}