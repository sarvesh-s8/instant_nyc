import profileModel from "@/models/profile.Model";
import followerModel from "@/models/follower.Model";
import postModel from "@/models/post.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";

const getRecommendations = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const profile = await profileModel.findOne({ user: req.userId });
    let popularUsers = await followerModel.aggregate([
      {
        $project: {
          user: 1,
          followers: 1,
          following: 1,
          length: { $size: "$followers" },
        },
      },
      { $sort: { length: -1 } },
      { $limit: 5 },
    ]);
    popularUsers = await followerModel.populate(popularUsers, {
      path: "user",
      select: ["name", "profilePic", "userName"],
    });
    const posts = await postModel
      .find({
        tags: { $in: profile.tags },
      })
      .populate("user", ["name", "username", "profilePic"])
      .sort({ createdAt: -1 })
      .limit(6);
    let similarUsers = await profileModel.aggregate([
      { $match: { tags: { $in: profile.tags } } },
      { $unwind: "$tags" },
      { $match: { tags: { $in: profile.tags } } },
      { $group: { _id: "$_id" } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    similarUsers = similarUsers.map((u) => u._id);
    similarUsers = await profileModel
      .find({ _id: { $in: similarUsers } })
      .populate("user", ["name", "profilePic", "userName"]);
    return res.status(200).json({
      message: "Recommendations",
      posts,
      popular: popularUsers,
      similar: similarUsers,
      success: true,
    });
  }
);
