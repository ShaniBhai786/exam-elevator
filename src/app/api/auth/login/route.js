import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { comparePassword } from "../../../../lib/hash";
import { generateAccessToken, generateRefreshToken } from "../../../../lib/jwt";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please enter email and password" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        const response = NextResponse.json(
            {
                message: "User Logged in",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    userRole: user.userRole,
                    CNIC: user.CNIC,
                    subscription: user.subscription,
                    Contact: user.Contact,
                    Profile: user.Profile,
                },
                accessToken,
                refreshToken,
            },
            { status: 200 }
        );

        response.cookies.set("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            { message: error.message || "server error" },
            { status: 500 }
        );
    }
}