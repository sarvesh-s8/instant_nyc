import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import followerModel from "@/models/followerModel";
import postModel from "@/models/postModel";
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
  const posts = await postModel
    .find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user");
  const follow = await followerModel.findOne({ user: user._id });
  // const sh = await followerModel.find();
  // console.log(sh);

  return res.status(200).json({
    success: true,
    message: "User profile found",
    profile,
    posts,
    followers: follow.followers,
    following: follow.following,
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

// update users own profile
// /api/profile Put
const updateUserProfile = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const { bio, tags, social } = req.body;
    let profile = await profileModel.findOne({ user: req.userId });
    if (!profile) {
      return next(new ErrorHandler("Profile not found", 400));
    }
    if (social?.twitter) {
      social.twitter = twitter;
    }
    if (social?.youtube) {
      social.youtube = youtube;
    }

    profile = await profileModel.findOneAndUpdate(
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
  }
);

export { getUserProfile, updateUserProfile, getUserOwnProfile };
// d5e8c91edb8e47e9236050904bfae5486dff36a7
// 2c69f624aca444592682d9860fee3a3b5a7898fb
