import React from "react";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Events from "./Events";
import Home from "./Home";
// import MyEvents from "./MyEvents";

export default function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        {/* <Route path="/myEvents" element={<MyEvents />} /> */}
      </Routes>
    </>
  );
}
