import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../../../service/auth.service";
import "./Signup.css";

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
  };

  return (
    <div className="form-popup">
      <h2>Sign up</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="username">Username:</label>
        <input
          className="log-form-input"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="email">E-mail:</label>
        <input
          className="log-form-input"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          className="log-form-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Sign up !</button>
        <Link to="/">
          <button>Exit</button>
        </Link>
      </form>
    </div>
  );
};

export default SignupPopUp;
