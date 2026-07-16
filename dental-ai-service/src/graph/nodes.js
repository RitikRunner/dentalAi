import { invokeDentalAgent } from "../agents/dentalAgent.js";

export async function chatbotNode(state) {

    const response = await invokeDentalAgent(state.messages);

    return {
        ...state,

        toolCalls: response.tool_calls || response.toolCalls || [],

        finalResponse: response.content,
    };
}