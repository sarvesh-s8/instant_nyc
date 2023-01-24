import nc from "next-connect";
import connectDB from "@/connectDB";
import { updateSettings } from "@/controllers/auth/auth.controller";
import onError from "@/middleware/error.middleware";
import upload from "@/middleware/imageUpload.middleware";
import authMiddleware from "@/middleware/auth.middleware";
const handler = nc({ onError });
connectDB();
handler.use(authMiddleware, upload.single("profilePic")).put(updateSettings);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
