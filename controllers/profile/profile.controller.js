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
    if (social.twitter) {
      social.twitter = twitter;
    }
    if (social.youtube) {
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

//  api/profile/:username/followers
// get user's followers info
const getUserNameFollowers = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await userModel.findOne({
      userName: req.query.username.toLowerCase(),
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    const followers = await followerModel
      .findOne({ user: user._id })
      .populate("followers.user");

    return res.status(200).json({
      success: true,
      message: "Followers Fetched",
      followers: followers.followers,
    });
  }
);

//  api/profile/:username/following
// get user's following info
const getUserNameFollowing = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await userModel.findOne({
      userName: req.query.username.toLowerCase(),
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    const following = await followerModel
      .findOne({ user: user._id })
      .populate("following.user");

    return res.status(200).json({
      success: true,
      message: "following Fetched",
      following: following.following,
    });
  }
);

//  api/profile/follow/:userId
//  follow a user Protected
const putFollowOrUnfollow = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await followerModel.findOne({ user: req.userId });
    const userToFollowOrUnfollow = await followerModel.findOne({
      user: req.query.userId,
    });
    if (!user || !userToFollowOrUnfollow) {
      return next(new ErrorHandler("User not found", 400));
    }
    const isFollowing =
      user.following.length &&
      user.following.filter((f) => f.user.toString() === req.query.userId)
        .length > 0;
    if (isFollowing) {
      let index = user.following.findIndex(
        (f) => f.toString() === req.query.userId
      );
      user.following.splice(index, 1);
      await user.save();
      index = userToFollowOrUnfollow.followers.findIndex(
        (f) => f.user.toString() === req.userId
      );
      userToFollowOrUnfollow.followers.splice(index, 1);
      await userToFollowOrUnfollow.save();
      // notify
      return res.status(200).json({
        success: true,
        message: "User Followed",
        followers: userToFollowOrUnfollow.followers,
      });
    } else {
      user.following.unshift({ user: req.query.userId });
      await user.save();

      userToFollowOrUnfollow.followers.unshift({ user: req.userId });
      await userToFollowOrUnfollow.save();
      // notify
      return res.status(200).json({
        success: true,
        message: "User unfollowed",
        followers: userToFollowOrUnfollow.followers,
      });
    }
  }
);

export {
  getUserProfile,
  updateUserProfile,
  getUserOwnProfile,
  getUserNameFollowers,
  getUserNameFollowing,
  putFollowOrUnfollow,
};
// d5e8c91edb8e47e9236050904bfae5486dff36a7
// 2c69f624aca444592682d9860fee3a3b5a7898fb
