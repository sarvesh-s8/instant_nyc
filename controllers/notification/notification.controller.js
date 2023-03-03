import userModel from "@/models/user.Model";
import notificationModel from "@/models/notification.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";

const getNotifications = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await notificationModel
      .findOne({ user: req.userId })
      .populate("notifications.user")
      .populate("notifications.post");
    const notifications = user.notifications.filter(
      (n) =>
        (["like", "comment", "reply"].includes(n.type) &&
          n.user?._id &&
          n.post?._id) ||
        (n.type === "follow" && n.user?._id)
    );
    return res.status(200).json({
      success: true,
      message: "Notifications fetched",
      notifications,
    });
  }
);

const postNotifications = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await userModel.findById(req.userId);
    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }
    return res.status(200).json({
      success: true,
      message: "Update notification status",
    });
  }
);

export { getNotifications, postNotifications };
