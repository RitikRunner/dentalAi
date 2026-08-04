import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import analysisRoutes from "./routes/analysis.js";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use("/public", express.static("public"));

app.use("/api/chat", chatRoutes);
app.use("/api/analyze-call", analysisRoutes);

export default app;