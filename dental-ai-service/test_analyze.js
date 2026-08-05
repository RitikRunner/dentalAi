import { analyzeTranscript } from "./src/services/analysisService.js";
import { config } from "dotenv";
config();

async function test() {
    try {
        const transcript = "Hello. Very good morning. Dr. Samrath is right from Stalinger. Can you give me an appointment in Great New York? Yes. Absolutely. I want to come today around 3 o'clock. Okay. Let me check. I will come around 3 to 3.30. By 3.30 I will be there. Okay, I'll tell you confirmation on WhatsApp. Thank you. My name is Vijay. Okay, thank you very much for confirming.";
        const result = await analyzeTranscript(transcript);
        console.log("SUCCESS:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("ANALYSIS ERROR:", e);
    }
}
test();
