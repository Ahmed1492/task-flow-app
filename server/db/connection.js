import mongoose from "mongoose";
import "dotenv/config";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/userTaskManger');
//     console.log('Connected successfully!');
//   } catch (error) {
//     console.log('Error connecting to DB:', error);
//     process.exit(1); // Exit the app if DB connection fails
//   }

//   // Close the connection when app shuts down
//   process.on('SIGINT', async () => {
//     await mongoose.disconnect();
//     console.log('DB disconnected on app termination');
//     process.exit(0);
//   });
// };


export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}/user-task-maneger`).then(() => console.log('DB connected')
  ).catch(err => console.log(err));
};

export const connect = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('DB Connected'));
    await mongoose.connect(`${process.env.MONGODB_URL}/user-task-maneger`);
  } catch (error) {
    console.log(error.message);

  }
};