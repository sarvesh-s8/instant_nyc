import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import {
  getTotalLikesForPost,
  likeOrUnlikePost,
} from "@/controllers/post/saveLike.controller";
connectDB();
const handler = nc({ onError });
handler.get(getTotalLikesForPost);
handler.use(authMiddleware).put(likeOrUnlikePost);
export default handler;
