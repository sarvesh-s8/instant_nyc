import nc from "next-connect";
import connectDB from "@/connectDB";
import { resetPassword } from "@/controllers/auth/password.controller";
import onError from "@/middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.put(resetPassword);
export default handler;
