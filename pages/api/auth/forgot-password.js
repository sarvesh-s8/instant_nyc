import nc from "next-connect";
import connectDB from "@/connectDB";
import { forgotPassword } from "@/controllers/auth/password.controller";
import onError from "@/middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.post(forgotPassword);
export default handler;
