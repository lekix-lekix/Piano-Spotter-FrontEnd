import axios from "axios";

// Return addresses prefixed with "/favourites"
const BACKEND_FAVOURITES_URL = import.meta.env.VITE_BACKEND_FAVOURITES_API_URL;

const favouritesApi = axios.create({
  baseURL: BACKEND_FAVOURITES_URL,
});

favouritesApi.getFavourites = (userId) => {
  return favouritesApi.get(`/${userId}`);
};

favouritesApi.createFavourite = (fav) => {
  return favouritesApi.post("/create-fav", fav);
};

favouritesApi.updateFavName = (favId, newName) => {
  return favouritesApi.patch(`/${favId}`, { newName });
};

favouritesApi.deleteFav = (favId) => {
  return favouritesApi.delete(`/${favId}`);
};

export default favouritesApi;
