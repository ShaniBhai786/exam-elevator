import { NextResponse } from "next/server";
import { User } from "../../../models/User";
import {connectDB} from "../../../lib/db";
import bcrypt from "bcryptjs";
import { verifyAdmin } from "../../../lib/middleware";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find().select("-password");

        return NextResponse.json(
            {
                success: true,
                users,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            username,
            email,
            fullName,
            password,
            userRole,
            CNIC,
            Contact,
            subscription,
        } = body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
                { CNIC }
            ]
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists",
                },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            fullName,
            password: hashedPassword,
            userRole,
            CNIC,
            Contact,
            subscription,
        });

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        console.log("Deleting user:", id);

        // 1. Find user first (to get image)
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // 2. Delete image from Cloudinary if exists
        if (user.Profile) {
            try {
                // extract public_id from URL
                const urlParts = user.Profile.split("/");
                const fileWithExt = urlParts[urlParts.length - 1];
                const publicId = fileWithExt.split(".")[0];

                await cloudinary.uploader.destroy(publicId);
            } catch (imgErr) {
                console.error("Cloudinary delete failed:", imgErr.message);
            }
        }

        // 3. Delete user from DB
        await User.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "User and profile image deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}


export async function PUT(req) {
    try {
        await verifyAdmin(req);

        const formData = await req.formData();

        const id = formData.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const userRole = formData.get("userRole");
        const file = formData.get("Profile");

        let imageUrl = null;

        // 🔥 STEP 1: upload to cloudinary if file exists
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadRes = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "users",
                    },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            imageUrl = uploadRes.secure_url;
        }

        // 🔥 STEP 2: build update object
        const data = {
            fullName,
            email,
            userRole,
        };

        if (imageUrl) {
            data.Profile = imageUrl;
        }

        // 🔥 STEP 3: update DB
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
        });

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}