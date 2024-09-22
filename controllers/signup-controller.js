import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../index.js";
export async function signupController (req, res) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return res.json({ message: "Email already used" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
  
    // const token = generateToken(newUser);
    // res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Account created successfully" });
  }