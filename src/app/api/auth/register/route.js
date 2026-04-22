import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import {User} from "../../../../models/User";
import { hashPassword } from "../../../../lib/hash";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      username, email, password,
      fullName, Contact, CNIC,
      userRole, subscription
    } = body;

    // Validate safely
    if (
      !username || !email || !password ||
      !fullName || !Contact || !CNIC || !userRole ||
      subscription === undefined
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ email }, { CNIC }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email or CNIC" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      fullName,
      Contact,
      CNIC,
      userRole,
      subscription,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}