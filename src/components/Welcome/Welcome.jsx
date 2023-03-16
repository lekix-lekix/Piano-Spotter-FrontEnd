import React from "react";
import "./Welcome.css";

const Welcome = ({ setWelcomeMessageState }) => {
  return (
    <div className="welcome">
      <h2>Welcome to Piano-Spotter!</h2>
      <p>
        Piano-Spotter is a collaborative project, to reference and locate all
        public pianos around the world.
      </p>
      <p>
        Maybe you live in a tiny place and you want to play on a real piano.
      </p>
      <p>
        Maybe you want to play in public and find the closest place to show your
        talents to everyone!
      </p>
      <p>
        Or maybe you just wanna help piano players around the world and
        contribute to our project!
      </p>
      <p>
        In any case, thank you. This project relies on people and we need you to
        help us. Feel free to add any available piano!
      </p>
      <p>To add a piano on the map :</p>
      <ul>
        <li>Click on "add a piano" in the Quickbar</li>
        <li>Click on somewhere on the map to locate it</li>
        <li>Fill in the type of piano and click on "Submit Piano"</li>
      </ul>
      <p>And it's done! Thanks for your help.</p>
      <p>-- The Piano-Spotter Team</p>
      <button onClick={setWelcomeMessageState}>Close</button>
    </div>
  );
};

export default Welcome;
