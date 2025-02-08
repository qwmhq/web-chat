import config from "../utils/config";
import jwt from "../utils/jwt";
import User from "../models/user.model";
import { NewUser } from "../dtos/auth.dtos";

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

const searchUsers = async ({ username }: { username: string }) => {
  const rgx = new RegExp(username.trim(), "gi");
  return User.find({ username: rgx });
};

const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);

  if (user === null || !(await user.comparePassword(password))) {
    return null;
  }

  const tokenPayload = {
    id: user.id,
    username,
  };

  if (!config.JWT_SECRET) {
    throw Error("JWT_SECRET is undefined!");
  }
  const token = jwt.sign(tokenPayload);
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
  searchUsers,
  findUserById,
  loginUser,
  deleteAllUsers,
};
