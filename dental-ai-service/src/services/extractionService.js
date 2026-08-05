import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import { env } from "../config/env.js";
import { extractionPrompt } from "../prompts/extractionPrompt.js";

const extractor = new ChatOllama({
    model: env.OLLAMA_MODEL || "qwen2.5:3b",
    temperature: 0,
});

export async function extractState(messages, conversationStage, lastAssistantQuestion) {

    // Get the latest user message
    const latestMessage = messages[messages.length - 1]?.content ?? "";

    const promptWithContext = extractionPrompt
        .replace("{{CONVERSATION_STAGE}}", conversationStage || "UNKNOWN")
        .replace("{{LAST_ASSISTANT_QUESTION}}", lastAssistantQuestion || "NONE");

    const response = await extractor.invoke([
        new SystemMessage(promptWithContext),
        new HumanMessage(latestMessage),
    ]);

    try {

        return JSON.parse(response.content);

    } catch (err) {

        console.error("Extraction JSON Error:", response.content);

        return {
            patient: {
                name: null,
                phone: null,
            },

            appointment: {
                branch: null,
                doctor: null,
                date: null,
                preferredTime: null,
                reason: null,
            },
        };

    }

}