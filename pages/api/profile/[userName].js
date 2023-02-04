import nc from "next-connect";
import onError from "../../../middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import { getUserProfile } from "@/controllers/profile/profile.controller";

connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(getUserProfile);

export default handler;
