import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const authorizeAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(400).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );
  (req as any).user = decodedToken

  const user = (req as any).user

    // console.log('decoded token',user)
    if(user.role === "admin"){
    // res.status(200).json({ message: "Welcome home..", data: decodedToken });
    next()
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const authorizeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(400).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    );
    res.status(200).json({ message: "Welcome home..", data: decodedToken });
    next()

  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// if (req.query.user === "prakash") {
//   next();
// } else {
//   res.status(401).json({ message: "Unauthorized user" });
//   return;
// }
