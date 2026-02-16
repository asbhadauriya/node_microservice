import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { env } from "../../config/env";
import { ApiError } from "../error/ApiError";


export const authMiddleware = (required = true) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader && required) throw new ApiError(401, "No token");

      if (!authHeader) return next(); // optional auth

      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token || '', env.JWT_SECRET) as any;
      req.user = { id: payload.sub };
      next();
    } catch (err) {
      next(new ApiError(401, "Invalid token"));
    }
  };
};
