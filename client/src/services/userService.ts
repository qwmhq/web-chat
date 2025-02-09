import { API_BASE_URL } from "../constants";
import axios from "axios";
import { User } from "../types";
import { authToken } from "../constants";

const baseUrl = `${API_BASE_URL}/users`;

const search = async (username: string) => {
  const { data } = await axios.get<User[]>(
    `${baseUrl}/search?username=${username}`,
    {
      headers: { Authorization: authToken },
    },
  );
  return data;
};

export default { search };
