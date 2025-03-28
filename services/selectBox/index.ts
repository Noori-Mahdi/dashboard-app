import { api } from "../api";

const getPublisher = () => {
  return api.get("/selectBox/publisher");
};

const getPlatform = () => {
  return api.get("/selectBox/platform");
};

const getGenre = () => {
  return api.get("/selectBox/genre");
};

export { getPublisher, getGenre, getPlatform };
