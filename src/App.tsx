import React from "react";
import Ticket from "./components/Ticket"; // Adjust the path based on your file structure
import "./index.tailwind.css"

const App: React.FC = () => {

  return (
    <div className="App">
        {/* Events List */}
        <section>
          <h2 className="text-center text-2xl font-bold">
            Upcoming Events in Monterrey
          </h2>
          <Ticket /> {/* Using the EventsList component */}
        </section>
    </div>
  );
};

export default App;
