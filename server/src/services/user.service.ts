import config from "../utils/config";
import User from "../models/user.model";
import { NewUser } from "../dtos/auth.dtos";
import jwt from "jsonwebtoken";

const createUser = async (object: NewUser) => {
  return User.create(object);
};

const findUserById = async (id: string) => {
  return User.findById(id);
};

const findUserByUsername = async (username: string) => {
  return User.findOne({ username });
};

const getUsers = async () => {
  return User.find({});
};

const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);

  if (user === null || !(await user.comparePassword(password))) {
    return null;
  }

  const tokenPayload = {
    id: user.id,
    username,
    email: user.email,
  };

  if (!config.JWT_SECRET) {
    throw Error("JWT_SECRET is undefined!");
  }
  const token = jwt.sign(tokenPayload, config.JWT_SECRET);
  return {
    id: user.id,
    username,
    token,
  };
};

const deleteAllUsers = async () => {
  return User.deleteMany({});
};

export default {
  createUser,
  getUsers,
  findUserById,
  loginUser,
  deleteAllUsers,
};
