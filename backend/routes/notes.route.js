import express from "express";
import {
  createNote,
  getNote,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getNote);
router.route("/createnote").post(verifyJWT, createNote);
router.route("/:id").get(verifyJWT, getNoteById).put(verifyJWT, updateNote).delete(verifyJWT, deleteNote);

export default router;
