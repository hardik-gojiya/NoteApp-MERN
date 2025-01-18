import React, { useEffect } from "react";
import notebookImage from "../public/notebook.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const profile = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  if (profile) {
    return navigate("/notes");
  }
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center p-28"
      style={{
        backgroundImage: `url(${notebookImage})`,
      }}
    >
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        {/* Text Lines */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Zipper Notes
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your ultimate solution for managing notes efficiently.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
