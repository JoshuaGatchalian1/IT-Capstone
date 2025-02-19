import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import Movies from "./Movies";
import Navbar from "./Navbar";
import StreamList from "./StreamList";
import "./StreamList.css"; // Importing the App.css file for styles

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
