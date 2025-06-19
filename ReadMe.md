# 📝 NoteApp-MERN

A full-stack Note-Taking web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. Users can register, log in securely using JWT authentication, and perform full CRUD operations on their notes.

> ✅ Clean UI • 🔐 Secure Auth • ⚡ Fast • 🗂️ Organized Notes

---

## 🚀 Live Demo

[Click here to view live demo](https://your-live-app-link.com)

---

## 📸 Screenshots

<!-- Add your screenshots here -->
<!-- Example:
![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
-->

---

## 🛠 Tech Stack

| Technology     | Description                |
|----------------|----------------------------|
| 🟢 Node.js     | Backend JavaScript runtime |
| ⚙️ Express.js  | Backend framework          |
| 🌿 MongoDB     | NoSQL database             |
| ⚛️ React.js    | Frontend library           |
| ⚡ Vite         | Fast frontend tooling      |
| 🎨 Tailwind CSS / CSS | Styling framework     |
| 🔐 JWT         | Authentication tokens      |

---

## ✨ Features

- ✅ User Registration & Login (JWT based)
- 🧾 Create, Read, Update, and Delete Notes
- 🔄 Reorder notes (drag and drop)
- 🔐 Protected routes
- 📄 .env-based environment configuration
- ☁️ MongoDB Atlas integration

---

## 📁 Project Structure

```
NoteApp-MERN/
├── client/       # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── server/       # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## ⚙️ Environment Variables

### 🔐 Backend – `server/.env`

```env
PORT=8080
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

### 🌐 Frontend – `client/.env.local`

```env
VITE_API_URL=http://localhost:8080
```

---

## 🧩 API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/auth/register`   | Register a new user      |
| POST   | `/auth/login`      | Login and get token      |
| GET    | `/notes`           | Get all notes (auth)     |
| POST   | `/notes`           | Create new note          |
| PUT    | `/notes/:id`       | Update note by ID        |
| DELETE | `/notes/:id`       | Delete note by ID        |

> All `/notes` routes are protected and require a valid JWT token.

---

## 📦 Installation

Clone the repo and install both backend and frontend:

```bash
git clone https://github.com/hardik-gojiya/NoteApp-MERN.git
cd NoteApp-MERN
```

### 🔧 Backend Setup

```bash
cd server
npm install
# Setup .env as shown above
npm run dev
```

### 💻 Frontend Setup

```bash
cd ../client
npm install
# Setup .env.local as shown above
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:8080

---

## 🧑‍💻 Author

**Hardik Gojiya**  
GitHub: [@hardik-gojiya](https://github.com/hardik-gojiya)

---

## 📌 Roadmap

- [ ] Add search & filter notes
- [ ] Add note tagging system
- [ ] Rich text / Markdown editor
- [ ] User profile & preferences
- [ ] Light/Dark mode toggle
- [ ] Full mobile responsiveness
- [ ] Deployment to Vercel / Render

---

## 🤝 Contribution

Contributions, issues, and suggestions are welcome!  
Feel free to fork this repo and open a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🌟 Show Some Love

If you liked this project, don’t forget to ⭐ star the repository on GitHub!


![Screenshot 2025-01-18 102330](https://github.com/user-attachments/assets/2fbac8b6-0714-4895-b039-c519e6905845)
![Screenshot 2025-01-18 102314](https://github.com/user-attachments/assets/e94acd15-b135-4f88-8b76-b2a5a88b9a43)
![Screenshot 2025-01-18 102255](https://github.com/user-attachments/assets/1204b681-eaca-4d9c-8bf5-702fcd42de61)
