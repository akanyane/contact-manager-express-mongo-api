import { Request, Response, NextFunction } from "express";
import { constants } from "../constants";

const titles: Record<number, string> = {
  [constants.VALIDATION_ERROR]: "Validation Failed",
  [constants.NOT_FOUND]: "Not Found",
  [constants.UNAUTHORIZED]: "Unauthorized",
  [constants.FORBIDDEN]: "Forbidden",
  [constants.SERVER_ERROR]: "Server Error",
};

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = response.statusCode >= 400 ? response.statusCode : constants.SERVER_ERROR;

  response.status(statusCode).json({
    title: titles[statusCode] ?? "Error",
    message: error.message,
    stackTrace: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

export default errorHandler;
