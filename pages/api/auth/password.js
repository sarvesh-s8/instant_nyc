import nc from "next-connect";
import connectDB from "@/connectDB";
import { updatePassword } from "@/controllers/auth/password.controller";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).put(updatePassword);
export default handler;
