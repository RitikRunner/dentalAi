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

// Bind tools once
const modelWithTools = model.bindTools(dentalTools);

export async function invokeDentalAgent(state) {

    // Build the system prompt dynamically every request
    const prompt = buildSystemPrompt({
        currentDatetime: new Date().toISOString(),

        conversationState: JSON.stringify(
            {
                patient: state.patient,
                appointment: state.appointment,
                intent: state.intent,
                conversationStage: state.conversationStage,
                confirmationPending: state.confirmationPending,
                bookingStatus: state.bookingStatus,
            },
            null,
            2
        ),

        retrievedContext: "",
        additionalServices: "",
        insuranceAndPayment: "Not available",
    });

    // Convert graph messages into LangChain messages
    const chatHistory = state.messages
        .map((msg) => {

            if (msg instanceof HumanMessage) return msg;

            if (msg instanceof AIMessage) return msg;

            if (msg instanceof ToolMessage) return msg;

            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            }

            if (msg.role === "assistant") {
                return new AIMessage(msg.content);
            }

            if (msg.role === "tool") {
                return new ToolMessage({
                    content: msg.content,
                    tool_call_id: msg.tool_call_id,
                });
            }

            return null;

        })
        .filter(Boolean);

    const messages = [
    new SystemMessage(prompt),
];

if (state.workflowInstruction) {
    messages.push(
        new SystemMessage(state.workflowInstruction)
    );
}

messages.push(...chatHistory);

const response = await modelWithTools.invoke(messages);

    return response;
}