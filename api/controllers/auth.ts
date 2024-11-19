import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json('Email and password are required');
    return
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = (rows as any[])[0];

    if (!user) {
      res.json({ message: "User not found" });
      return
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json("Invalid credentials");
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json(token);
  } catch (error) {
    res.json(`Server Error ${error}`);
  }
};
