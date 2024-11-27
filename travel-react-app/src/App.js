import React, { useState } from "react";
import HomeScreen from "./screen/HomeScreen";
import MainScreen from "./screen/MainScreen";
import "./App.css";

function App() {
  const [isHome, setIsHome] = useState(true);

  return (
    <div className="App">
      {isHome ? (
        <HomeScreen onStart={() => setIsHome(false)} />
      ) : (
        <MainScreen />
      )}
    </div>
  );
}

export default App;