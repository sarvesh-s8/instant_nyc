import nc from "next-connect";
import connectDB from "@/connectDB";
import onError from "@/middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import { getEventAttendees } from "@/controllers/event/event.controller";

connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(getEventAttendees);

export default handler;
