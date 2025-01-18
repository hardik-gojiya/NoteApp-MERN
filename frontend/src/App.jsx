import { useState } from "react";
import "./App.css";
import Header from "./components/header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MyNotes from "./components/MyNotes.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import CreateNote from "./components/createNote.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Editnote from "./components/Editnote.jsx";
import Profile from "./components/profile.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <header className=" sticky">
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notes" element={<MyNotes />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/editnote/:id" element={<Editnote />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
