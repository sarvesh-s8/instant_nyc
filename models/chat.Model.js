import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const chatSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chats: [
    {
      messageWith: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: [
        {
          message: {
            type: String,
            required: true,
          },
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          date: {
            type: Date,
          },
        },
      ],
    },
  ],
});

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
