import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "../../App.css";
import { Outlet } from "react-router-dom";
import PianoPopUp from "../PianoPopUp/PianoPopUp";

const Map = (props) => {
  const { fetchPianos, pianos, setUpdatePianoState, handleClickCoordinates } =
    props;

  // Adding all markers
  useEffect(() => {
    fetchPianos();
  }, []);

  const addPianosMarker = () => {
    if (!pianos.length) return;

    return pianos.map((element) => {
      let { coordinates } = element.location;
      if (coordinates === undefined || coordinates === null) return;

      return (
        <Marker key={element._id} position={[coordinates[1], coordinates[0]]}>
          <PianoPopUp
            piano={element}
            coordinates={coordinates}
            pianoId={element._id}
            fetchPianos={fetchPianos}
            setUpdatePianoState={setUpdatePianoState}
          />
        </Marker>
      );
    });
  };

  function MapClicker() {
    const map = useMapEvents({
      click(e) {
        if (e.latlng) {
          handleClickCoordinates(e.latlng);
          console.log(e.latlng);
        }
      },
    });
  }

  return (
    // Generating the map
    <div>
      <MapContainer
        style={{ width: "100vw", height: "90vh" }}
        center={[48.8566, 2.3522]}
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
