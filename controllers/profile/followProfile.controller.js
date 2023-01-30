import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import followerModel from "@/models/followerModel";
import userModel from "@/models/user.model";

// get followers from username
// /api/followers/:username Get
const getFollowers = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { userName } = req.query;
  const user = await userModel.findOne({ userName: userName.toLowerCase() });
  if (!user) {
    return next(new ErrorHandler("User not available", 400));
  }
  const followers = await followerModel
    .findOne({ user: user._id })
    .populate("followers.user");
  return res.status(200).json({
    success: true,
    message: "Data fetched",
    data: followers,
  });
});

// get following persons from username
// /api/following/:username Get
const getFollowing = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { username } = req.query;
  const user = await userModel.findOne({ userName: username.toLowerCase() });
  if (!user) {
    return next(new ErrorHandler("User not available", 400));
  }
  const following = await followerModel
    .findOne({ user: user._id })
    .populate("following.user");
  return res.status(200).json({
    success: true,
    message: "Data fetched",
    data: following,
  });
});

// follow a user
// api/follow/:userId Post

const followAUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  
});

export { getFollowers, getFollowing };
