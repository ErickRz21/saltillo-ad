import React from "react";
import Main from "./components/Main"; // Adjust the path based on your file structure
import "./index.tailwind.css";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="App mx-3 lg:mx-20">
      {/* Navigation */}
      <NavBar /> {/* Using the NavBar component */}
      {/* Events List */}
      <Main /> {/* Using the EventsList component */}
    </div>
  );
};

export default App;
