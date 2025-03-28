import { api } from "@/services/api";

const getVideoGame = async (id: string) => {
  return api.get(`/product/${id}`);
};

const postVideoGame = async (data:any) =>{
  return api.post('/product', data)
}

const putVideoGame = async (id: string, data: any) => {
  return api.get(`/product/${id}`, data);
};

const deleteVideoGame = async (id: string) => {
  return api.get(`/product/${id}`);
};

export { getVideoGame, postVideoGame, putVideoGame, deleteVideoGame };
