import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body as {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password_hash,
      },
    });

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  try {
    // Check if user email exists in the table
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export { login, register };

