const {
  default: tryCatchAsyncErrorMiddleware,
} = require("@/middleware/tryCatchAsyncError.middleware");

const createGroup = tryCatchAsyncErrorMiddleware(async (req, res, next) => {
  const { groupTitle, groupDescription, groupType } = req.body;
  if (req.file) {
    groupImage = req.file.path;
  }
});

// const groupSchema = new Schema({
//   groupTitle: {
//     type: String,
//     required: [true, "Title is required"],
//   },
//   groupMembers: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     },
//   ],
//   groupAdmins: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     },
//   ],
//   groupType: {
//     default: "public",
//     enum: ["public", "private"],
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   groupImage: {
//     type: String,
//   },
//   groupPosts: [
//     {
//       posts: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post",
//       },
//     },
//   ],
//   groupDescription: {
//     typr: String,
//   },
// });
