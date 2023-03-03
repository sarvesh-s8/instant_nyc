import userModel from "@/models/user.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";
import eventModel from "@/models/event.Model";
import moment from "moment/moment";
import attendModel from "@/models/attend.Model";

const createEvent = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const userId = req.userId;
  let user = await userModel.findById(userId).select("+role");
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
  const dateCompare = new Date();
  let isAfterDate = moment(dateCompare);
  let dateFromFrontend = moment(eventDate).isAfter(isAfterDate);
  if (!dateFromFrontend) {
    return next(new ErrorHandler("Date needs to be in future", 400));
  }
  // // var isafter = moment(date_time).isAfter('2014-03-24T01:14:00Z');
  // console.log(dateFromFrontend, dateCompare);
  // if (dateFromFrontend < dateCompare) {
  //   return next(
  //     new ErrorHandler(
  //       "Date is inccorect, please change it to a future date",
  //       404
  //     )
  //   );
  // }

  event = {
    eventTitle,
    eventDescription,
    eventDate,
    eventLink,
    eventCity,
    eventFee,
    eventCapacity,
    eventBanner: req.files?.eventBanner?.map((e) => e.path)[0],
    eventImages: req.files?.eventImages?.map((file) => file.path),
  };
  console.log(eventTitle);
  // const saveEvent = await new eventModel(event).save();
  // console.log(saveEvent._id);
  // console.log(saveEvent._id.toString());
  // await new attendModel().save({
  //   event: saveEvent._id.toString(),
  //   attended: [],
  //   attending: [],
  // });
  // if (saveEvent._id.toString()) {
  //   const attend = await new attendModel().save({
  //     event: saveEvent._id.toString(),
  //     attended: [],
  //     attending: [],
  //   });
  // }

  const saveEvent = await new eventModel(event).save();

  const attend = new attendModel({
    event: saveEvent._id,
    attended: [],
    attending: [],
  });

  await attend.save();

  return res.status(200).json({
    success: true,
    message: "Event Created",
    event: saveEvent,
    attend,
  });
});

const getEvents = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const user = await userModel.findById(req.userId).select("+role");
  // console.log(user.email.split("@")[1]);
  if (user.role !== "admin") {
    if (user.email.split("@")[1] !== "nyu.edu") {
      return next(new ErrorHandler("You should be a NYU student", 400));
    }
  }
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let totalEvents = await eventModel.countDocuments();
  let events = await eventModel
    .find()
    .select("eventDate eventTitle eventBanner eventCity")
    .limit(limit)
    .skip(startIndex)
    .sort({ eventDate: -1 });
  let nextPage = null;
  if (endIndex < totalEvents) {
    nextPage = page + 1;
  }
  return res.status(200).json({
    success: true,
    message: "Data Fetched",
    events,
    next: nextPage,
    total: totalEvents,
  });
});

const getParticularEvent = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const eventId = req.query.eventId;
    const eventData = await eventModel.findById(eventId);

    return res.status(200).json({
      success: true,
      events: eventData,
      message: "Data Fetch",
    });
  }
);

const putEventAttending = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    let event = await eventModel.findById(req.query.eventId);
    if (!event) {
      return next(new ErrorHandler("Event unavaliable", 404));
    }
    let attend = await attendModel
      .findOne({ event: req.query.eventId })
      .populate("attend.user");
    console.log(attend);
    let attendanceData = attend.attending.find(
      (e) => e.user.toString() === req.userId
    );
    if (attendanceData) {
      return next(
        new ErrorHandler("You have already attending the event", 404)
      );
    }
    attend.attending.unshift({ user: req.userId });
    await attend.save();

    return res.status(201).json({
      success: true,
      data: attend,
    });
  }
);

const getEventAttendees = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = await userModel.findById(req.userId).select("+role");
    if (user.role !== "admin") {
      return next(new ErrorHandler("Entry restricted", 404));
    }
    const attend = await attendModel
      .findOne({ event: req.query.eventId })
      .populate("attending.user");
    console.log(attend);
    return res.status(200).json({
      success: true,
      message: "Data Fetched",
      attend,
    });
  }
);
export {
  createEvent,
  getEvents,
  getParticularEvent,
  putEventAttending,
  getEventAttendees,
};
