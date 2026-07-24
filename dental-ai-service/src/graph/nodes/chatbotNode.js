import { invokeDentalAgent } from "../../agents/dentalAgent.js";

export async function chatbotNode(state) {

    console.log("========== CHATBOT NODE ==========");
    console.dir(state, { depth: null });

    // Tell the LLM exactly what question to ask.
    const workflowInstruction = state.nextAction
        ? `NEXT_ACTION: ${state.nextAction}`
        : "";

    const response = await invokeDentalAgent({
        ...state,
        workflowInstruction,
    });

    return {
        ...state,
        toolCalls: response.tool_calls || [],
        finalResponse: response.content,
        conversationStage: "CHATBOT_RESPONDED",
    };
}