import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notification: [
      {
        type: {
          type: String,
          enum: ["like", "comment", "follow", "reply"],
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        commentId: {
          type: String,
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const notificationModel =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default notificationModel;
