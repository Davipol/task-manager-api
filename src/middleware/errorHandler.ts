import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.message));
  } else {
    res.status(500).json(errorResponse("Internal server error"));
  }
}

export { errorHandler };
