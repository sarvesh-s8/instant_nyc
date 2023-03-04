import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import chatModel from "@/models/chat.Model";
import userModel from "@/models/user.Model";
import ErrorHandler from "@/server-utils/ErrorHandler";

const getChats = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const user = await chatModel
    .findOne({ user: req.userId })
    .populate("chats.messageWith");
  const sendChats =
    user.chats.length > 0
      ? user.chats.map((c) => ({
          messageWith: c.messageWith._id,
          name: c.messageWith.name,
          profilePic: c.messageWith.profilePic,
          lastMessages: c.messages[c.messages.length - 1].message,
          date: c.messages[c.messages.length - 1].date,
        }))
      : [];
  return res.status(200).json({
    success: true,
    chats: sendChats,
    message: "Data Fetched",
  });
});

const getUserInfoChats = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await userModel.findById(req.query.userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Data Fetched",
      name: user.name,
      profilePic: user.profilePic,
    });
  }
);

export { getChats, getUserInfoChats };
