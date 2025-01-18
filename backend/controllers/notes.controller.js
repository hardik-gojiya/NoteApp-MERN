import { Notes } from "../models/notes.model.js";
import AsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/apiResponse.js";

const getNote = AsyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user._id });
  res.json(notes);
});

const getNoteById = AsyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json(new ApiResponse(404, {}, "Note not found"));
  }
});

const createNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if ((!title && !content) || !category) {
    return res.json(new ApiResponse(400, {}, "All fields are required"));
  }

  const note = new Notes({ user: req.user._id, title, content, category });

  const createdNote = await note.save();

  if (!createdNote) {
    return res.json(new ApiResponse(400, {}, "Error while creating note"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdNote, "note  created successfully"));
});

const updateNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Notes.findById(req.params.id);

  if (!note) {
    return res.status(404).json(new ApiResponse(404, {}, "Note not found"));
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "You can only update your own note"));
  }

  note.title = title;
  note.content = content;
  note.category = category;
  const updatedNote = await note.save();

  if (!updatedNote) {
    return res.json(new ApiResponse(400, {}, "Error while updating note"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNote = AsyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (!note) {
    return res.status(404).json(new ApiResponse(404, {}, "Note not found"));
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "You can only update your own note"));
  }

  await Notes.deleteOne({ _id: req.params.id });
  res.status(200).json(new ApiResponse(200, {}, "Note deleted successfully"));
});

export { getNote, getNoteById, createNote, updateNote, deleteNote };
