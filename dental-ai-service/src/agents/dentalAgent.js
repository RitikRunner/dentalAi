import { ChatOllama } from "@langchain/ollama";
import {
    HumanMessage,
    AIMessage,
    ToolMessage,
    SystemMessage,
} from "@langchain/core/messages";

import { env } from "../config/env.js";
import buildSystemPrompt from "../prompts/systemPrompts.js";

import { dentalTools } from "./tools.js";

const model = new ChatOllama({
    baseUrl: env.OLLAMA_BASE_URL,
    model: env.OLLAMA_MODEL,
    temperature: 0,
});

const prompt = buildSystemPrompt({
    currentDatetime: new Date().toISOString(),
    conversationState: "...",
    retrievedContext: "...",
});


// Bind tools to the model

const modelWithTools = model.bindTools(dentalTools);

export async function invokeDentalAgent(messages) {

    const chatHistory = messages.map((msg) => {

    if (msg instanceof HumanMessage) {
        return msg;
    }

    if (msg instanceof AIMessage) {
        return msg;
    }

    if (msg instanceof ToolMessage) {
        return msg;
    }

    if (msg.role === "user") {
        return new HumanMessage(msg.content);
    }

    if (msg.role === "assistant") {
        return new AIMessage(msg.content);
    }

    return null;

}).filter(Boolean);

    const response = await modelWithTools.invoke([
        new SystemMessage(prompt),
        ...chatHistory,
    ]);

    return response;
}