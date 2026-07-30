import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { analysisSchema } from "../schema/analysisSchema.js";
import { env } from "../config/env.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Ollama model.
const llm = new ChatOllama({
    model: env.OLLAMA_MODEL || "qwen2.5",
    temperature: 0,
    format: "json", // Enforce JSON format at the Ollama engine level
});

// Bind the Zod schema to force structured output
const structuredLlm = llm.withStructuredOutput(analysisSchema);

// Load the Knowledge Base directly into memory
const kbPath = path.join(__dirname, '..', 'data', 'clinic_kb.txt');
const clinicPolicies = fs.readFileSync(kbPath, 'utf-8');

const systemPrompt = `You are an expert Quality Assurance Auditor for Stunning Dentistry. Your job is to analyze the raw transcript of a phone call between a patient and the CRM receptionist.
You must extract the information exactly according to the required JSON schema, grading the receptionist's performance.

Below are the official clinic policies and pricing rules. You MUST use these rules to judge if the receptionist gave inaccurate information or missed opportunities.

=== CLINIC POLICIES ===
${clinicPolicies}
=======================

Follow these grading rules strictly:
1. 'call_summary' must be professional and concise (max 2 sentences).
2. 'patient_sentiment' must accurately reflect the patient's tone (angry, anxious, neutral, happy, in_pain).
3. 'staff_professionalism_score' is out of 10. Deduct points for rudeness, incorrect info, or missing key details.
4. 'policy_adherence' is false if they misquote a price, recovery time, or policy.
5. 'inaccurate_information_given' is true if what the receptionist said directly contradicts the CLINIC POLICIES.
6. 'missed_opportunities' should list anything the receptionist should have mentioned (e.g., parking, consultation requirements) but didn't.
7. 'coaching_notes' should give actionable advice to the receptionist.
8. MULTILINGUAL SUPPORT: If the transcript contains Hindi or Hinglish, read and understand it natively, but you MUST output the final JSON entirely in English.

Analyze the following transcript and return the JSON report card:
`;

const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["human", "{transcript}"]
]);

export async function analyzeTranscript(transcriptText) {
    try {
        console.log("Analyzing CRM transcript for Quality Assurance...");
        
        // Chain the prompt and the structured LLM
        const chain = prompt.pipe(structuredLlm);
        
        // Execute the chain
        const response = await chain.invoke({
            transcript: transcriptText
        });
        
        return response;
    } catch (error) {
        console.error("Error analyzing transcript:", error);
        throw new Error("Failed to extract JSON from transcript");
    }
}
