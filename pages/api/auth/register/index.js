import nc from "next-connect";
import connectDB from "@/connectDB";
import { registerUser } from "@/controllers/auth/register.controller";
import onError from "@/middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.post(registerUser);
export default handler;
