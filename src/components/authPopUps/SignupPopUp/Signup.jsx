import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../../service/auth.service";
import "../AuthPopUps.css";

const SignupPopUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userToSignup = {
    username,
    email,
    password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userToSignup);
    try {
      const response = await authApi.signup(userToSignup);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
    // console.log(userToLog);
  };

  return (
    <div className="form-popup">
      <h2>Sign up</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

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
        <button>Sign up !</button>
        <Link to="/">Exit</Link>
      </form>
    </div>
  );
};

export default SignupPopUp;
