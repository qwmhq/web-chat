import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sign = (payload: any) => {
  return jwt.sign(payload, config.JWT_SECRET);
};

export const verify = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
};

export default { sign, verify };
