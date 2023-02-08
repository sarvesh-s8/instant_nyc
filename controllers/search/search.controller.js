import userModel from "@/models/user.model";
import postModel from "@/models/postModel";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";

// Get user or posts
// api/search/:keyword
const getSearchUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const searchText = req.query.keyword;
  if (searchText.trim().length === 0) {
    return next(new ErrorHandler("Text is too short", 400));
  }
  const users = await userModel
    .find({
      $or: [
        { name: { $regex: searchText, $options: "i" } },
        { userName: { $regex: searchText, $options: "i" } },
      ],
      isVerified: true,
    })
    .limit(3);
  const posts = await postModel
    .find({
      title: { $regex: searchText, $options: "i" },
    })
    .populate("user")
    .limit(5);
  return res.status(200).json({
    message: "Data Fetched",
    success: true,
    users,
    posts,
  });
});

const getCityPosts = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  let cityName = req.query.cityName;
  cityName = cityName.toLowerCase();
  const city = await postModel.find({
    city: cityName,
  });

  return res.status(200).json({
    success: true,
    message: "Data fetched",
    data: city,
  });
});

export { getSearchUser, getCityPosts };
