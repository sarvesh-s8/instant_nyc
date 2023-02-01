import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is necessary"],
    },
    tags: {
      type: [String],
      required: true,
    },
    city: {
      type: String,
      enum: ["newyork", "shanghai", "abudhabi", "dubai", "mumbai"],
      required: [true, "Atleast select one city"],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "Please post atleast 1 image"],
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    saves: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    // location: {
    //   type: {
    //     type: String,
    //     default: "Point",
    //   },
    //   coordinates: [
    //     {
    //       type: Number,
    //       required: "You must supply coordinates!",
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);

export default postModel;
