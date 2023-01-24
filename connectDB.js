import mongoose, { connect } from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("Connected");
    });
  } catch (error) {
    console.log(error);
    if (error) throw error;
    process.exit(1);
  }
};

export default connectDB;
