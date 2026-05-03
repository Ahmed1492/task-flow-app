import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return; // reuse connection in serverless

  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URL}/user-task-maneger`);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    throw error;
  }
};
