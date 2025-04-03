import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./connections/connection.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import sequelize from "./connections/conn.js";
dotenv.config();

const app = express();
app.use(cors());
// connectDB();
// databse connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database is successfully connected in index.js");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.json());

app.use("/zetsol/auth", authRoutes);
app.use("/zetsol/task", taskRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`.bgYellow);
});
