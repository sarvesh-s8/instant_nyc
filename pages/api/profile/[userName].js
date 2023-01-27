import nc from "next-connect";
import onError from "../../../middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { getUserProfile } from "@/controllers/profile/profile.controller";

const handler = nc({ onError });
connectDB();
handler.use(authMiddleware).get(getUserProfile);

export default handler;
