import { analyzeTranscript } from "../services/analysisService.js";
import { transcribeAudio } from "../services/transcriptionService.js";
import fs from "fs";

export async function handleAnalyzeCall(req, res) {
    let finalTranscript = "";

    try {
        // Check if an audio file was uploaded
        if (req.file) {
            console.log("Audio file received for transcription:", req.file.path);
            
            // Step 1: Convert Audio to Text using Groq Whisper
            finalTranscript = await transcribeAudio(req.file.path);
            
            // Delete the temporary audio file to save disk space
            fs.unlinkSync(req.file.path);
            
            console.log("Transcription result:", finalTranscript);
        } else {
            // Fallback: If no file, check if a text transcript was sent in the body
            const { transcript } = req.body;
            if (transcript && typeof transcript === "string") {
                finalTranscript = transcript;
            }
        }

        // Validate we have *something* to analyze
        if (!finalTranscript) {
            return res.status(400).json({
                success: false,
                error: "Missing transcript. Please upload an audio file or provide a 'transcript' text field."
            });
        }

        // Step 2: Pass the transcript to the local LLM for Quality Assurance Analysis
        const analysisResult = await analyzeTranscript(finalTranscript);

        // Return the structured JSON to the backend developer
        res.json({
            success: true,
            data: analysisResult
        });

    } catch (err) {
        console.error("Error in handleAnalyzeCall:", err);
        
        // Clean up the temp file if it exists and an error occurred
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            error: err.message || "Failed to process and analyze call."
        });
    }
}
