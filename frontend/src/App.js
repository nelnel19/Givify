import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Campaign from "./components/Campaign";
import Homepage from "./components/Homepage";
import Donations from "./components/Donations"; 
import History from "./components/History"; // ✅ Import History component

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Main routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/history" element={<History />} /> {/* ✅ Added History route */}
      </Routes>
    </Router>
  );
}

export default App;
