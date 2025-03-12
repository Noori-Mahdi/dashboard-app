import { api } from "../api";

const login = (data: any) => {
  api.post("/auth/login", data);
};

const logout = () => api.get("/auth/logout");

const register = (data: any) => {
  api.post("/auth/register", data);
};

const checkTokenReady = () => api.get("/auth/checkTokenReady");

export { login, logout, register, checkTokenReady };
