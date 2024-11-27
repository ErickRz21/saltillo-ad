import React from "react";
import { Routes, Route } from "react-router-dom";
import EventsByGenre from "./EventsGenre";
import FeaturedEvents from "./FeaturedEvents";
import Home from "./Home";
import Footer from "./Footer";

const Main: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:category" element={<EventsByGenre />} />
        <Route path="/category/:genre" element={<EventsByGenre />} />
      </Routes>
      <FeaturedEvents />
      <Footer />
    </>
  );
};

export default Main;
