import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { saveOrUnSavePost } from "@/controllers/post/saveLike.controller";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).put(saveOrUnSavePost);
export default handler;
