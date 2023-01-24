import nc from "next-connect";
import connectDB from "@/connectDB";
import { registerUser } from "@/controllers/auth/register.controller";
import onError from "@/middleware/error.middleware";
const handler = nc({ onError });
connectDB();
handler.post(registerUser);
export default handler;
