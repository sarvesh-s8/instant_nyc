import { v4 as uuidv4 } from "uuid";
import userModel from "@/models/user.Model";
import postModel from "@/models/post.Model";
import commentModel from "@/models/comment.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import {
  newCommentNotification,
  removeCommentNotification,
  newReplyNotification,
  removeReplyNotification,
} from "@/server-utils/notification";

// /api/comment/:postId
// get Comment on a post
const getCommentsOnPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postComment = await commentModel
      .findOne({ post: req.query.postId })
      .populate("comments.user")
      .populate("comments.replies.user");
    if (!postComment) {
      return next(new ErrorHandler("Post not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Data",
      comments: postComment.comments,
    });
  }
);

// /api/comment/:postId
// new Comment on a post
const postCommentsOnPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const text = req.body.text;
    if (!text) {
      return next(new ErrorHandler("Comment cannot be blank", 400));
    }
    let post = await commentModel.findOne({ post: req.query.postId });
    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }
    const comment = {
      commentId: uuidv4(),
      user: req.userId,
      text: req.body.text,
      date: Date.now(),
      likes: [],
      replies: [],
    };
    post.comments.unshift(comment);
    post = await post.save();
    post = await commentModel.populate(post, "comments.user");
    post = await commentModel.populate(post, "comments.replies.user");
    const postInfo = await postModel.findById(req.query.postId);
    if (postInfo.user.toString() !== req.userId) {
      await newCommentNotification(
        postInfo.user,
        req.userId,
        req.query.postId,
        comment.commentId,
        text
      );
    }
    return res.status(201).json({
      success: true,
      message: "Comment saved",
      comments: post.comments,
    });
  }
);

// /api/comment/:postId/:commentId
// Delete a comment
const deleteCommentPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postId = req.query.postId;
    const commentId = req.query.commentId;
    let post = await commentModel.findOne({ post: postId });
    if (!post) {
      return next(new ErrorHandler("Post unavailable", 404));
    }
    let comment = post.comments.find((c) => c.commentId === commentId);
    // console.log(post, comment);
    // console.log();
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 400));
    }
    const user = await userModel.findById(req.userId);
    if (comment.user.toString() || req.userId || user.role === "admin") {
      const index = post.comments.findIndex((c) => c.commentId === commentId);
      // console.log(post.comments);
      // console.log(index, "11");
      post.comments.splice(index, 1);
      post = await post.save();
      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");
      const postInfo = await postModel.findById(postId);
      if (postInfo.user.toString() !== req.userId) {
        await removeCommentNotification(
          postInfo.user.toString(),
          req.userId,
          postId,
          comment.commentId
        );
      }

      return res.status(200).json({
        success: true,
        message: "Comment Deleted",
        comments: post.comments,
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "You are not authorized to delete the comment",
      });
    }
  }
);

// /api/comment/:postId/:commentId
// Reply to a comment
const putReplyToComment = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const commentId = req.query.commentId;
    const postId = req.query.postId;
    console.log(commentId);
    let post = await commentModel.findOne({ post: postId });
    if (!post) {
      return next(new ErrorHandler("Post not found", 400));
    }

    let text = req.body.text;
    if (text.trim().length < 1) {
      return next(new ErrorHandler("Reply cannot be empty", 400));
    }
    let reply = {
      replyId: uuidv4(),
      user: req.userId,
      text,
      date: Date.now(),
      likes: [],
    };
    const commentToReply = post.comments.find((c) => c.commentId === commentId);
    if (!commentToReply) {
      return next(new ErrorHandler("Comment not available", 404));
    }
    console.log(commentToReply);
    commentToReply.replies.push(reply);
    post = await post.save();

    post = await commentModel.populate(post, "comments.user");
    post = await commentModel.populate(post, "comments.replies.user");
    if (commentToReply.user._id.toString() !== req.userId) {
      // user, userReplied, postId, replyId, reply
      await newReplyNotification(
        commentToReply.user._id.toString(),
        req.userId,
        postId,
        reply.replyId,
        text
      );
    }

    return res.status(201).json({
      success: true,
      message: "Reply saved",
      comments: post.comments,
    });
  }
);

// api/comment/:postId/:commentId/:replyId
// delete a reply
const deleteReplyToComment = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postId = req.query.postId;
    const commentId = req.query.commentId;
    const replyId = req.query.replyId;
    let post = await commentModel.findOne({ post: postId });
    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }
    const parentComment = post.comments.find((c) => c.commentId === commentId);
    if (!parentComment) {
      return next(new ErrorHandler("Comment not found", 400));
    }
    const reply = parentComment.replies.find((r) => r.replyId == replyId);
    if (!reply) {
      return next(new ErrorHandler("Reply not found", 404));
    }
    const user = await userModel.findById(req.userId);

    if (reply.user.toString() === req.userId || user.role === "admin") {
      const index = parentComment.replies.findIndex(
        (reply) => reply.replyId === replyId
      );
      parentComment.replies.splice(index, 1);
      post = await post.save();

      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");

      if (parentComment.user._id.toString() !== req.userId) {
        await removeReplyNotification(
          parentComment.user._id.toString(),
          req.userId,
          postId,
          reply.replyId
        );
      }
      return res.status(200).json({
        success: true,
        message: "Reply deleted",
        comments: post.comments,
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "You are not authorized to delete this comment",
      });
    }
  }
);

// /api/comment/like/:postId/:commentId
// like or unlike a comment
const putLikeOrUnlikeComment = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postId = req.query.postId;
    const commentId = req.query.commentId;
    let post = await commentModel.findOne({ post: postId });
    if (!post) {
      return next(new ErrorHandler("Post not found", 400));
    }
    let comment = post.comments.find((c) => c.commentId === commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 400));
    }
    const isLiked =
      comment.likes.filter((l) => l.user.toString() === req.userId).length > 0;
    if (isLiked) {
      const index = comment.likes.findIndex(
        (l) => l.user.toString() === req.userId
      );
      comment.likes.splice(index, 1);
      post = await post.save();
      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");
      return res.status(200).json({
        success: true,
        message: "Comment disliked",
        comments: post.comments,
      });
    } else {
      comment.likes.unshift({ user: req.userId });
      post = await post.save();
      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");
      return res.status(200).json({
        success: true,
        message: "Comment liked",
        comments: post.comments,
      });
    }
  }
);

// /api/comment/like/:postId/:commentId/:replyId
// like or unlike a comment reply
const putLikeOrUnlikeCommentReply = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postId = req.query.postId;
    const replyId = req.query.replyId;
    const commentId = req.query.commentId;
    let post = await commentModel.findOne({ post: postId });
    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }
    let comment = post.comments.find((c) => c.commentId === commentId);
    if (!comment) {
      return next(new ErrorHandler("Comment not found", 404));
    }
    let reply = comment.replies.find((r) => r.replyId === replyId);
    if (!reply) {
      return next(new ErrorHandler("Reply not found", 404));
    }
    const isLiked =
      reply.likes.filter((l) => l.user.toString() === req.userId).length > 0;
    if (isLiked) {
      const index = reply.likes.findIndex(
        (l) => l.user.toString() === req.userId
      );
      reply.likes.splice(index, 1);
      post = await post.save();
      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");
      return res.status(200).json({
        success: true,
        message: "Reply disliked",
        comments: post.comments,
      });
    } else {
      reply.likes.unshift({ user: req.userId });
      post = await post.save();
      post = await commentModel.populate(post, "comments.user");
      post = await commentModel.populate(post, "comments.replies.user");
      return res.status(200).json({
        success: true,
        message: "Reply liked",
        comments: post.comments,
      });
    }
  }
);

export {
  getCommentsOnPost,
  postCommentsOnPost,
  deleteCommentPost,
  putReplyToComment,
  deleteReplyToComment,
  putLikeOrUnlikeComment,
  putLikeOrUnlikeCommentReply,
};
