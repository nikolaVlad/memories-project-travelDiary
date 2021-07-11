import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  category : String
});

const post = mongoose.model("Post", postSchema);

export default post;
