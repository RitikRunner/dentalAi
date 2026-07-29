import { executeTool } from "../../services/toolExecutor.js";

export async function toolExecutorNode(state) {

    console.log("========== TOOL EXECUTOR ==========");
    console.dir(state.toolCalls, { depth: null });

    if (!state.toolCalls || state.toolCalls.length === 0) {

        return {
            ...state,
            next: "chatbot",
        };

    }

    const toolCall = state.toolCalls[0];

    const result = await executeTool(
        toolCall.name,
        toolCall.args
    );

    console.log("========== TOOL RESULT ==========");
    console.dir(result, { depth: null });

    return {
        ...state,

        toolResult: result,

        toolExecuted: true,

        lastTool: toolCall.name,

        toolCalls: [],

        next: "chatbot",
    };
}