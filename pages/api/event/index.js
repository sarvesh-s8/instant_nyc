import nc from "next-connect";
import connectDB from "@/connectDB";
import onError from "@/middleware/error.middleware";
import upload from "@/middleware/imageUpload.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import { createEvent } from "@/controllers/event/event.controller";

connectDB();
const handler = nc({ onError });
// handler.use(upload.single("profilePic")).post(introduceUser);
handler.use(authMiddleware, upload.array("eventImage", 10)).post(createEvent);

// handler.use(authMiddleware, upload.array("images", 5)).post(createPost);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
