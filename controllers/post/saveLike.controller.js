import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import userModel from "@/models/user.model";
import postModel from "@/models/postModel";
import ErrorHandler from "@/server-utils/ErrorHandler";

// get saves
// // api/posts/saves
const getSavedPosts = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);
  const saves = await postModel
    .find({
      "saves.user": userId,
    })
    .populate("user");
  return res.status(200).json({
    success: true,
    message: "saved post fetched",
    saves,
  });
});

// save or unsave the post
// api/posts/save/:id
const saveOrUnSavePost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    let post = await postModel.findById(req.query.postId);
    if (!post) {
      return next(new ErrorHandler("Post not found", 400));
    }
    const isSavedPost =
      post.saves.filter((s) => s.user.toString() === req.userId).length > 0;
    if (isSavedPost) {
      const indexedPost = post.saves.findIndex(
        (save) => save.user.toString() === req.userId
      );
      post.saves.splice(indexedPost, 1);
      post = await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Saved/Unsaved successfully",
        post,
      });
    }
  }
);

// like or unlike the post
// api/posts/like/:postId
const likeOrUnlikePost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    let post = await postModel.findById(req.query.postId);
    if (!post) {
      return next(new ErrorHandler("Post not found", 400));
    }
    const isLiked =
      post.likes.filter((like) => like.user.toString() === req.userId).length >
      0;
    if (isLiked) {
      const indexLikePost = post.likes.findIndex(
        (like) => like.user.toString() === req.userId
      );
      post.likes.splice(indexLikePost, 1);
      post = await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
        post,
      });
    } else {
      post.likes.unshift({ user: req.userId });
      post = await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
        post,
      });
    }
  }
);

// api/posts/like/:postId
// total no.of likes
const getTotalLikesForPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const post = await postModel
      .findById(req.query.postId)
      .populate("likes.user");
    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched",
      likes: post.likes,
    });
  }
);

export {
  saveOrUnSavePost,
  getSavedPosts,
  likeOrUnlikePost,
  getTotalLikesForPost,
};
