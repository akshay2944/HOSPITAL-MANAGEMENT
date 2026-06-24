import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedicineList from "./services/medicin.jsx";
import Register from "./services/register.jsx";
import Login from "./services/login.jsx";



function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path="/" element={<MedicineList/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          
          
        </Routes>
      </Router>
    </div>
  );
}
export default App;