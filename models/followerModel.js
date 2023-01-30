import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const followerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const followerModel =
  mongoose.models.Follower || mongoose.model("Follower", followerSchema);

export default followerModel;
