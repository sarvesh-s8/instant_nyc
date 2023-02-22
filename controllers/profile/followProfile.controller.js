import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import followerModel from "@/models/follower.Model";
import userModel from "@/models/user.Model";

// api/profile/:username/followers
// get user's followers info
const getUserNameFollowers = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    let userName = req.query.userName.toLowerCase();
    const user = await userModel.findOne({
      userName,
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    const followers = await followerModel
      .findOne({ user: user._id })
      .populate("followers.user");
    console.log(followers);
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
    let userName = req.query.userName.toLowerCase();
    const user = await userModel.findOne({
      userName,
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

//  api/profile/follow/:userId
//  follow a user Protected
const putFollowOrUnfollow = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const loggedInUser = await followerModel.findOne({ user: req.userId });
    const userToFollowOrUnfollow = await followerModel.findOne({
      user: req.query.userId,
    });
    console.log(loggedInUser, userToFollowOrUnfollow);
    if (!loggedInUser || !userToFollowOrUnfollow) {
      return next(new ErrorHandler("User not found", 400));
    }
    const isFollowing =
      loggedInUser.following.length &&
      loggedInUser.following.filter(
        (f) => f.user.toString() === req.query.userId
      ).length > 0;
    if (isFollowing) {
      let index = loggedInUser.following.findIndex(
        (f) => f.toString() === req.query.userId
      );
      loggedInUser.following.splice(index, 1);
      await loggedInUser.save();
      index = userToFollowOrUnfollow.followers.findIndex(
        (f) => f.user.toString() === req.userId
      );
      userToFollowOrUnfollow.followers.splice(index, 1);
      await userToFollowOrUnfollow.save();
      // notify
      return res.status(200).json({
        success: true,
        message: "User unfollowed",
        followers: userToFollowOrUnfollow.followers,
      });
    } else {
      loggedInUser.following.unshift({ user: req.query.userId });
      await loggedInUser.save();

      userToFollowOrUnfollow.followers.unshift({ user: req.userId });
      await userToFollowOrUnfollow.save();
      // notify
      return res.status(200).json({
        success: true,
        message: "User followed",
        followers: userToFollowOrUnfollow.followers,
      });
    }
    }
);

export { getUserNameFollowers, getUserNameFollowing, putFollowOrUnfollow };

// "user":{"$oid":"63d972601801b7f0dfa82ecb"},
// "followers":[],

// "following":[]
