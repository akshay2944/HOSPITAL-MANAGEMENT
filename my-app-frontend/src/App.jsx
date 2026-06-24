import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedicineList from "./services/medicin.jsx";



function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path="/" element={<MedicineList/>} />
          
        </Routes>
      </Router>
    </div>
  );
}
export default App;