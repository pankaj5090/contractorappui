import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import EmployeeGrid from "./components/EmployeeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CaState from "./context/contractapp/CaState";
import EmployeeAdd from "./components/EmployeeAdd";

export default function App() {
  return (
    <div>
      <CaState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/employeegrid" element={<EmployeeGrid />} />
              <Route path="/about" element={<About />} />
              <Route path="/addemployee" element={<EmployeeAdd />} />
            </Routes>
          </div>
        </Router>
      </CaState>
    </div>
  );
}
