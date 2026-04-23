import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import {User} from "../../../../models/User";
import { comparePassword } from "../../../../lib/hash";
import { generateAccessToken, generateRefreshToken } from "../../../../lib/jwt";

export async function POST(req) {
    try {
        const {email, password} = await req.json()

        if (!email || !password ) {
            return NextResponse.json(
                {message: "Please enter the email and password"}
            )
        }
        
        await connectDB()

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json(
                {message: "user not found"},
                {status: 404}
            )
        }

        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                {message: "Invalid Credentials"},
                {status: 401}
            )
        }
const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

user.refreshToken = refreshToken;
await user.save();

return NextResponse.json(
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
        Profile: user.Profile
    },
    accessToken,
    refreshToken,
  },
  { status: 200 }
);
    } catch (error) {
        return NextResponse.json(
            {message: error.message || "server error"},
            {status: 500}
        )
    }
}