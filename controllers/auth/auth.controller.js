import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import userModel from "@/models/user.Model";

// description: Get logged in users info
// /api/auth GET Protected
const getUserInfo = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  if (!user) {
    return next(new ErrorHandler("Kindly Verify your mail", 400));
  }
  return res.status(200).json({
    success: true,
    user,
    message: "User Info",
  });
});

// description: Login User
// /api/auth/login POST

const loginUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Kindly Enter all the required field", 400));
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User is not registered", 400));
  }
  if (!user.isVerified) {
    return next(new ErrorHandler("Please verify your account "));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return next(new ErrorHandler("Something went wrong", 400));
    }
    return res.status(200).json({
      success: true,
      token,
      message: "Logged in ",
    });
  });
});

// description : Update Settings
// /api/auth/updatesettings PUT

const updateSettings = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  // const { name, userName } = req.body;
  const { name, userName } = req.body;
  let user = await userModel.findOne({ userName });
  if (user) {
    return next(new ErrorHandler("Username already exists", 400));
  }
  // if (user && user._id.toString() !== req.userId) {
  //   return res.status(400).json({ msg: 'Username is already taken' });
  // }
  const updateUser = {};
  if (name) {
    updateUser.name = name;
  }
  if (userName) {
    updateUser.userName = userName;
  }
  if (req.file && req.file.path) {
    updateUser.profilePic = req.file.path;
  }
  user = await userModel.findByIdAndUpdate(req.userId, updateUser, {
    new: true,
  });
  return res.status(200).json({
    user: user,
    success: true,
    message: "Updated settings",
  });
});

export { updateSettings, getUserInfo, loginUser };
