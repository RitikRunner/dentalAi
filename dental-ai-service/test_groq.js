import Groq from "groq-sdk";
import fs from "fs";
import { config } from "dotenv";
config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
    try {
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream("/Users/ritksharma/Downloads/sampleAudio.mp3"),
            model: "whisper-large-v3-turbo",
            response_format: "json",
            temperature: 0.0
        });
        console.log("Success:", transcription.text);
    } catch (e) {
        console.error("Groq Error:", e.message);
    }
}
test();
