import nc from "next-connect";
import onError from "../../../middleware/error.middleware";
import connectDB from "@/connectDB";
import authMiddleware from "@/middleware/auth.middleware";
import {
  getUserOwnProfile,
  updateUserProfile,
} from "@/controllers/profile/profile.controller";

connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).put(updateUserProfile).get(getUserOwnProfile);
export default handler;
