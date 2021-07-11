import mongoose from "mongoose";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { userName, userId, postId, comment } = req.body;

  const newComment = new Comment({
    creatorName: userName,
    creator: userId,
    postId: postId,
    content: comment,
  });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsForPost = async (req, res) => {
  const { postId } = req.query;

  try {
    const comments = await Comment.find({ postId: postId });
    res.status(200).json({
      data: comments,
    });
  } catch (err) {
    res.status(404).json({ message: err.mesage });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No comments with that id");

  await Comment.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const updateComment = async (req, res) =>
{
  const {id} = req.params;
  const newContent = req.body.updateComment;

  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send("No post with that id");
  const updateComment = await Comment.findByIdAndUpdate(id,{content : newContent});
  res.json(updateComment);

}
