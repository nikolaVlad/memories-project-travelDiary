import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: { type: String, enum: ['admin', 'member'], required: true },
  followings: { type: Array },
  followers: { type: Array },
  country: { type: String },
  imageUrl: String
});

export default mongoose.model("User", userSchema);;
