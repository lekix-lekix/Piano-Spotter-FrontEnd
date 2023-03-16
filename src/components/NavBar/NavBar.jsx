import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../../context/auth.context";

const NavBar = ({ setQuickBarState, setWelcomeMessageState }) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const logOutAndNavigate = () => {
    logOutUser();
  };

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h1>Piano-Spotter</h1>
      </Link>
      <div className="div-links">
        <ul>
          <Link onClick={setWelcomeMessageState}>
            <li>About</li>
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/signup">
                <li>Sign up</li>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="profile">
                <li>Profile</li>
              </Link>
              <Link onClick={setQuickBarState}>
                <li>QuickBar</li>
              </Link>
              <Link onClick={logOutAndNavigate}>
                <li className="sign-out">Sign out</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
