import nc from "next-connect";
import connectDB from "@/connectDB";
import { getUserInfo } from "@/controllers/auth/auth.controller";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(getUserInfo);
export default handler;
