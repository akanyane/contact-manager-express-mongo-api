import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import type { AuthUser } from "../types/express";

interface JwtPayload {
  user: AuthUser;
}

const validateToken = asyncHandler(async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(401);
    throw new Error("User is not authorized or token is missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    request.user = decoded.user;
  } catch {
    response.status(401);
    throw new Error("User is not authorized");
  }

  next();
});

export default validateToken;
