import nc from "next-connect";
import connectDB from "@/connectDB";
import { updatePassword } from "@/controllers/auth/password.controller";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
const handler = nc({ onError });
connectDB();
handler.use(authMiddleware).put(updatePassword);
export default handler;
