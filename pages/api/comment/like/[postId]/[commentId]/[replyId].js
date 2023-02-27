import connectDB from "@/connectDB";
import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import { putLikeOrUnlikeCommentReply } from "@/controllers/comment/comment.controller";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).put(putLikeOrUnlikeCommentReply);
export default handler;
