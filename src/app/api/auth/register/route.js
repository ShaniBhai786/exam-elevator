import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";

export async function POST(req) {
  try {
    const { username, email, password, fullName, Contact, CNIC, userRole, subscription} = await req.json();

    // 1. Validate input
    if ([username, email, password, fullName, Contact, CNIC, userRole, subscription].some(field => !field || field.trim() === "")) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Connect DB
    await connectDB();

    // 3. Check if user exists
    const existingUser = await User.findOne({
        $or: [{email}, {CNIC}]
    });
    if (existingUser.email === email) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    if (existingUser.CNIC === CNIC) {
    return NextResponse.json(
    { message: "User with this CNIC already exists" },
    { status: 409 }
  );
}

    // 4. Hash password
    const hashedPassword = await hashPassword(password);

    // 5. Create user
    const user = await User.create({
      username, email, fullName, Contact, CNIC, userRole, subscription, password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        },
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}