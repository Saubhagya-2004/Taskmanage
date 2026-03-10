# 📋 Task Portal

A full-stack Task Management Portal built with **React (Vite)**, **NestJS**, and **MongoDB Atlas**. Features include user authentication, task creation, status toggling, and filtering.

---

## 🚀 How to Run

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (connection string configured in `.env`)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Taskmanage.git
cd Taskmanage
```

### 2. Backend Setup (NestJS)
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/Testmanage
JWT_SECRET=supersecret123
PORT=3000
```

Start the backend:
```bash
npm run start:dev
```
Backend runs at: **http://localhost:3000**

### 3. Frontend Setup (React + Vite)
```bash
cd Client
npm install
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## 🤖 AI Prompts Used

The following prompts were provided to the AI assistant during development:

1. *"Create a Task Portal with the following features: Add Task, View Tasks, Mark Task as Completed... Frontend: React (Vite), Backend: NestJS, Database: MongoDB. User authentication required."*
2. *"connect mongodb and Create a Task Portal..."* — provided MongoDB connection string
3. *"fix it"* — prompted the AI to resolve the `ECONNREFUSED` DNS error with MongoDB Atlas SRV records
4. *"nodemon install and gave command"* — prompted the AI to install and configure nodemon
5. *"GitHub repo link, README with: How to run, AI prompts used, What AI generated vs modified, API design, State management"*

---

## 🛠️ What AI Generated vs What Was Modified

### ✅ AI Generated (100%)
| File | Purpose |
|------|---------|
| `Backend/src/app.module.ts` | Root NestJS module with MongoDB & Config setup |
| `Backend/src/auth/auth.module.ts` | Auth module with JWT & Passport |
| `Backend/src/auth/auth.service.ts` | Register, login, bcrypt password hashing |
| `Backend/src/auth/auth.controller.ts` | `/auth/register` and `/auth/login` endpoints |
| `Backend/src/auth/jwt.strategy.ts` | JWT passport strategy |
| `Backend/src/auth/jwt-auth.guard.ts` | Guard to protect routes |
| `Backend/src/tasks/tasks.module.ts` | Tasks feature module |
| `Backend/src/tasks/tasks.service.ts` | Task CRUD business logic |
| `Backend/src/tasks/tasks.controller.ts` | Task REST endpoints |
| `Backend/src/schemas/user.schema.ts` | Mongoose User schema |
| `Backend/src/schemas/task.schema.ts` | Mongoose Task schema |
| `Backend/src/main.ts` | App entry point with CORS enabled |
| `Backend/.env` | Environment variables (including DB bypass for DNS block) |
| `Backend/nodemon.json` | Nodemon configuration |
| `Client/src/App.jsx` | React Router setup with public/protected routes |
| `Client/src/context/AuthContext.jsx` | Auth Context Provider with localStorage persistence |
| `Client/src/pages/Login.jsx` | Login page with Tailwind CSS |
| `Client/src/pages/Register.jsx` | Register page with Tailwind CSS |
| `Client/src/pages/Dashboard.jsx` | Task dashboard with filtering and status toggle |
| `Client/vite.config.js` | Vite config with Tailwind CSS plugin |
| `Client/src/index.css` | Tailwind v4 CSS import |

### ✏️ Modified by Developer
| File | Modification |
|------|-------------|
| `Backend/config/database.js` | Updated MongoDB connection strings manually |
| `Backend/.env` | Updated the `MONGODB_URI` to `Testmanage` database |

---

## 📡 API Design

> **[NON AI GENERATED]** — To be filled by the developer.

### Base URL: `http://localhost:3000`

#### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Login and receive JWT token | ❌ |

#### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Fetch all tasks for the logged-in user | ✅ |
| POST | `/tasks` | Create a new task | ✅ |
| PATCH | `/tasks/:id/status` | Toggle task status (Pending/Completed) | ✅ |

#### Request/Response Examples

**POST /auth/register**
```json
// Request
{ "username": "john", "password": "secret123" }

// Response
{ "access_token": "eyJhbGci...", "userId": "...", "username": "john" }
```

**POST /tasks**
```json
// Request (Bearer token required)
{ "title": "Buy groceries", "description": "Milk, eggs, bread" }

// Response
{ "_id": "...", "title": "Buy groceries", "description": "...", "status": "Pending", "userId": "...", "createdAt": "2026-03-10T..." }
```

**PATCH /tasks/:id/status**
```json
// Request (Bearer token required)
{ "status": "Completed" }

// Response
{ "_id": "...", "status": "Completed", ... }
```

---

## 🗃️ State Management

> **[NON AI GENERATED]** — To be filled by the developer.

The application uses **React Context API** for global state management.

### AuthContext (`Client/src/context/AuthContext.jsx`)
- Stores the current authenticated user (`username` + JWT `token`)
- Persists login state across page refreshes using `localStorage`
- Sets `axios` default `Authorization` header automatically on login
- Provides `login()` and `logout()` functions to child components

### Local Component State
- Task list, filter selection, and form inputs are managed using `useState` inside `Dashboard.jsx`
- No external state library (Redux, Zustand, etc.) was used — Context API + `useState` was sufficient for this project's complexity

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Backend | NestJS + TypeScript |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT + Passport + bcrypt |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## 📁 Project Structure

```
Taskmanage/
├── Backend/                    # NestJS API
│   ├── src/
│   │   ├── auth/               # Auth module (login, register, JWT)
│   │   ├── tasks/              # Tasks module (CRUD)
│   │   ├── schemas/            # Mongoose schemas (User, Task)
│   │   ├── app.module.ts       # Root module
│   │   └── main.ts             # Entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── Client/                     # React Vite frontend
    ├── src/
    │   ├── context/            # AuthContext
    │   ├── pages/              # Login, Register, Dashboard
    │   ├── App.jsx             # Router & route guards
    │   └── main.jsx            # React entry point
    └── package.json
```
