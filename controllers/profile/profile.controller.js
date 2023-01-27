import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import profileModel from "@/models/profile.model";
import userModel from "@/models/user.model";
import ErrorHandler from "@/server-utils/ErrorHandler";

// Description get user profile
// /api/profile/:username
const getUserProfile = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  let { userName } = req.query;
  userName = userName.toLowerCase();
  const user = await userModel.findOne({ userName });
  if (!user) {
    return next(new ErrorHandler("User not available", 400));
  }
  const profile = await profileModel
    .findOne({ user: user._id })
    .populate("user");
  return res.status(200).json({
    success: true,
    message: "User profile found",
    profile,
  });
});

// get users own profile
// /api/profile get
const getUserOwnProfile = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const profile = await profileModel.findOne({ user: req.userId });
    if (!profile) {
      return next(new ErrorHandler("Profile not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Profile found",
      profile,
    });
  }
);

// make users own profile
// /api/profile Put
const makeUserProfile = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { bio, tags, social } = req.body;
  let profile = await profileModel.findOne({ user: req.userId });
  if (!profile) {
    return next(new ErrorHandler("Profile not found", 400));
  }
  if (!bio) {
    return next(new ErrorHandler("Bio is required", 400));
  }
  profile = await new profileModel.findOneAndUpdate(
    {
      user: req.userId,
    },
    { bio, tags, social },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "Profile Created",
    profile,
  });
});

export { getUserProfile, makeUserProfile, getUserOwnProfile };
// d5e8c91edb8e47e9236050904bfae5486dff36a7
// 2c69f624aca444592682d9860fee3a3b5a7898fb
