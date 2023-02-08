import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import {
  updatePost,
  deletePost,
  getParticularPost,
} from "@/controllers/post/post.controller";
import upload from "@/middleware/imageUpload.middleware";
connectDB();
const handler = nc({ onError });

handler.get(getParticularPost);

handler.use(authMiddleware, upload.array("images", 5)).put(updatePost);

handler.use(authMiddleware).delete(deletePost);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
