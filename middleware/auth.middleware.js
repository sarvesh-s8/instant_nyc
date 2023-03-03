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
  const user = await userModel.findById(userId);
  if (!user.isVerified) {
    return next(new ErrorHandler("User is not verified", 404));
  }
  req.userId = userId;
  next();
});

export default authMiddleware;
