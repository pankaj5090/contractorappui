import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeAdd from "./components/EmployeeAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CaState from "./context/contractapp/CaState";
import WorkGrid from "./components/WorkGrid";
import WorkAdd from "./components/WorkAdd";
import WorkEmployeeGrid from "./components/WorkEmployeeGrid";
import WorkEmployeeAdd from "./components/WorkEmployeeAdd";
import WorkEmployeeEdit from "./components/WorkEmployeeEdit";

export default function App() {
  return (
    <div>
      <CaState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/employeegrid" element={<EmployeeGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="/addemployee" element={<EmployeeAdd />} />
            <Route path="/workgrid" element={<WorkGrid />} />
            <Route path="/addwork" element={<WorkAdd />} />
            <Route path="/workemployeegrid" element={<WorkEmployeeGrid />} />
            <Route path="/addworkemployee" element={<WorkEmployeeAdd />} />
            <Route path="/editworkemployee" element={<WorkEmployeeEdit />} />
          </Routes>
        </Router>
      </CaState>
    </div>
  );
}
