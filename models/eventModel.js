import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const eventSchema = new Schema(
  {
    eventTitle: {
      type: String,
    },
    eventDescription: {
      type: String,
    },
    eventPic: {
      type: String,
      default: "",
    },
    eventDate: {
      type: Date,
    },
    eventLink: {
      type: String,
    },
    // eventLocation: {
    //   latitude: {
    //     type: String,
    //   },
    //   longitude: {
    //     type: String,
    //   },
    // },
    eventFee: {
      type: Number,
    },
    eventCity: {
      type: String,
      enum: ["mumbai", "newyork", "shanghai", "dubai", "abudhabi"],
      required: [true, "City is a must"],
    },
  },
  {
    timestamps: true,
  }
);
const eventModel =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default eventModel;
