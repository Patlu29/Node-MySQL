import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as dotenv from "dotenv";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password, role } = req.body;

  // const validRoles = ["admin", "user"];
  // if (!validRoles.includes(role)) {
  //   res.status(400).json({ message: "Invalid role. Choose 'admin' or 'user'." });
  //   return;
  // }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    userName,
    email,
    password: hashedPassword,
    role: "user",
  });

  await userRepository.save(user);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    res.status(401).json({ message: "Invalid user" });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET_KEY as string,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token, role: user.role });
};

export const AllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    // console.log('user datas', users)
    res.status(200).send({ data: users });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const home = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Welcome home user" });
};
