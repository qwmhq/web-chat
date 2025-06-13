import { API_BASE_URL } from "../constants";
import axios from "axios";
import { LoginRequest, LoginResponse, SignupRequest } from "../types";

const baseUrl = `${API_BASE_URL}/auth`;

const login = async (obj: LoginRequest) => {
  const { data } = await axios.post<LoginResponse>(`${baseUrl}/login`, obj);
  return data;
};

const signup = async (obj: SignupRequest) => {
  await axios.post(`${baseUrl}/signup`, obj);
};

export default { login, signup };
