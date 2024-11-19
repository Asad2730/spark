import {type Request,type Response,type NextFunction } from "express";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
      interface Request {
        user?: string | jwt.JwtPayload;
      }
    }
  }

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
