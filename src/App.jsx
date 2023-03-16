import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { useContext, useEffect, useState } from "react";

import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import LoginPopUp from "./components/authPopUps/LoginPopUp/LoginPopUp";
import SignupPopUp from "./components/authPopUps/SignupPopUp/Signup";
import QuickBar from "./components/QuickBar/QuickBar";
import AddPiano from "./components/AddPiano/AddPiano";
import UpdatePiano from "./components/UpdatePiano/UpdatePiano";

import pianoApi from "./service/piano.service";

import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import "./App.css";
import Welcome from "./components/Welcome/Welcome";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [pianos, setPianos] = useState([]);

  const [quickBarVisible, setQuickBarVisible] = useState(false);
  const [addPianoVisible, setAddPianoVisible] = useState(false);
  const [updatePianoVisible, setUpdatePianoVisible] = useState(false);
  const [aboutMessageVisible, setAboutMessageVisible] = useState(true);

  const [onePianoId, setOnePianoId] = useState("");
  const [clickCoordinates, setClickCoordinates] = useState([]);

  // Fetching piano data from the DB at the higher level of the app, to pass the function as props and refresh data when adding / removing piano
  function fetchPianos() {
    pianoApi
      .getAllPianos()
      .then((response) => setPianos(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchPianos();
  }, []);

  // Displaying the different components //

  // Welcome message on / off
  const setWelcomeMessageState = () => {
    setAboutMessageVisible(!aboutMessageVisible);
  };

  // Quickbar on / off
  const setQuickBarState = () => {
    setQuickBarVisible(!quickBarVisible);
  };

  // If logged in => QuickBar on
  useEffect(() => {
    if (isLoggedIn) setQuickBarVisible(true);
    else setQuickBarVisible(false);
  }, [isLoggedIn]);

  // AddPiano on / off
  const setAddPianoState = () => {
    setAddPianoVisible(true);
    setQuickBarVisible(false);
  };

  // UpdatePiano on / off (also getting one piano ID from )
  const setUpdatePianoState = (pianoId) => {
    setOnePianoId(pianoId);
    setUpdatePianoVisible(true);
    setQuickBarVisible(false);
    setAddPianoVisible(false);
  };

  // Set everything off
  const noPopUp = () => {
    setAddPianoVisible(false);
    setQuickBarVisible(false);
    setUpdatePianoVisible(false);
    setAboutMessageVisible(false);
  };

  // If QuickBar on => else should be off
  useEffect(() => {
    if (quickBarVisible) {
      setAddPianoVisible(false);
      setUpdatePianoVisible(false);
    }
  }, [quickBarVisible]);

  // Handling click coordinates
  const handleClickCoordinates = (latlong) => {
    setClickCoordinates(latlong);
  };

  return (
    <div className="App">
      <NavBar
        setQuickBarState={setQuickBarState}
        setWelcomeMessageState={setWelcomeMessageState}
      />
      {aboutMessageVisible && (
        <Welcome setWelcomeMessageState={setWelcomeMessageState} />
      )}
      {quickBarVisible && <QuickBar setAddPianoState={setAddPianoState} />}
      {addPianoVisible && (
        <AddPiano
          fetchPianos={fetchPianos}
          setQuickBarState={setQuickBarState}
          clickCoordinates={clickCoordinates}
        />
      )}
      {updatePianoVisible && (
        <UpdatePiano
          fetchPianos={fetchPianos}
          setQuickBarState={setQuickBarState}
          onePianoId={onePianoId}
          clickCoordinates={clickCoordinates}
        />
      )}
      <Routes>
        <Route
          path={"/"}
          element={
            <Map
              {...{
                fetchPianos,
                pianos,
                setUpdatePianoState,
                handleClickCoordinates,
              }}
            />
          }
        >
          <Route path={"/login"} element={<LoginPopUp />} />
          <Route path={"/signup"} element={<SignupPopUp />} />
        </Route>
        <Route
          path={"/profile"}
          element={<Profile noPopUp={noPopUp} pianos={pianos} />}
        />
        <Route path="*" element={<NotFound noPopUp={noPopUp} />} />
      </Routes>
    </div>
  );
}

export default App;
