import { invokeDentalAgent } from "../agents/dentalAgent.js";

export async function chatbotNode(state) {

    const response = await invokeDentalAgent(state.messages);

    console.dir(response, { depth: null });

    return {

    ...state,

    toolCalls: response.tool_calls || response.toolCalls || [],

    finalResponse: response.content,

    conversationStage:
        (response.tool_calls?.length || response.toolCalls?.length)
            ? "WAITING_TOOL"
            : "CHATBOT_RESPONDED",
};
}