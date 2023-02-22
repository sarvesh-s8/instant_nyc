import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import connectDB from "@/connectDB";
import { putFollowOrUnfollow } from "@/controllers/profile/followProfile.controller";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).put(putFollowOrUnfollow);

export default handler;
