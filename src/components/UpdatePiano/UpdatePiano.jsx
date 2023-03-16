import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import "../AddPiano/AddPiano.css";
import pianoApi from "../../service/piano.service";

const UpdatePiano = ({ fetchPianos, setQuickBarState, onePianoId }) => {
  const { user } = useContext(AuthContext);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [pianoType, setPianoType] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const checkForErrors = (piano) => {
    if (
      (piano.location.coordinates[0] === 0 &&
        piano.location.coordinates[1] === 0) ||
      piano.pianoType.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleUpdatePiano = async (event) => {
    event.preventDefault();
    if (!checkForErrors(pianoToUpdate)) {
      try {
        const response = await pianoApi.updatePiano(onePianoId, pianoToUpdate);
        console.log(response);
        if (response.status === 201) setSuccess(true);
        await fetchPianos();
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  const pianoToUpdate = {
    location: {
      type: "Point",
      coordinates: [Number(latitude), Number(longitude)],
    },
    pianoType: pianoType,
    addedBy: user._id,
    isVerified: false,
  };

  return (
    <div className="addPiano">
      <h1>Update this piano</h1>
      <form onSubmit={(event) => handleUpdatePiano(event)}>
        <label htmlFor="coordinates">
          Coordinates:
          <input
            type="number"
            step="0.00001"
            min="-90"
            max="90"
            placeholder="Latitude"
            onChange={(event) => setLongitude(event.target.value)}
          />
          <input
            type="number"
            step="0.00001"
            min="-180"
            max="180"
            placeholder="Longitude"
            onChange={(event) => setLatitude(event.target.value)}
          />
        </label>

        <label htmlFor="piano-type">
          Piano Type:
          <label name="Grand">
            Grand Piano
            <input
              type="radio"
              value="Grand"
              name="pianoType"
              onChange={(event) => setPianoType(event.target.value)}
            />
          </label>
          <label htmlFor="upright">
            Upright
            <input
              type="radio"
              value="Upright"
              name="pianoType"
              onChange={(event) => setPianoType(event.target.value)}
            />
          </label>
          <label htmlFor="digital">
            Digital
            <input
              type="radio"
              value="Digital"
              name="pianoType"
              onChange={(event) => setPianoType(event.target.value)}
            />
          </label>
        </label>
        <button>Submit Piano</button>
      </form>
      {success && <p>Piano successfully updated !</p>}
      {error && <p style={{ color: "red" }}>All fields are required.</p>}
      <button onClick={() => setQuickBarState()}>EXIT</button>
    </div>
  );
};

export default UpdatePiano;
