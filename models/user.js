import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo : {
      type : Number
    },
    address: {
      street: { type: String},
      city: { type: String },
      state: { type: String},
      pincode: { type: String}
    }
  }
);

const User = mongoose.model("User", userSchema);

export default User;
