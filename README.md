# TaskFlow — Task Manager App

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features a modern UI with dark/light mode, JWT authentication, full task CRUD, and a profile management system.

---

## 🚀 Live Demo

> Add your Vercel URLs here after deployment

- **Frontend:** `https://your-frontend.vercel.app`
- **Backend API:** `https://your-backend.vercel.app`

---

## ✨ Features

- 🔐 User Authentication (Register / Login) with JWT
- 👤 Profile page with editable name, email, age, and password
- 📋 Full Task CRUD — Create, Read, Update, Delete
- 📊 Task filtering by status:
  - ✅ Completed · ⏳ Pending · 🔄 In Progress · 🚀 Deployed · 📌 Deferred
- 🌙 Dark / Light mode toggle (persisted in localStorage)
- 💀 Skeleton loading states — no flash between page navigations
- ⚠️ Error, empty, and 404 states with helpful UI
- 📱 Responsive layout — works on mobile and desktop

---

## 🧱 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| jwt-decode | Token decoding |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| bcrypt | Password hashing |
| jsonwebtoken | Auth tokens |
| dotenv | Environment config |
| cors | Cross-origin requests |

---

## 📁 Project Structure

```
├── frontend/          # React app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── page/         # Route-level pages
│   │   ├── context/      # App context (dark mode, backend URL)
│   │   └── index.css     # Global styles + animations
│   ├── public/
│   └── vercel.json       # Vercel SPA routing config
│
├── server/            # Express API
│   ├── src/
│   │   ├── controller/   # Route handlers
│   │   └── router/       # Express routers
│   ├── db/
│   │   ├── models/       # Mongoose schemas
│   │   └── connection.js # MongoDB connection
│   ├── index.js          # Entry point
│   └── vercel.json       # Vercel serverless config
│
└── README.md
```

---

## 🛠️ Local Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net
TOKEN_SECRET_KEY=your_jwt_secret
SECRET_KEY=10
PORT=2000
FRONTEND_URL=http://localhost:3000
```

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:2000
REACT_APP_NAME=TaskFlow
```

```bash
npm start
```

---

## ☁️ Deploying to Vercel

### Backend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **`server`** folder (or set root directory to `server`)
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URL`
   - `TOKEN_SECRET_KEY`
   - `SECRET_KEY`
   - `FRONTEND_URL` → your frontend Vercel URL
4. Deploy — Vercel uses `vercel.json` automatically

### Frontend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **`frontend`** folder (or set root directory to `frontend`)
3. Add environment variable:
   - `REACT_APP_BACKEND_URL` → your backend Vercel URL
4. Build command: `npm run build` (already set to `CI=false`)
5. Output directory: `build`
6. Deploy — `vercel.json` handles SPA routing automatically

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create new account |
| POST | `/login` | Login, returns JWT |
| GET | `/profile/:id` | Get user profile |
| PATCH | `/profile/:id` | Update user profile |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks/:userId/` | Get all tasks |
| GET | `/tasks/:userId/pending` | Get pending tasks |
| GET | `/tasks/:userId/completed` | Get completed tasks |
| GET | `/tasks/:userId/inProgress` | Get in-progress tasks |
| GET | `/tasks/:userId/deployed` | Get deployed tasks |
| GET | `/tasks/:userId/deferred` | Get deferred tasks |
| POST | `/task` | Create new task |
| PATCH | `/task/:id` | Update task |
| DELETE | `/task/:id` | Delete task |

---

## 👤 Author

**Ahmed Mohamed**  
© 2026 Ahmed Mohamed. All rights reserved.
