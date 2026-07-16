import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3001,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || "qwen2.5:3b",
  REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
};