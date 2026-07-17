import { ToolMessage } from "@langchain/core/messages";

export function createToolMessage(toolCallId, toolResult) {

    return new ToolMessage({
        tool_call_id: toolCallId,
        content: JSON.stringify(toolResult),
    });

}