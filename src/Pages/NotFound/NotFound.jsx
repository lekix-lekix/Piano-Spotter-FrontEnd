import React from "react";
import { Link, Navigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>ERROR 404</h1>
      <h2>Nothing to see here.</h2>
      <h3>
        Are you even supposed to be here ? Go back to{" "}
        <Link to="/">home page</Link>.
      </h3>
    </div>
  );
};

export default NotFound;
