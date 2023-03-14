import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Profile.css";

const Profile = ({ noPopUp }) => {
  const { user } = useContext(AuthContext);
  noPopUp();

  const userPianos = () => {};
  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Hello {user.username}!</h1>
      <h2>Your personal information :</h2>
      <p>E-mail: {user.email}</p>
      <Link>
        <p>Change e-mail ?</p>
      </Link>
      <Link>Change password ?</Link>
      <div>
        <h3>Pianos that you have added :</h3>
      </div>
      <div>
        <h3>Your favourite pianos :</h3>
      </div>
    </div>
  );
};

export default Profile;
