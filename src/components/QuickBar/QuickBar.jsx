import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./QuickBar.css";

const QuickBar = ({ setAddPianoState }) => {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return;

  return (
    <div className="quickBar">
      <h1>Hello {user.username} !</h1>
      <h2>What should we do ?</h2>
      <ul>
        <Link onClick={setAddPianoState}>
          <li>Add a piano</li>
        </Link>
        <Link>
          <li>Favourite pianos</li>
        </Link>
        <li></li>
      </ul>
    </div>
  );
};

export default QuickBar;
