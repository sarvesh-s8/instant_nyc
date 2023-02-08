import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { getFeedPosts } from "@/controllers/post/post.controller";
connectDB();
const handler = nc({ onError });

handler.use(authMiddleware).get(getFeedPosts);
export default handler;
