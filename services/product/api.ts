import { api } from "../api";

const getProduct = () => {
  return api.get("/product");
};

export{getProduct}