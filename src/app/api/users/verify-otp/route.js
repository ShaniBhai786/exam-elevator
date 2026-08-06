import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";

export async function POST(req) {
    try {
        await connectDB();

        const { email, otp } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        if (user.otp !== otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid OTP",
                },
                {
                    status: 400,
                }
            );
        }

        if (new Date() > user.otpExpiry) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP has expired",
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "OTP verified successfully.",
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(error);

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