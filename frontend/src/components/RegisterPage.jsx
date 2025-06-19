import React, { useState } from "react";
import axios from "axios";
import { seePassword } from "../assets/validations.js";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avtar, setAvtar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadAvtar = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "noteApp");
    data.append("cloud_name", "hardikgojiya");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/hardikgojiya/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json(); // Parse the JSON response
      setAvtar(result.secure_url); // Set the image URL from the response
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/user/register", // replace with your API endpoint
        { username, email, password, avtar },
        config
      );
      console.log(data);
      navigate("/login");
      setLoading(false);
      confirm("register succesfully, please login");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
  };

  return (
    <div className="min-h-screen text-white  flex flex-col items-center justify-center py-6 sm:py-12 ">
      <div className="bg p-8  rounded-lg max-w-md w-full shadow-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        {loading && (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2  bg-[#323A48] border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2  bg-[#323A48] border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2  bg-[#323A48] border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
            <button
              className="absolute inset-y-0 pt-5 right-3 flex items-center text-white"
              onClick={(e) => seePassword(e, "password")}
            >
              👁️
            </button>
          </div>
          {/* confirm Password */}
          <div className="relative ">
            <label htmlFor="password" className="block text-sm font-medium ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-Password"
              name="confirm-Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2  bg-[#323A48] border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
            />
            <button
              className="absolute inset-y-0 pt-5 right-3 flex items-center text-white"
              onClick={(e) => seePassword(e, "confirm-Password")}
            >
              👁️
            </button>
          </div>

          {/* Avtar Upload */}
          <div className="relative">
            <label htmlFor="avatar" className="block text-sm font-medium ">
              Avatar Picture
            </label>
            <input
              type="file"
              id="avtar"
              name="avtar"
              onChange={(e) => uploadAvtar(e.target.files[0])}
              className="mt-1 block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
          </div>

          <div className="relative">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              login
            </a>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
