import connectDB from "@/connectDB";
import nc from "next-connect";
import onError from "@/middleware/error.middleware";
import { getAdvancedPosts } from "@/controllers/search/search.controller";
connectDB();
const handler = nc({ onError });
handler.get(getAdvancedPosts);
export default handler;
