import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./About";
import "./App.css";
import Cart from "./Cart";
import Movies from "./Movies";
import Navbar from "./Navbar";
import StreamList from "./StreamList";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <Routes>
          <Route
            path="/"
            element={<StreamList filterCategory={filterCategory} setFilterCategory={setFilterCategory} />}
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
