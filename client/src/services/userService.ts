import { API_BASE_URL } from "../constants";
import axios from "axios";
import { User } from "../types";

const baseUrl = `${API_BASE_URL}/users`;

const search = async (username: string) => {
  const { data } = await axios.get<User[]>(
    `${baseUrl}/search?username=${username}`,
  );
  return data;
};

export default { search };
