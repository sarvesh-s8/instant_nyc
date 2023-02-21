import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import connectDB from "@/connectDB";
import { getUserNameFollowers } from "@/controllers/profile/followProfile.controller";
connectDB();
const handler = nc({ onError });
handler.get(getUserNameFollowers);

export default handler;
