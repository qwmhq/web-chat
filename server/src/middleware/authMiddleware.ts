import { Request, Response, NextFunction } from "express";
import jwt from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.get("authorization");
  if (authorizationHeader) {
    req.token = authorizationHeader.replace("Bearer ", "");
    try {
      const payload = jwt.verify(req.token);
      req.user = { id: payload.id, username: payload.username };
    } catch {
      req.user = undefined;
    }
  }
  next();
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).end();
  } else {
    next();
  }
};
