import { Request, Response, NextFunction } from "express";

// Extends the built-in Error type to include:
// - status: optional HTTP status code to send in the response
// - code: optional Prisma error code for database-level errors
interface AppError extends Error {
  status?: number;
  code?: string;
}

// Central error handler — any error passed via next(err) anywhere in the app lands here
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  // Prisma-specific errors
  // P2025: record not found in the database
  if (err.code === "P2025") {
    res
      .status(404)
      .json({ error: { status: 404, message: "Resource not found" } });
    return;
  }
  // P2002: unique constraint violation (e.g. duplicate email)
  if (err.code === "P2002") {
    res
      .status(409)
      .json({
        error: {
          status: 409,
          message: "A record with that value already exists",
        },
      });
    return;
  }

  // Fallback for everything else
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ error: { status, message } });
};

export default errorHandler;
