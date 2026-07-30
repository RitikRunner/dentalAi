import Groq from "groq-sdk";
import fs from "fs";
import { env } from "../config/env.js";

const groq = new Groq({
    apiKey: env.GROQ_API_KEY
});

export async function transcribeAudio(filePath) {
    try {
        console.log(`Sending audio file ${filePath} to Groq Whisper for transcription...`);
        
        const transcription = await groq.audio.translations.create({
            file: fs.createReadStream(filePath),
            model: "whisper-large-v3-turbo",
            response_format: "json",
            temperature: 0.0
        });

        console.log("Transcription successful!");
        return transcription.text;
    } catch (error) {
        console.error("Error transcribing audio with Groq:", error);
        throw new Error("Failed to transcribe audio file.");
    }
}
