import { authService } from "./auth.service";
import type { Request, Response, NextFunction, Errback } from "express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenData = await authService.register(req.body);
    res.status(201).json(tokenData); // 201 Created
  } catch (err) {
    console.log(err);

    next(err); // Pass errors to your global errorHandler
  }
};

export const login = async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  res.json(token);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshToken(refreshToken);
  res.json(tokens);
};

