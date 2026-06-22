import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});


export const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "users",
    }
  );
  res.json({
    success: true,
    imageUrl:result.secure_url,
  });
};