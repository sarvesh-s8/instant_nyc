import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import userModel from "@/models/user.Model";
import ErrorHandler from "@/server-utils/ErrorHandler";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import htmlReader from "@/server-utils/htmlReader";
import emailSend from "@/server-utils/sendEmail";
import Handlebars from "handlebars";
import path from "path";
// description: Update password
// api/auth/password Put Protected
const updatePassword = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const user = await userModel.findById(req.userId).select("+password");
  if (!user) {
    return next(new ErrorHandler("Something went wrong", 400));
  }
  let comparePassword = await bcrypt.compare(currentPassword, user.password);
  // $2a$10$uqlTNUpswC1qwE5t3SM.a.07p0aVH.pdiSYU80OmL.bVuIK3YeW4a
  if (!comparePassword) {
    return next(new ErrorHandler("Invalid Credentials - Wrong password", 400));
  }
  if (newPassword.length < 6) {
    return next(new ErrorHandler("Password should be 6 characters long"));
  }
  let hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password Updated successfully",
  });
});

// description: forgot password
// api/auth/forgot-password Post

const forgotPassword = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Kindly proceed with registered email", 400));
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User is not registered", 400));
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";

  const resetUrl = `${proto}://${req.headers.host}/reset-password/${resetToken}`;
  const apiPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "emails"
  );
  const htmlTemplate = await htmlReader(
    path.join(apiPath, "resetPassword.html")
  );
  const handleBarTemplate = Handlebars.compile(htmlTemplate);
  const replacements = { resetUrl };
  const html = handleBarTemplate(replacements);
  try {
    await emailSend({
      to: user.email,
      subject: "Reset Password",
      html,
    });
  } catch (error) {
    user.verificationToken = undefined;
    await user.save();
    return res.status(400).json({
      success: false,
      message: "Problem in sending email",
    });
  }
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Mail sent successfully",
  });
});

// description: reset password
// api/auth/reset-password/:token Put

const resetPassword = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalide or expired token", 400));
  }
  const { password } = req.body;
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password reset done",
  });
});

export { resetPassword, updatePassword, forgotPassword };
