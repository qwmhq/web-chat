export const API_BASE_URL = "http://localhost:3001/api";
export const SOCKET_URL = "http://localhost:3001";

export let authToken: string | undefined;

export const setToken = (newToken: string) => {
  authToken = `Bearer ${newToken}`;
};

export const clearToken = () => {
  authToken = undefined;
};
