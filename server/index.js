import express from 'express';
import { connectDB } from './db/connection.js';
import userRouter from './src/router/user.router.js';
import taskRouter from './src/router/task.router.js';
import { config } from "dotenv";
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 2000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  credentials: true,
}));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

connectDB();

app.get('/', (req, res) => res.send('TaskFlow API is running ✅'));

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
