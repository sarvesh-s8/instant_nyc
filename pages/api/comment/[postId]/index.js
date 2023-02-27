import connectDB from "@/connectDB";
import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import {
  getCommentsOnPost,
  postCommentsOnPost,
} from "@/controllers/comment/comment.controller";
connectDB();
const handler = nc({ onError });
handler.get(getCommentsOnPost);
handler.use(authMiddleware).post(postCommentsOnPost);
export default handler;
