import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import chatModel from "@/models/chat.Model";
import userModel from "@/models/user.Model";

const loadMessages = tryCatchAsyncErrorMiddleware(
  async (userId, messageWith) => {
    const user = await chatModel
      .findOne({ user: userId })
      .populate("chats.messageWith");
    const chat = user.chats.find(
      (ch) => ch.messageWith._id.toString() === messageWith
    );
    if (!chat) {
      return { error: "Chat Not Found" };
    }
    return { chat };
  }
);

const sendMessage = tryCatchAsyncErrorMiddleware(
  async (userId, receiverId, message) => {
    const user = await chatModel.findOne({ user: userId });
    const receiver = await chatModel.findOne({ user: receiverId });
    const newMessage = {
      sender: userId,
      receiver: receiverId,
      message,
      date: Date.now(),
    };
    //
    await addChat(user, receiverId, newMessage);
    await addChat(receiver, userId, newMessage);
    return { newMessage };
  }
);

const addChat = tryCatchAsyncErrorMiddleware(
  async (user, receiverId, newMessage) => {
    const previousChat = user.chats.find(
      (ch) => ch.messageWith.toString() === receiverId
    );
    if (previousChat) {
      previousChat.messages.push(newMessage);
      await user.save();
    } else {
      const newChat = {
        messageWith: receiverId,
        messages: [newMessage],
      };
      user.chats.unshift(newChat);
      await user.save();
    }
  }
);

const setMessageToUnread = tryCatchAsyncErrorMiddleware(async (userId) => {
  const user = await userModel.findById(userId);
  if (!user.unreadMessage) {
    user.unreadMessage = true;
    await user.save();
  }
});

const setMessageRead = tryCatchAsyncErrorMiddleware(async (userId) => {
  const user = await userModel.findById(userId);
  if (user.unreadMessage) {
    user.unreadMessage = true;
    await user.save();
  }
});

export { setMessageRead, setMessageToUnread, sendMessage, loadMessages };
