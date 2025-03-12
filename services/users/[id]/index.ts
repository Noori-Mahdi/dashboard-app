import { api } from "@/services/api";

const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`);
};

const getUser = (id: string) => {
  return api.get(`/users/${id}`);
};

const putUser = (id: string, data: any) => {
  return api.put(`/users/${id}`, data);
};

export { deleteUser, getUser, putUser };
