import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    social: {
      twitter: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
    badges: [
      {
        title: {
          type: String,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const profileModel =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default profileModel;
