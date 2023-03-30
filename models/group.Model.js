import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const groupSchema = new Schema({
  groupTitle: {
    type: String,
    required: [true, "Title is required"],
  },
  groupMembers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  groupAdmins: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  groupType: {
    default: "public",
    enum: ["public", "private"],
  },
  creaatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  groupPosts: [
    {
      posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
});

const groupModel =
  mongoose.models.Group || mongoose.model("Group", groupSchema);

export default groupModel;
