import nc from "next-connect";
import onError from "../../../middleware/error.middleware";
import connectDB from "@/connectDB";
import { introduceUser } from "@/controllers/induction/induction.controller";
import upload from "@/middleware/imageUpload.middleware";

connectDB();
const handler = nc({ onError });
handler.use(upload.single("profilePic")).post(introduceUser);

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
