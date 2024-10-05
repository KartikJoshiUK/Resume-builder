import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", resumeRoutes);

// Basic Route
app.get("/", (_req, res) => {
  res.send("Hello, TypeScript with Express and Mongoose!");
});

export default app;
