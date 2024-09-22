import { generateToken } from "../index.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export  async function signinController (req, res)  {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    const token = generateToken(user);
    res.cookie("token", token, {  httpOnly: true,
        secure: true, // Ensure cookies are sent over HTTPS
        sameSite: 'None' // Enable cross-origin requests to store cookies
        });
    res.status(200).json({ message: "Sign-in successful" });
  }