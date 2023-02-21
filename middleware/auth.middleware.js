import jwt from "jsonwebtoken";
import ErrorHandler from "@/server-utils/ErrorHandler";
import tryCatchAsyncErrorMiddleware from "./tryCatchAsyncError.middleware";
import userModel from "@/models/user.Model";
const authMiddleware = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Unauthorized User", 401));
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  );
  req.userId = userId;
  next();
});

export default authMiddleware;
