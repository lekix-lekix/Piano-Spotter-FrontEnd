import React from "react";

const DisplayContext = React.createContext();

const DisplayWrapper = () => {
  const [quickBarVisible, setQuickBarVisible] = useState(false);
  const [addPianoVisible, setAddPianoVisible] = useState(false);
  const [updatePianoVisible, setUpdatePianoVisible] = useState(false);
  const [aboutMessageVisible, setAboutMessageVisible] = useState(true);

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

  return (
    <DisplayContext.Provider
      value={{
        quickBarVisible,
        addPianoVisible,
        updatePianoVisible,
        aboutMessageVisible,
        setWelcomeMessageState,
        setQuickBarState,
      }}
    ></DisplayContext.Provider>
  );
};
