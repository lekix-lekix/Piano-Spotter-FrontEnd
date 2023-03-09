import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import pianoApi from "../../service/piano.service";

import "leaflet/dist/leaflet.css";
import "../../App.css";

const Map = () => {
  const [pianos, setPianos] = useState([]);

  // Fetching piano data from the DB

  useEffect(() => {
    pianoApi
      .getAllPianos()
      .then((response) => setPianos(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Adding all markers

  const addPianosMarker = () => {
    if (pianos.length === 0) return <h1>"coucou!"</h1>;
    return pianos.map((element) => {
      let { coordinates } = element.location;
      return (
        <Marker key={element._id} position={[coordinates[1], coordinates[0]]}>
          <Popup>
            <h3>Piano</h3>
            <p>Latitude: {coordinates[1]}</p>
            <p>Longitude: {coordinates[0]}</p>
          </Popup>
        </Marker>
      );
    });
  };

  return (
    // Generating the map
    <div>
      <MapContainer
        style={{ width: "100vw", height: "100vh" }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {addPianosMarker()}
      </MapContainer>
    </div>
  );
};

export default Map;
