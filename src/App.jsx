import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { useContext, useEffect, useState } from "react";

import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import LoginPopUp from "./components/authPopUps/LoginPopUp/LoginPopUp";
import SignupPopUp from "./components/authPopUps/SignupPopUp/Signup";
import QuickBar from "./components/QuickBar/QuickBar";
import AddPiano from "./components/AddPiano/AddPiano";
import "./App.css";
import pianoApi from "./service/piano.service";
import Profile from "./Pages/Profile/Profile";
import UpdatePiano from "./components/UpdatePiano/UpdatePiano";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [pianos, setPianos] = useState([]);

  const [quickBarVisible, setQuickBarVisible] = useState(false);
  const [addPianoVisible, setAddPianoVisible] = useState(false);
  const [updatePianoVisible, setUpdatePianoVisible] = useState(false);
  const [onePianoId, setOnePianoId] = useState("");

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

  // UpdatePiano on / off
  const setUpdatePianoState = (pianoId) => {
    setOnePianoId(pianoId);
    setUpdatePianoVisible(true);
    setQuickBarVisible(false);
  };

  // Set everything off
  const noPopUp = () => {
    setAddPianoVisible(false);
    setQuickBarVisible(false);
  };

  // If QuickBar on => else should be off
  useEffect(() => {
    if (quickBarVisible) {
      setAddPianoVisible(false);
      setUpdatePianoVisible(false);
    }
  }, [quickBarVisible]);

  return (
    <div className="App">
      <NavBar function={setQuickBarState} />
      {quickBarVisible && <QuickBar setAddPianoState={setAddPianoState} />}
      {addPianoVisible && (
        <AddPiano
          fetchPianos={fetchPianos}
          setQuickBarState={setQuickBarState}
        />
      )}
      {updatePianoVisible && (
        <UpdatePiano
          fetchPianos={fetchPianos}
          setQuickBarState={setQuickBarState}
          onePianoId={onePianoId}
        />
      )}
      <Routes>
        <Route
          path={"/"}
          element={<Map {...{ fetchPianos, pianos, setUpdatePianoState }} />}
        >
          <Route path={"/login"} element={<LoginPopUp />} />
          <Route path={"/signup"} element={<SignupPopUp />} />
        </Route>
        <Route
          path={"/profile"}
          element={<Profile noPopUp={noPopUp} pianos={pianos} />}
        />
      </Routes>
    </div>
  );
}

export default App;
