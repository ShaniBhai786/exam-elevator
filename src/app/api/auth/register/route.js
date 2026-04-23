import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import {User} from "../../../../models/User";
import { hashPassword } from "../../../../lib/hash";
import { uploadOnCloudinary } from "../../../../lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");
    const Contact = formData.get("Contact");
    const CNIC = formData.get("CNIC");
    const userRole = formData.get("userRole");
    const subscription = formData.get("subscription");
    const file = formData.get("Profile"); 

    if (
      !username || !email || !password ||
      !fullName || !Contact || !CNIC || !userRole ||
      !subscription || !file
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
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const imageUrl = await uploadOnCloudinary(file);

    const user = await User.create({
      username,
      email,
      fullName,
      Contact,
      CNIC,
      userRole,
      subscription,
      password: hashedPassword,
      Profile: imageUrl,
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}