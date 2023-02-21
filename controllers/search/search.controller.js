import userModel from "@/models/user.Model";
import postModel from "@/models/post.Model";
import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import ErrorHandler from "@/server-utils/ErrorHandler";

// Get user or posts
// api/search/:keyword
const getSearchUserAndPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
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
  }
);

// api/search/user/:keyword
// get users related search
const getSearchUser = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const searchText = req.query.keyword;
  if (searchText.trim().length === 0) {
    return next(new ErrorHandler("Too short Text", 400));
  }
  let users = await userModel.find({
    $or: [
      { name: { $regex: searchText, $options: "i" }, isVerified: true },
      { userName: { $regex: searchText, $options: "i" } },
    ],
  });
  users = users.filter((u) => u._id.toString() !== req.userId);
  return res.status(200).json({
    message: "Data Fetched",
    success: true,
    users,
  });
});

// api/search/advanced/tag/:tag
// Get posts associated with tags
const getAdvancedTags = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const tagElement = req.query.tag;
  const total = await postModel.countDocuments({ tags: tagElement });
  const posts = await postModel
    .find({ tags: tagElement })
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("user");

  let nextPage = null;
  if (endIndex < total) {
    nextPage = page + 1;
  }
  return res.status(200).json({
    success: true,
    message: "Data Fetched",
    next: nextPage,
    posts,
    total,
  });
});

// api/search/city/:keyword
// get city posts
const getCityPosts = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  let cityName = req.query.cityName;
  cityName = cityName.toLowerCase();
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const city = await postModel
    .find({ city: cityName })
    .limit(limit)
    .skip(startIndex)
    .populate("user", ["name", "userName", "profilePic"]);
  const total = await postModel.find({ city: cityName }).countDocuments();
  let nextPage = null;
  if (endIndex < total) {
    nextPage = page + 1;
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched",
    data: city,
    next: nextPage,
    total,
  });
});

// api/search/advanced/users/:user
// get advanced users
const getAdvancedSearchedUsers = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const user = req.query.user;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await userModel.countDocuments({
      $or: [
        { name: { $regex: user, $options: "i" } },
        { userName: { $regex: user, $options: "i" } },
      ],
      isVerified: true,
    });
    const users = await userModel
      .find({
        $or: [
          { name: { $regex: user, $options: "i" } },
          { username: { $regex: user, $options: "i" } },
        ],
        isVerified: true,
      })
      .skip(startIndex)
      .limit(limit);
    let nextPage = null;
    if (endIndex < total) {
      nextPage = page + 1;
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched",
      users,
      next: nextPage,
      total,
    });
  }
);

// api/search/advanced/posts/:post
// get advanced Posts
const getAdvancedPosts = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const post = req.query.post;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await postModel.countDocuments({
      title: { $regex: post, $options: "i" },
    });
    const posts = await postModel
      .find({
        title: { $regex: post, $options: "i" },
      })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user");
    let nextPage = null;
    if (endIndex < total) {
      nextPage = page + 1;
    }
    return res.status(200).json({
      success: true,
      message: "Data Fetched",
      posts,
      next: nextPage,
      total,
    });
  }
);

export {
  getSearchUser,
  getCityPosts,
  getSearchUserAndPost,
  getAdvancedTags,
  getAdvancedSearchedUsers,
  getAdvancedPosts,
};
