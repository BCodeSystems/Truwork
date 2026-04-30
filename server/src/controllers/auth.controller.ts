import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    // Pull submitted signup values from the request body
    const {
      firstName,
      lastName,
      businessName,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Ensure all required fields were submitted
    if (
      !firstName ||
      !lastName ||
      !businessName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if a user already exists with this email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash the password before storing it in the database
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user account
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
      },
    });

    // Create the linked business profile for the user
    await prisma.businessProfile.create({
      data: {
        userId: user.id,
        businessName,
        contactName: `${firstName} ${lastName}`,
        phone: "",
        email,
        address: "",
      },
    });

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
    } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Pull submitted login values from the request body
    const { email, password } = req.body;

    // Ensure email and password were submitted
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // Successful login with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};