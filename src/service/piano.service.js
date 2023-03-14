import axios from "axios";

const BACKEND_PIANO_URL = import.meta.env.VITE_BACKEND_PIANO_API_URL;

const pianoApi = axios.create({
  baseURL: BACKEND_PIANO_URL,
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
  console.log("coucou");
  console.log(id);
  return pianoApi.delete(`/${id}`);
};

export default pianoApi;
