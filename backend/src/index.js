import express from "express";
import { notes } from "../data/notes.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World ");
});

// app.get("/api/v1/notes", (req, res) => {
//   res.send(notes);
// });

// app.get("/api/v1/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.json(note);
// });

import userRoutes from "../routes/user.route.js";
app.use("/api/v1/user", userRoutes);

import notesRoutes from "../routes/notes.route.js";
app.use("/api/v1/notes", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
