import userModel from "@/models/user.model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import eventModel from "@/models/eventModel";

const createEvent = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const userId = req.userId;
  let user = await userModel.findById(userId);
  if (user.role !== "admin") {
    return next(new ErrorHandler("Restricted entry"));
  }
  let event = {};
  const eventTitle = req.body.eventTitle;
  const eventDescription = req.body.eventDescription;
  const eventDate = req.body.eventDate;
  const eventLink = req.body.eventLink;
  const eventCity = req.body.eventCity;
  const eventFee = req.body.eventFee;
  const eventCapacity = req.body.eventCapacity;
  // if (!eventTitle || !eventDescription) {
  //   return next(new ErrorHandler("All fields are required", 400));
  // }

  // eventTitle: {
  //   type: String,
  //   required: [true, "Title cannot be empty"],
  //   trim: true,
  // },
  // eventDescription: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Description cannot be empty"],
  // },
  // eventPic: {
  //   type: [String],
  //   required: [true, "Please post atleast 1 image"],
  // },
  // // eventDate: {
  // //   type: Date,
  // //   default: Date.now,
  // // },
  // // eventLink: {
  // //   type: String,
  // // },
  // // eventFee: {
  // //   type: Number,
  // // },
  // // eventCity: {
  // //   type: String,
  // //   enum: ["mumbai", "newyork", "shanghai", "dubai", "abudhabi"],
  // //   required: [true, "City is a must"],
  // // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },

  event = {
    eventTitle,
    eventDescription,
    eventDate,
    eventLink,
    eventCity,
    eventFee,
    eventCapacity,
    eventImage: req.files.map((file) => file.path),
  };
  const saveEvent = await new eventModel(event).save();
  return res.status(200).json({
    success: true,
    message: "Event Created",
    event: saveEvent,
  });
});

export { createEvent };
