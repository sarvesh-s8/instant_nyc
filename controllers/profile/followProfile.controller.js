import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import followerModel from "@/models/follower.Model";
import userModel from "@/models/user.Model";

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
// api/follow/:userID Post

const followAUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { userID } = req.query;
  const loggedInuser = await followerModel.findOne({ user: req.userId });
  const userToFollowOrUnfollow = await followerModel.findOne({
    user: userID,
  });
  if (!loggedInuser || !userToFollowOrUnfollow) {
    return next(new ErrorHandler("User not found", 404));
  }
  const checkIfFollowing =
    loggedInuser.following &&
    loggedInuser.following.filter((e) => e.user.toString() === userID).length >
      0;
  if (checkIfFollowing) {
    // let
  }
});

export { getFollowers, getFollowing };
