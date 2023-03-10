import nc from "next-connect";
import connectDB from "@/connectDB";
import onError from "@/middleware/error.middleware";
import upload from "@/middleware/imageUpload.middleware";
import authMiddleware from "@/middleware/auth.middleware";
import { createEvent, getEvents } from "@/controllers/event/event.controller";

connectDB();
const handler = nc({ onError });
handler
  .use(authMiddleware)
  .use(
    upload.fields([
      { name: "eventBanner", maxCount: 1 },
      { name: "eventImages", maxCount: 10 },
    ])
  )
  .post(createEvent);
handler.use(authMiddleware).get(getEvents);
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
