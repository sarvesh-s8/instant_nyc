import nc from "next-connect";
import connectDB from "@/connectDB";
import { getUserName } from "@/controllers/auth/register.controller";
import onError from "@/middleware/error.middleware";

connectDB();
console.log("IM HERE");
const handler = nc({ onError });
handler.get(getUserName);
export default handler;
