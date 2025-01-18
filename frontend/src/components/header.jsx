import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const profile = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container flex items-center justify-between ">
          {/* Logo */}
          <div className="text-xl font-bold mr-[3vw] ml-[5vw]">
            <a href={profile ? "/notes" : "/"}>Notes</a>
          </div>

          {/* Search Input */}
          <div className="flex flex-grow mr-[3vw] justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md sm:mr-10 max-w-xs focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center mt-2  mr-[3vw]">
            {/* My Notes Button */}
            <div className="mr-4">
              <a
                href="/notes"
                className="text-white hover:underline m-2 border-none outline-none"
              >
                My Notes
              </a>
            </div>

            {/* Profile Dropdown */}
            {profile ? (
              <div className="relative mr-[3vw]">
                <button
                  className="text-white focus:outline-none  "
                  onClick={() => {
                    const dropdown = document.getElementById("dropdown");
                    dropdown.classList.toggle("hidden");
                  }}
                >
                  {profile.data.username}🔻
                </button>
                <div
                  id="dropdown"
                  className="absolute left-0 mt-2 bg-gray-700 text-white rounded shadow-lg hidden"
                >
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <a href="/login">Log In</a>
            )}
          </div>
        </div>

        {/* Responsive Search Input */}
        {/* <div className="w-full flex justify-center mt-4 sm:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md text-gray-800 w-11/12 focus:outline-none"
          />
        </div> */}
      </nav>
    </>
  );
}

export default Header;
