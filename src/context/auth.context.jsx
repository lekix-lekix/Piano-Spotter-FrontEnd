import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authApi from "../service/auth.service";

const AuthContext = React.createContext();

// Wrapping the whole app with a authentication wrapper

const AuthProviderWrapper = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Auth token gets stored locally, on the browser, to allow login persistence

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Sending the token to the server to verify it
  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }
    // If verified, sets the user status to "logged in"
    try {
      const authResponse = await authApi.get(`/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const user = authResponse.data;
      setIsLoggedIn(true);
      setIsLoading(true);
      setUser(user);
    } catch (error) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);

      console.log("Error during token verification.");
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  // Check and verify if a token is already stored in the browser

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext };
