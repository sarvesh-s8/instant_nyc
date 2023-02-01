import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { createPost, getAllPosts } from "@/controllers/post/post.controller";
import upload from "@/middleware/imageUpload.middleware";
const handler = nc({ onError });
connectDB();

handler.get(getAllPosts);
handler.use(authMiddleware, upload.array("images", 5)).post(createPost);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
