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
     res.json('No token provided');
     return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
     res.json('Invalid token');
     return
  }
};

export default authMiddleware;
