import connectDB from "@/connectDB";
import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import { getSearchUserAndPost } from "@/controllers/search/search.controller";
connectDB();
const handler = nc({ onError });
handler.get(getSearchUserAndPost);
export default handler;
