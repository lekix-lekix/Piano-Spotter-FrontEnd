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

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [quickBarVisible, setQuickBarVisible] = useState(false);
  const [addPianoVisible, setAddPianoVisible] = useState(false);
  const [pianos, setPianos] = useState([]);

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

  // If QuickBar on => else should be off
  useEffect(() => {
    if (quickBarVisible) setAddPianoVisible(false);
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
      <Routes>
        <Route path={"/"} element={<Map {...{ fetchPianos, pianos }} />}>
          <Route path={"/login"} element={<LoginPopUp />} />
          <Route path={"/signup"} element={<SignupPopUp />} />
          <Route path={"/profile}"} element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
