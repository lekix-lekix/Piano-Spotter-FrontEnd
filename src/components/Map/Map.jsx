import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import pianoApi from "../../service/piano.service";

import "../../App.css";
import { Outlet } from "react-router-dom";
import PianoPopUp from "../PianoPopUp/PianoPopUp";

const Map = (props) => {
  // Adding all markers

  const { fetchPianos, pianos } = props;

  useEffect(() => {
    fetchPianos();
  }, []);

  const addPianosMarker = () => {
    if (!pianos.length) return;
    return pianos.map((element) => {
      let { coordinates } = element.location;
      return (
        <Marker key={element._id} position={[coordinates[1], coordinates[0]]}>
          <PianoPopUp
            coordinates={coordinates}
            pianoId={element._id}
            pianoState={fetchPianos}
          />
        </Marker>
      );
    });
  };

  return (
    // Generating the map
    <div>
      <MapContainer
        style={{ width: "100vw", height: "90vh" }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {addPianosMarker()}
        <MapClicker />
      </MapContainer>

      <Outlet />
    </div>
  );
};

export default Map;

function MapClicker() {
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
    },
  });
}
