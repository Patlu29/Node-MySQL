import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as dotenv from "dotenv";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    userName,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;
  const user = (req as any).user;

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  const isUsernameMatch = await userRepository.findOneBy({ userName });

  if (!isUsernameMatch) {
    res.status(401).json({ message: "Invalid user" });
    return;
  }
  if (!isPasswordMatch) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY as any, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

export const home = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Welcome home user" });
};
