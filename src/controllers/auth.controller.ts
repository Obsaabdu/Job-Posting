import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({
        success: false,
        message: "Email already registered",
        object: null,
        errors: ["Duplicate email"],
      });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      object: { id: user._id, name: user.name, email: user.email, role: user.role },
      errors: null,
    });
    return;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      object: null,
      errors: [String(err)],
    });
    return;
  }
};
