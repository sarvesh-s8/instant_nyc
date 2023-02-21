import ErrorHandler from "@/server-utils/ErrorHandler";
import jwt from "jsonwebtoken";
import path, { join } from "path";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import userModel from "@/models/user.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import htmlReader from "@/server-utils/htmlReader";
import emailSend from "@/server-utils/sendEmail";
import Handlebars from "handlebars";
// const handlebars = require('handlebars');

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

// description: username check
// /api/auth/register/:username GET
const getUserName = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  // console.log(req.params, req.query);
  const { username } = req.query;
  // console.log(username);
  if (!usernameRegex.test(username)) {
    return next(new ErrorHandler("Username invalid", 400));
  }
  const findUserName = await userModel.findOne({
    userName: username.toLowerCase(),
  });
  if (findUserName) {
    return next(new ErrorHandler("User name already taken", 404));
  }
  return res
    .status(200)
    .json({ success: true, message: "User name is available" });
});

// description: register User
// /api/auth/register Post

const registerUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { name, email, password, userName } = req.body;
  if (!email || !name || !password || !userName) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  let user = await userModel.findOne({ email: email.toLowerCase() });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }
  user = await userModel.findOne({ userName: userName.toLowerCase() });
  if (user) {
    return next(new ErrorHandler("User Name is already taken", 400));
  }

  user = new userModel({
    name,
    email: email.toLowerCase(),
    password,
    userName: userName.toLowerCase(),
  });

  user.password = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(20).toString("hex");
  user.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  await user.save();

  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";

  const verificationURL = `${proto}://${req.headers.host}/joining/${verificationToken}`;
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
    path.join(apiPath, "verification.html")
  );
  const handleBarTemplate = Handlebars.compile(htmlTemplate);
  const replacements = { verificationURL };
  const html = handleBarTemplate(replacements);
  try {
    await emailSend({
      to: user.email,
      subject: "Authorization",
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
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return next(new ErrorHandler("Registration went wrong", 404));
    }
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });
  });
});

export { registerUser, getUserName };
