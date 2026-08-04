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

const systemPrompt = `You are the strict but fair Head CRM Auditor for Stunning Dentistry. Your job is to analyze the raw transcript of a conversation between a patient and your junior CRM staff (or AI bot).
You must extract the information exactly according to the required JSON schema, grading the CRM's performance, providing a rating out of 10, and strictly evaluating whether the lead was converted.

Below are the official clinic policies and pricing rules. You MUST use these rules to judge if the CRM gave inaccurate information or missed opportunities.

=== CLINIC POLICIES ===
{clinicPolicies}
=======================

Follow these grading rules strictly:
1. 'call_summary' must be professional and concise (max 4 sentences).
2. 'patient_sentiment' must accurately reflect the patient's tone (angry, anxious, neutral, happy, in_pain).
3. 'staff_professionalism_score' is out of 10. Deduct points for rudeness, lacking enthusiasm, incorrect info, or missing key details.
4. 'was_converted' is ONLY true if an appointment was explicitly booked.
5. 'conversion_failure_reason' MUST pinpoint exactly why the CRM failed to close the booking (if was_converted is false).
6. 'policy_adherence' is false if they misquote a price, recovery time, or policy.
7. 'inaccurate_information_given' is true if what the CRM said directly contradicts the CLINIC POLICIES.
8. 'missed_opportunities' should list anything the CRM should have mentioned but didn't.
9. 'coaching_notes' should give actionable advice as the Head CRM to the staff.
10. MULTILINGUAL SUPPORT: If the transcript contains Hindi or Hinglish, read and understand it natively, but you MUST output the final JSON entirely in that language as well.

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
            transcript: transcriptText,
            clinicPolicies: clinicPolicies
        });

        return response;
    } catch (error) {
        console.error("Error analyzing transcript:", error);
        throw new Error("Failed to extract JSON from transcript");
    }
}
