import userModel from "@/models/user.Model";
import notificationModel from "@/models/notification.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";

const setNotifications = tryCatchAsyncErrorMiddleware(async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    user.unreadNotification = true;
    await user.save();
  }
});

const newLikeNotification = tryCatchAsyncErrorMiddleware(
  async (user, likeByUser, postId) => {
    const userNotification = await notificationModel.findOne({ user });
    const notification = {
      type: "like",
      date: Date.now(),
      user: likeByUser,
      post: postId,
    };
    userNotification.notifications.unshift(notification);
    await userNotification.save();
    await setNotifications(user);
  }
);

const removeLikeNotification = tryCatchAsyncErrorMiddleware(
  async (user, dislikeByUser, postId) => {
    await notificationModel.findOneAndUpdate(
      { user },
      {
        $pull: {
          notifications: {
            type: "like",
            user: dislikeByUser,
            post: postId,
          },
        },
      }
    );
  }
);

const newCommentNotification = tryCatchAsyncErrorMiddleware(
  async (user, userCommented, postId, commentId, comment) => {
    const userNotification = await notificationModel.findOne({ user });
    const notification = {
      type: "comment",
      user: userCommented,
      post: postId,
      comment: commentId,
      text: comment,
      date: Date.now(),
    };
    userNotification.notifications.unshift(notification);
    await userNotification.save();
    await setNotifications(user);
  }
);

const newReplyNotification = tryCatchAsyncErrorMiddleware(
  async (user, userReplied, postId, replyId, reply) => {
    const userNotification = await notificationModel.findOne({ user });
    const notification = {
      type: "reply",
      user: userReplied,
      post: postId,
      comment: replyId,
      text: reply,
      date: Date.now(),
    };
    userNotification.notifications.unshift(notification);
    await userNotification.save();
    await setNotifications(user);
  }
);

const removeCommentNotification = tryCatchAsyncErrorMiddleware(
  async (user, userRemovedComment, postId, commentId) => {
    await notificationModel.findOneAndUpdate(
      { user },
      {
        $pull: {
          notifications: {
            type: "comment",
            user: userRemovedComment,
            post: postId,
            commentId,
          },
        },
      }
    );
  }
);

const removeReplyNotification = tryCatchAsyncErrorMiddleware(
  async (user, userRemovedReply, postId, commentId) => {
    await notificationModel.findOneAndUpdate(
      { user },
      {
        $pull: {
          notifications: {
            type: "reply",
            user: userRemovedReply,
            post: postId,
            commentId,
          },
        },
      }
    );
  }
);

const newFollowerNotification = tryCatchAsyncErrorMiddleware(
  async (user, userFollowed) => {
    const userNotification = await notificationModel.findOne({ user });
    const notification = {
      type: "follow",
      user: userFollowed,
      date: Date.now(),
    };
    userNotification.notifications.unshift(notification);
    await userNotification.save();
    await setNotifications(user);
  }
);

const removeFollowerNotification = tryCatchAsyncErrorMiddleware(
  async (user, userUnFollowed) => {
    await notificationModel.findOneAndUpdate(
      { user },
      {
        $pull: {
          notifications: {
            type: "follow",
            user: userUnFollowed,
          },
        },
      }
    );
  }
);

export {
  removeCommentNotification,
  removeReplyNotification,
  removeLikeNotification,
  removeFollowerNotification,
  newCommentNotification,
  newFollowerNotification,
  newReplyNotification,
  newLikeNotification,
};
