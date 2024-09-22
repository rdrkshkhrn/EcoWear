import Post from "../models/userData.js";

export async function userPostController (req, res) {
    try {
      const userId = req.user.id; 
      // Find posts for the authenticated user
      const userPosts = await Post.find({ userId }).populate('userId');
  
      return res.status(200).json(userPosts);
    } catch (error) {
      console.error("Error fetching user posts", error);
      res.status(500).json({ error: "Failed to fetch user posts" });
    }
  }