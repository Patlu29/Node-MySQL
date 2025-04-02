import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
// import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../entity/User";

dotenv.config();

const userRepository = AppDataSource.getRepository(User)

interface AuthRequest extends Request {
  user?: any;
}

// Middleware to verify JWT token
// export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
//     req.user = decoded; // Attach decoded token data to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction):Promise<any> => {
  const {email} = req.body
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
