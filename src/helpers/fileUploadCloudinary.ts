import { v2 as cloudinary } from "cloudinary";

export default async function uploadToCloudinary(file: File) {
  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  // this will be used to upload the file
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
  try {
    const res = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      filename_override: file.name,
      folder: "user-profile-images", // any sub-folder name in your cloud
      use_filename: true,
    });
    return res.secure_url;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
