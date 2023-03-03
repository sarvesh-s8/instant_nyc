import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const attendSchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  attending: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  attended: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const attendModel =
  mongoose.models.Attend || mongoose.model("Attend", attendSchema);

export default attendModel;
