import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../error/ApiError'
import { Prisma } from '@prisma/client'

export interface AppError extends Error {
  statusCode?: number
  code?: string
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || "Something went wrong. Please try again later.";
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // Log full error (important for debugging)

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(err.code);
    console.error('❌ ERROR:', {
      statusCode: err.code,
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    })
    console.log(err.code == 'P2002');

    if (err.code == "P2002") {
      const targetField = (err.meta as { target?: string[] })?.target?.[0] || "Field";
      statusCode = 409; // Conflict
      message = `${targetField} already exists`;
    } else {
      statusCode = 400; // Other Prisma errors
      message = err.message;
    }
    return res.status(statusCode).json({
      success: false,
      message: message || "Database error",
      code: err.code,
    });
  }

  console.log(err);

  // Production-safe response
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Something went wrong. Please try again later.'
        : err.message
  })
}
