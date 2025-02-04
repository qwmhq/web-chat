import "dotenv/config";

const PORT = process.env.PORT;

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");
const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
const JWT_SECRET = process.env.JWT_SECRET;

export default {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
};
