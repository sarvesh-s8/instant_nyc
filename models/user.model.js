import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
      trim: true,
    },
    email: {
      unique: true,
      required: [true, "Email is a required field"],
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    userName: {
      type: String,
      required: [true, "User Name is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    newNotification: {
      type: Boolean,
      default: true,
    },
    unreadMessage: {
      type: Boolean,
      default: false,
    },
    unreadNotification: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    data: [String],
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
