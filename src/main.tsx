import React from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter from react-router-dom
import { createRoot } from "react-dom/client";
import App from "./App"; // Import your App component
import "./index.tailwind.css"; // Import your styles

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
