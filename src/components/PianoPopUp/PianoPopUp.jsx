import React, { useContext, useEffect, useState } from "react";
import { Popup } from "react-leaflet";
import { AuthContext } from "../../context/auth.context";
import favouritesApi from "../../service/favourites.service";
import pianoApi from "../../service/piano.service";
import "./PianoPopUp.css";

const PianoPopUp = (props) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { coordinates, fetchPianos, piano, setUpdatePianoState } = props;

  const [favName, setFavName] = useState("");
  const [showFavForm, setShowFavForm] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  let addedByUser = false;

  if (user) {
    if (piano.addedBy === user._id) {
      addedByUser = true;
    }
  }

  const handleDelete = async () => {
    try {
      await pianoApi.deletePiano(piano._id);
      setSuccess(true);
      fetchPianos();
    } catch (error) {
      if (error) console.log(response);
    }
  };

  const handleFavName = (event) => {
    setFavName(event.target.value);
  };

  const handleAddToFavourites = async (event) => {
    event.preventDefault();
    const fav = {
      name: favName,
      piano: piano,
      userId: user._id,
    };
    try {
      await favouritesApi.createFavourite(fav);
      setSuccess("Piano successfully added to favourites!");
    } catch (error) {
      if (error.response.status === 409) {
        setError("This piano is already a favourite of yours !");
      } else {
        setError("An error happened. Please try again.");
      }
    }
  };

  const isLoggedInAndAddedByUser = () => {
    if (isLoggedIn && addedByUser) return true;
    else return false;
  };

  const showError = () => {
    return <p style={{ color: "red" }}>{error}</p>;
  };

  const showSucess = () => {
    return <p style={{ color: "green" }}>{success}</p>;
  };

  return (
    <div className="popup-content">
      <Popup>
        <h3>Piano</h3>
        <p>Latitude: {coordinates[1]}</p>
        <p>Longitude: {coordinates[0]}</p>
        {isLoggedIn && (
          <button
            style={{ color: "green" }}
            onClick={() => setShowFavForm(true)}
          >
            Add to favourite pianos
          </button>
        )}

        {showFavForm && (
          <form
            className="fav-form"
            onSubmit={(event) => handleAddToFavourites(event)}
          >
            <input
              type="text"
              value={favName}
              onChange={handleFavName}
              placeholder="Favourite name"
            />
            <button>Add to favourites</button>
          </form>
        )}
        {error && showError()}
        {success && showSucess()}

        {isLoggedInAndAddedByUser() && (
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <button style={{ color: "red" }} onClick={() => handleDelete()}>
                DELETE
              </button>
              <button
                style={{ color: "orange" }}
                onClick={() => setUpdatePianoState(piano._id)}
              >
                UPDATE
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default PianoPopUp;
