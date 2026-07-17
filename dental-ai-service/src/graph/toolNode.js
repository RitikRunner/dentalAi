import { executeTool } from "../tools/toolExecutor.js";
import { createToolMessage } from "../utils/toolMessage.js";

export async function toolNode(state) {

    const toolCall = state.toolCalls?.[0];

    if (!toolCall) {
        return state;
    }

    const result = await executeTool(
        toolCall.name,
        toolCall.args
    );

    const toolMessage = createToolMessage(
    toolCall.id,
    result
);

    return {

        ...state,

        toolResult: result,

        messages: [
            ...state.messages,
            toolMessage,
        ],

        toolCalls: [],

    };
}