import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  creatorName : String,
  creator: String,
  postId: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const comment = mongoose.model("Comment", commentSchema);

export default comment;