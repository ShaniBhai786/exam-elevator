import { NextResponse } from "next/server";
import {connectDB} from "../../../../lib/db"
import {User} from "../../../../models/User"

export async function POST(req) {
    try {
        await connectDB()

        const { email } = await req.json()
        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User with this email is not found"
            },{
                status: 404
            })
        }

        const OTP = Math.floor(Math.random() * 900000 + 100000).toString()
        user.otp = OTP
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
        await user.save()

        return NextResponse.json(
            {
                success: true,
                message:"OTP generated Successfully!",
                otp: OTP
            },
            {
                status: 201,
            }
        )
        return NextResponse.json({
            success: true,
            message: "Password reset link has been sent to your email"
        },{
            status: 200
        })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}