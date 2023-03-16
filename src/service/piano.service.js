import axios from "axios";
import getToken from "./getToken.service";

// Return addresses prefixed with "/pianos"
const BACKEND_PIANO_URL = import.meta.env.VITE_BACKEND_PIANO_API_URL;

const pianoApi = axios.create({
  baseURL: BACKEND_PIANO_URL,
  headers: { Authorization: `Bearer ${getToken()}` },
});

pianoApi.getAllPianos = () => {
  return pianoApi.get("/");
};

pianoApi.getOnePiano = (id) => {
  return pianoApi.get(`/${id}`);
};

pianoApi.createPiano = (piano) => {
  return pianoApi.post("/new-piano", piano);
};

pianoApi.updatePiano = (id, piano) => {
  return pianoApi.patch(`/${id}`, piano);
};

pianoApi.deletePiano = (id) => {
  return pianoApi.delete(`/${id}`);
};

pianoApi.getAddedBy = (userId) => {
  return pianoApi.get("/profile/pianos");
};

export default pianoApi;
