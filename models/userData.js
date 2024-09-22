import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'myCustomBucket.files',
    required: true,
  }],
  clothType: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  minOrder: {
    type: Number,
    require: true,
  },
});

const Post = mongoose.model("post", PostSchema);
export default Post;
