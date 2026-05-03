import User from "../../db/models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, age, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SECRET_KEY));
    const result = await User.create({ name, age, email, password: hashedPassword });

    if (!result) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, age: user.age },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", err: error.message });
  }
};

export const profile = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", err: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const { name, age, email, password } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (age) updateFields.age = age;
    if (email) updateFields.email = email;

    if (password) {
      updateFields.password = await bcrypt.hash(password, Number(process.env.SECRET_KEY));
    }

    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ message: "Email already in use by another account" });
      }
    }

    const updated = await User.findByIdAndUpdate(id, updateFields, { new: true }).select("-password");
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: updated._id, name: updated.name, email: updated.email, age: updated.age },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Profile updated successfully", user: updated, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", err: error.message });
  }
};
