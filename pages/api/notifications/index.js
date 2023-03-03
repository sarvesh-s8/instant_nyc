import nc from "next-connect";
import connectDB from "@/connectDB";
import {
  getNotifications,
  postNotifications,
} from "@/controllers/notification/notification.controller";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(getNotifications).post(postNotifications);
export default handler;
