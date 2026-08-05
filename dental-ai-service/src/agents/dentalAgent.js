import { ChatOllama } from "@langchain/ollama";
import {
    HumanMessage,
    AIMessage,
    ToolMessage,
    SystemMessage,
} from "@langchain/core/messages";

import { env } from "../config/env.js";
import buildSystemPrompt from "../prompts/systemPrompts.js";
import { buildWorkflowInstruction } from "../prompts/workflowInstruction.js";
import { dentalTools } from "./tools.js";

const model = new ChatOllama({
    model: env.OLLAMA_MODEL || "qwen2.5:3b",
    temperature: 0,
});

// Bind tools once
const modelWithTools = model.bindTools(dentalTools);

export async function invokeDentalAgent(state) {

    // Build the main system prompt
    const prompt = buildSystemPrompt({
        currentDatetime: new Date().toISOString(),

        conversationState: JSON.stringify(
            {
                patient: state.patient,
                appointment: state.appointment,
                intent: state.intent,
                conversationStage: state.conversationStage,
                nextAction: state.nextAction,
                confirmationPending: state.confirmationPending,
                bookingStatus: state.bookingStatus,
            },
            null,
            2
        ),

        retrievedContext: state.ragContext || "No specific clinic knowledge found.",
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

    // Build workflow instruction
    const workflowInstruction = buildWorkflowInstruction(state);

    // Final message list
    const messages = [
        new SystemMessage(prompt),
    ];

    messages.push(...chatHistory.slice(-6));

    if (workflowInstruction) {
        messages.push(
            new SystemMessage(workflowInstruction)
        );
    }

    const response = await model.invoke(messages);
    return response;
}