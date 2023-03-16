const getToken = () => {
  return localStorage.getItem("authToken");
};

export default getToken;
