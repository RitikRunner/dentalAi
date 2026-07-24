
import { domainGuardPrompt } from "../prompts/domainGuardPrompt.js";
import { rawChat } from "../llm/ollama.js";

export async function classifyDomain(message) {

    const response = await rawChat([
        {
            role: "system",
            content: domainGuardPrompt,
        },
        {
            role: "user",
            content: message,
        },
    ]);

    console.log("========== DOMAIN RAW ==========");
    console.log(response);
    console.log("===============================");

    try {

        return JSON.parse(response);

    } catch (err) {

        console.error("JSON Parse Failed");

        return {
            domain: "OUT_OF_SCOPE",
        };

    }
}