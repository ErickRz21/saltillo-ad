import React from "react";
import Ticket from "./components/Ticket"; // Adjust the path based on your file structure
import "./index.tailwind.css"
import NavBar from "./components/NavBar";

const App: React.FC = () => {

  return (
    <div className="App">
      {/* Navigation */}
      <NavBar /> {/* Using the NavBar component */}

        {/* Events List */}
        <section className="mt-10 mb-20">
          <h2 className="text-center text-3xl font-bold">
            Featured Events
          </h2>
          <Ticket /> {/* Using the EventsList component */}
        </section>
    </div>
  );
};

export default App;
