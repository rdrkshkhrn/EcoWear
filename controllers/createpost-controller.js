import Post from "../models/userData.js";

export async function createPostController(req, res){
    const { images, clothType, size, price, minOrder, description } = req.body;
    const userId = req.user.id;
  
    try {
      const post = new Post({
        userId,
        images,
        clothType,
        size,
        price,
        minOrder,
        description,
      });
      await post.save();
      return res.status(201).json({ message: "post created successfully", post });
    } catch (err) {
      return res.json({ error: `Failed to create post, ${err}` });
    }
  }