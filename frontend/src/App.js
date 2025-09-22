import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Campaign from "./components/Campaign"; // Import the Campaign component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campaigns" element={<Campaign />} /> {/* Added Campaign route */}
      </Routes>
    </Router>
  );
}

export default App;
