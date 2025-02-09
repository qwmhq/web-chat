import axios from "axios";
import { API_BASE_URL, authToken } from "../constants";
import { GetChatsResponse } from "../types";

const baseUrl = `${API_BASE_URL}/chats`;

const getChats = async () => {
  const { data } = await axios.get<GetChatsResponse[]>(baseUrl, {
    headers: { Authorization: authToken },
  });
  return data;
};

export default { getChats };
