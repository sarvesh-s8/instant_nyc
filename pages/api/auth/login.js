import nc from "next-connect";
import connectDB from "@/connectDB";
import { loginUser } from "@/controllers/auth/auth.controller";
import onError from "@/middleware/error.middleware";
const handler = nc({ onError });
connectDB();
handler.post(loginUser);
export default handler;
