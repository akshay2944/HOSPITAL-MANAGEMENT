import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./services/register";
import Login from "./services/login";
import Dashboard from "./services/dashbord";
import Home from "./components/home";
import Navbar from "./components/nevbar";
import Graph from "./datahandel/graph";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graph" element={<Graph data={[{ name: "A", value: 10 }, { name: "B", value: 20 }, { name: "C", value: 15 }]} />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;