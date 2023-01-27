import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import profileModel from "@/models/profile.model";
import ErrorHandler from "@/server-utils/ErrorHandler";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel from "@/models/user.model";

// do verification and add user profile
// /api/induction/:token
const introduceUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { token } = req.query;
  const verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await userModel.findOne({ verificationToken });
  if (!user) {
    return next(
      new ErrorHandler("Verification expired or Invalid session", 400)
    );
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  if (req.file) {
    user.profilePic = req.file.path;
  }
  await user.save();

  const { bio, tags, social } = req.body;
  if (!bio) {
    return next(new ErrorHandler("Bio is required", 400));
  }
  console.log(tags, "HErer", typeof tags, JSON.parse(tags));
  const { twitter, youtube } = JSON.parse(social);
  let profile = {};
  profile.user = user._id;
  profile.bio = bio;
  profile.tags = JSON.parse(tags);
  profile.badges = [];
  profile.social = {};
  if (youtube) {
    profile.social.youtube = youtube;
  }
  if (twitter) {
    profile.social.twitter = twitter;
  }
  await new profileModel(profile).save();
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return next(new ErrorHandler(`${err}`, 400));
    }
    return res.status(200).json({
      success: true,
      message: "User verified",
      token,
    });
  });
});

export { introduceUser };
