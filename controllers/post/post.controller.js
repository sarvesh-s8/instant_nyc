import tryCatchAsyncErrorMiddleware from "@/middleware/tryCatchAsyncError.middleware";
import postModel from "@/models/postModel";
import userModel from "@/models/user.model";
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
  const totalposts = await postModel.countDocuments();
  let posts = await postModel
    .find()
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("user");
  let nextPage = null;
  if (endIndex < totalposts) {
    nextPage = page + 1;
  }
  return res.status(200).json({
    success: true,
    message: "Data fetched",
    next: nextPage,
    posts,
  });
});

// get saves
// // api/posts/saves
// const getPostsSave = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
//   const userId = req.userId;
//   // const postsSave = await
// });

// get particular Post
// api/post/:postId
const getParticularPost = tryCatchAsyncErrorMiddleware(
  async (req, res, next) => {
    const postId = req.query.postId;
    let post = await postModel.findById(postId).populate("user");
    if (!post) {
      return next(new ErrorHandler("Post not Found", 400));
    }
    post.views++;
    post = await post.save();
    return res.status(200).json({
      message: "Data fetched",
      success: true,
      data: post,
    });
  }
);

// update Post
// api/post/:postId put
const updatePost = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const city = req.body.city;
  const originalImages = req.body.originalImages;
  const isOriginalImages = req.body.isOriginalImages;
  if (!isOriginalImages && req.file.length < 1) {
    return next(new ErrorHandler("Atleast 1 image is required", 400));
  }
  let cityName = city.toLowerCase();
  const postId = req.query.postId;
  let post = await postModel.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }
  if (post.user.toString() !== req.userId) {
    return next(new ErrorHandler("Unauthorized User", 404));
  }
  let checkIfImage = req.files.map((e) => e.path.slice(-3));
  console.log(checkIfImage);
  let validation = [];
  for (let i of checkIfImage) {
    if (i === "img") {
      validation.push(true);
    } else if (i === "png") {
      validation.push(true);
    } else if (i === "jpeg") {
      validation.push(true);
    } else if (i === "jpg") {
      validation.push(true);
    } else {
      validation.push(false);
    }
  }
  if (validation.every((a) => a === true)) {
    const postObject = {
      title,
      description,
      tags: JSON.parse(tags),
      city: cityName,
      images: JSON.parse(isOriginalImages)
        ? JSON.parse(originalImages)
        : req.files.map((e) => e.path),
    };
    post = await postModel.findByIdAndUpdate(postId, postObject, { new: true });
    return res.status(201).json({
      success: true,
      message: "Post edited successfully",
      post,
    });
  } else {
    return next(new ErrorHandler("Only img,png,jpg,jpeg files accepted", 400));
  }
});

// Delete Post
// api/post/:postId
const deletePost = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const postId = req.query.postId;
  let post = await postModel.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 400));
  }
  const userId = post.user;
  if (userId.toString() === req.userId) {
    await postModel.findByIdAndDelete(postId);
  } else {
    return next(new ErrorHandler("Unauthorized User", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

export { createPost, getAllPosts, getParticularPost, updatePost, deletePost };
