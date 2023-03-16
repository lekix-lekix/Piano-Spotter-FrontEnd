import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import "../AddPiano/AddPiano.css";
import pianoApi from "../../service/piano.service";

const UpdatePiano = ({
  fetchPianos,
  setQuickBarState,
  onePianoId,
  clickCoordinates,
}) => {
  const { user } = useContext(AuthContext);
  const [latitude, setLatitude] = useState(clickCoordinates.lat);
  const [longitude, setLongitude] = useState(clickCoordinates.lng);
  const [pianoType, setPianoType] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Refresh data coming from the mapclicker (clickCoordinates)
  useEffect(() => {
    setLatitude(clickCoordinates.lat);
    setLongitude(clickCoordinates.lng);
  }, [clickCoordinates.lat]);

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
        if (response.status === 200) {
          setError("");
          setSuccess("Piano successfully updated!");
        }
        await fetchPianos();
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("All fields are required.");
    }
  };

  const pianoToUpdate = {
    location: {
      type: "Point",
      coordinates: [Number(longitude), Number(latitude)],
    },
    pianoType: pianoType,
    addedBy: user._id,
    isVerified: false,
  };

  return (
    <div className="addPiano">
      <h2>Update this piano</h2>
      <form
        className="addPianoForm"
        onSubmit={(event) => handleUpdatePiano(event)}
      >
        <label className="coordinates-label" htmlFor="coordinates">
          Coordinates:
          <input
            type="number"
            step="0.00001"
            placeholder="Latitude"
            value={clickCoordinates.lat}
            onChange={(event) => setLongitude(event.target.value)}
          />
          <input
            type="number"
            step="0.00001"
            placeholder="Longitude"
            value={clickCoordinates.lng}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </label>

        <label className="digital-inputs" htmlFor="piano-type">
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
        <button>Update Piano</button>
      </form>
      <button onClick={() => setQuickBarState()}>EXIT</button>
      {success && <p>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdatePiano;
