import { chatWithAI } from "../llm/ollama.js";
import { parseToolCall } from "../utils/toolParser.js";
import { executeTool } from "./toolExecutor.js";
import { createToolMessage } from "../utils/toolMessage.js";

export async function processMessage({
    message,
    conversation,
}) {

    // Previous conversation + current message
    const messages = [
        ...conversation,
        {
            role: "user",
            content: message,
        },
    ];

    // First LLM Call
    const reply = await chatWithAI(messages);

    // const toolCall = parseToolCall(reply);
    const toolCall = {
    tool: "checkAvailableSlots",
    args: {
        branch: "Greater Kailash",
        date: "tomorrow",
        preferredTime: "3 PM"
    }
};

    // No tool required
    if (!toolCall) {
        return {
            reply,
            updatedConversation: [
                ...messages,
                {
                    role: "assistant",
                    content: reply,
                },
            ],
        };
    }

    // Execute Tool
    const toolResult = await executeTool(
        toolCall.tool,
        toolCall.args
    );

    // Create Tool Message
    const toolMessage = createToolMessage(toolResult);

    // Second LLM Call
    const finalReply = await chatWithAI([
        ...messages,
        {
            role: "assistant",
            content: reply,
        },
        toolMessage,
    ]);

    return {
        reply: finalReply,
        updatedConversation: [
            ...messages,
            {
                role: "assistant",
                content: finalReply,
            },
        ],
    };
}