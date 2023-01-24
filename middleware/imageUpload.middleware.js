import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   folder: "instaNYC",
  //   upload_preset: "instaNYC",
  // },
});

const upload = multer({
  storage,
});
// console.log(upload, "HERE");

export default upload;
