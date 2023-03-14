import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import authApi from "../../../service/auth.service";
import { AuthContext } from "../../../context/auth.context";
import "../AuthPopUps.css";

const LoginPopUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const userToLog = {
    email,
    password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await authApi.login(userToLog);
      storeToken(response.data.authToken);
      authenticateUser();
      console.log("Authenticated!");
    } catch (error) {
      console.log("Authentification error");
    }

    setEmail("");
    setPassword("");
    // console.log(userToLog);
  };

  return (
    <div className="form-popup">
      <h2>Log in</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Log In !</button>
        <Link to="/">Exit</Link>
        {isLoggedIn && <Navigate to="/" />}
      </form>
    </div>
  );
};

export default LoginPopUp;
