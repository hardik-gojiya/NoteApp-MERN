import axios from "axios";
import { config } from "dotenv";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editnote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("text");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const FetchNotes = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.data.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/v1/notes/${id}`, config);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch note");
    }
  };

  useEffect(() => {
    FetchNotes();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.data.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.put(
        `/api/v1/notes/${id}`,
        { title, content, category },
        config
      );
      setLoading(false);
      navigate("/notes");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update note");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 pb-16 flex items-center justify-center text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-2xl w-full max-w-lg mt-28">
        <h1 className="text-2xl font-semibold  text-center mb-6">
          Create a New Note
        </h1>
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
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium ">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium ">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium ">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter note category"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Note
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Editnote;
