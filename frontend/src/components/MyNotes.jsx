import React, { useEffect, useState } from "react";
import MainScreen from "./MainScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyNotes() {
  const navigate = useNavigate();
  const [openNoteId, setOpenNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const fetchNotes = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUsername(userInfo.data.username);
    const token = userInfo.data.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/api/v1/notes", config);
      setNotes(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNoteHandler = async (id, event) => {
    event.stopPropagation();
    if (window.confirm("Are You Sure?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo.data.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        setLoading(true);
        await axios.delete(`/api/v1/notes/${id}`, config);
        setLoading(false);
        window.location.reload();
      } catch (error) {
        setError(error.response.data.message || "error occured");
        setLoading(false);
      }
    }
  };

  function toggleOpenNoteHandler(id) {
    setOpenNoteId((prevId) => (prevId === id ? null : id));
  }

  return (
    <div className="mt-20 mb-16">
      <MainScreen title={`Welcome ${username}...`}>
        <a href="/createnote">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create New Note
          </button>
        </a>
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
        {notes?.map((note) => (
          <div
            key={note._id}
            className="bg-[#1F2937] shadow-lg rounded-lg border border-gray-700 mt-4"
          >
            {/* Card Header */}
            <div
              className="bg-gray-800 px-4 py-2 border-b border-gray-700 text-lg font-semibold text-white flex justify-between cursor-pointer"
              onClick={() => toggleOpenNoteHandler(note._id)}
            >
              <p>{note.title}</p>
              <div>
                <a
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/editnote/${note._id}`);
                  }}
                >
                  <button className="ml-4 bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                    Edit
                  </button>
                </a>

                <button
                  onClick={(event) => deleteNoteHandler(note._id, event)}
                  className="ml-4 bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            {/* Card Body */}
            <div
              onClick={() => toggleOpenNoteHandler(note._id)}
              className={`p-4 transition-all ease-in-out duration-100 cursor-pointer ${
                openNoteId === note._id
                  ? "max-h-screen opacity-100 "
                  : "max-h-0 opacity-0 overflow-hidden pb-0 pt-0"
              }`}
            >
              <h4 className="mb-4 p-1 bg-green-600 inline rounded">
                Category - {note.category}
              </h4>
              <blockquote className="text-white italic">
                <p className="mb-4">{note.content}</p>
                <footer className="text-gray-400 text-sm">
                  created at{" "}
                  {note.createdAt.slice(0, 10).split("-").reverse().join("-")}
                </footer>
              </blockquote>
            </div>
          </div>
        ))}
      </MainScreen>
    </div>
  );
}

export default MyNotes;
