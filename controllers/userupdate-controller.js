import User from "../models/user.js";

export async function userUpdateController (req, res) {
    const userId = req.user.id;
    const { mobileNo, address } = req.body;
  
    if (!mobileNo || !address) {
      return res
        .status(400)
        .json({ error: "Mobile number and address are required" });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { mobileNo, address },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  }