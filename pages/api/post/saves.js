import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { getSavedPosts } from "@/controllers/post/saveLike.controller";
connectDB();
const handler = nc({ onError });

handler.use(authMiddleware).get(getSavedPosts);
export default handler;
