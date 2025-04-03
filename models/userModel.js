import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field is required!"],
      trim: true,
      minLength: [3, "write more than 3 words"],
      maxLength: [20, "don't write more than 20 words"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
    },
    tasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
