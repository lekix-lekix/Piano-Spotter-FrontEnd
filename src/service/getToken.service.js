const getToken = () => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  return token;
};

export default getToken;
