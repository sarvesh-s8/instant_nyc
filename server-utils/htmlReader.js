import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import fs from "fs/promises";
const htmlReader = tryCatchAsyncErrorMiddleware(async (path) => {
  // console.log(path);
  const html = await fs.readFile(path, { encoding: "utf-8" });
  return html;
});

export default htmlReader;
