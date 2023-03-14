import React, { useContext } from "react";
import { Popup } from "react-leaflet";
import { AuthContext } from "../../context/auth.context";
import pianoApi from "../../service/piano.service";

const PianoPopUp = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { coordinates, pianoId } = props;

  const fetchPianos = props.pianoState;

  const handleDelete = async (event) => {
    const id = event.target.getAttribute("data-id");

    try {
      await pianoApi.delete(id);
      fetchPianos();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Popup>
        <h3>Piano</h3>
        <p>Latitude: {coordinates[1]}</p>
        <p>Longitude: {coordinates[0]}</p>
        {isLoggedIn && (
          <div>
            <p>Delete Piano ?</p>
            <button data-id={pianoId} onClick={(event) => handleDelete(event)}>
              DELETE
            </button>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default PianoPopUp;
