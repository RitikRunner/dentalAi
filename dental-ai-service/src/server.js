import dotenv from "dotenv";
dotenv.config();

console.log(process.env);
console.log("OLLAMA MODEL =", process.env.OLLAMA_MODEL);

import app from "./app.js";
import { connectRedis } from "./config/redis.js";
import { env } from "./config/env.js";

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`AI Service running on ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();