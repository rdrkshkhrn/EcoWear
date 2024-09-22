import User from "../models/user.js";

export async function userController (req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      
      const { _id, email, name, mobileNo, address } = user;
      //console.log(user);
      return res.status(200).json({ id: _id, email, name, mobileNo, address });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  }