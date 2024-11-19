import React from "react";
import Main from "./components/Main"; // Adjust the path based on your file structure
import "./index.tailwind.css";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Navigation */}
      <NavBar /> {/* Using the NavBar component */}
      {/* Events List */}
      <section className="mb-20">
        <Main /> {/* Using the EventsList component */}
      </section>
    </div>
  );
};

export default App;
