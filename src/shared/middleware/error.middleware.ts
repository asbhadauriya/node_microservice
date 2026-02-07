import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500

  // Log full error (important for debugging)
  console.error('❌ ERROR:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  })

  // Production-safe response
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Something went wrong. Please try again later.'
        : err.message
  })
}
