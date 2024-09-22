import Post from "../models/userData.js";

export async function userDeleteController (req, res) {
    const postId = req.params.postid;
  
    try {
      const post = await Post.findByIdAndDelete(postId);
      return res.status(200).json({ message: "post deleted successfully" });
    } catch (err) {
      return res.json({ error: `Failed to delete post, ${err}` });
    }
  }