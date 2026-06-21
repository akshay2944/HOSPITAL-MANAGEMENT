import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect,useEffectEvent,useCallback,useContext } from "react";
import { useState } from "react";
import axios from "axios";

 const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYyT7HHtVTkRQ_AHCWmHY6seQ-Z1IEdOSI7Ih7rdX3A&s=10"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300"
        />

        <h2 className="text-2xl font-bold">Akshay Kumar</h2>

        <p className="text-gray-600 mt-2">
          Entrepreneur | MERN Stack Developer
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Follow
          </button>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
