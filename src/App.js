import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CaState from "./context/contractapp/CaState";

export default function App() {
  // const myapiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <CaState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </CaState>
    </div>
  );
}
