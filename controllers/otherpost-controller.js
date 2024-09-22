import Post from "../models/userData.js";

export async function otherPostController (req, res) {
    const userId = req.user.id;
  
    try {
      const otherPosts = await Post.find({ userId: { $ne: userId } }).populate(
        "userId");
  
      return res.status(200).json(otherPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch other posts" });
    }
  }