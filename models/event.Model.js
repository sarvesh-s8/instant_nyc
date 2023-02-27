import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const eventSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    eventDescription: {
      type: String,
      required: [true, "Description cannot be empty"],
    },
    eventPic: {
      type: [String],
      required: [true, "Please post atleast 1 image"],
    },
    // eventDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // eventLink: {
    //   type: String,
    // },
    // eventFee: {
    //   type: Number,
    // },
    // eventCity: {
    //   type: String,
    //   enum: ["mumbai", "newyork", "shanghai", "dubai", "abudhabi"],
    //   required: [true, "City is a must"],
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const eventModel =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default eventModel;

// },
// eventLocation: {
//   latitude: {
//     type: String,
//   },
//   longitude: {
//     type: String,
//   },
// },
