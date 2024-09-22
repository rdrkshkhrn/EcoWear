import Post from "../models/userData.js";
import { gridfsBucket } from "../index.js";
import mongoose from "mongoose";
export async function userEditController (req, res) {
    try {
      const { id } = req.params;
      const { clothType, description, price, minOrder, size, existingImages } = req.body;
  
      
      const parsedExistingImages = JSON.parse(existingImages);
  
      
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      
      const imagesToDelete = post.images.filter(
        (imageId) => !parsedExistingImages.includes(imageId.toString())
      );
  
      imagesToDelete.forEach((imageId) => {
        gridfsBucket.delete(new mongoose.Types.ObjectId(imageId), (err) => {
          if (err) {
            console.error(`Failed to delete image with ID: ${imageId}`, err);
          } else {
            console.log(`Image with ID: ${imageId} deleted successfully.`);
          }
        });
      });
  
      
      const newImageIds = req.body.newImages || []; 
  
      
      post.clothType = clothType;
      post.description = description;
      post.price = price;
      post.minOrder = minOrder;
      post.size = size;
  
      
      post.images = [...parsedExistingImages, ...newImageIds];
  
      
      await post.save();
  
      res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  }