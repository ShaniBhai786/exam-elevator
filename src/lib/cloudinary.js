import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "unisoft/profile" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};