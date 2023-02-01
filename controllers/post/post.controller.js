import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import postModel from "@/models/postModel";
import ErrorHandler from "@/server-utils/ErrorHandler";

// Create a post
// api/posts post
const createPost = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { title, description, tags, city } = req.body;
  let cityName = city.toLowerCase();
  // if (!title || !city) {
  //   return next(new ErrorHandler("Fields cannot be empty", 400));
  // }
  if (req.files.length < 1) {
    return next(new ErrorHandler("Atleast one image is required", 400));
  }
  let tagsParsed = [];
  if (tags) {
    tagsParsed = JSON.parse(tags);
  }
  const createPostObject = {
    title,
    description,
    tags: tagsParsed,
    city: cityName,
    user: req.userId,
    images: req.files.map((file) => file.path),
  };
  const post = await new postModel(createPostObject).save();
  return res.status(200).json({
    success: true,
    data: post,
    message: "Post created successfully",
  });
});

// Get all posts
// api/posts get
const getAllPosts = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await postModel.countDocuments();
  const posts = await postModel
    .find()
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
    message: "Data fetched",
    next: nextPage,
    posts,
  });
});

export { createPost, getAllPosts };
