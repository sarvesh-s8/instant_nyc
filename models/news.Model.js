import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const newSchema = new Schema({
  newsTitle: {
    type: String,
  },
  newsDescription: {
    type: String,
  },
  newsDate: {
    type: Date,
    default: Date.now,
  },
  newsCity: {
    type: String,
  },
});

const newsModel = mongoose.models.News || mongoose.model("News", newSchema);

export default newsModel;
