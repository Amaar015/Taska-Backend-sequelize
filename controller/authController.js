import jsonwebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import userModel from "../models/User.js";
export const Register = async (req, res) => {
  try {
    let { name, email, role, password } = req.body;
    const deleteFile = () => {
      if (req.file) fs.unlinkSync(req.file.path);
    };

    // Validation Checks
    if (!name) {
      deleteFile();
      return res
        .status(400)
        .json({ message: "Username is Required!", success: false });
    }
    if (!email) {
      deleteFile();
      return res
        .status(400)
        .json({ message: "Email is Required!", success: false });
    }
    if (!role) {
      deleteFile();
      return res
        .status(400)
        .json({ message: "User Role is Required!", success: false });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "User profile is Required!", success: false });
    }
    if (!password) {
      deleteFile();
      return res
        .status(400)
        .json({ message: "Password is Required!", success: false });
    }

    // Check if user already exists
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      deleteFile();
      return res
        .status(400)
        .json({ message: "The user already exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Store user with profile image
    const avatar = `/profiles/${req.file.filename}`;
    const user = await userModel.create({
      name,
      role,
      email,
      avatar,
      password,
    });

    return res
      .status(201)
      .json({ message: "User Registered successfully", success: true, user });
  } catch (error) {
    console.error("Error:", error);

    // Delete uploaded file if an error occurs
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Failed to delete file:", err);
      }
    }

    return res.status(500).json({
      message: "Something went wrong on the server!",
      error: error.message,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "All Fields are required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Invalid Email & Password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Invalid Email & Password",
        success: false,
      });
    }
    const token = jsonwebToken.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", // Token expires in 1 day
      }
    );
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      users: {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong Server side!",
      error,
      success: false,
    });
  }
};
