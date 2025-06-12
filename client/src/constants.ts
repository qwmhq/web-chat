export const API_BASE_URL = "/api";
export const SOCKET_URL = "/";

export let authToken: string | undefined;

export const setToken = (newToken: string) => {
  authToken = `Bearer ${newToken}`;
};

export const clearToken = () => {
  authToken = undefined;
};
