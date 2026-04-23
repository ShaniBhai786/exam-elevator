export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import { uploadOnCloudinary } from "../../../lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("Profile");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const uploadResult = await uploadOnCloudinary(file);

    return NextResponse.json({
      message: "Uploaded successfully",
      url: uploadResult.secure_url, // ✅ FIXED (IMPORTANT)
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}