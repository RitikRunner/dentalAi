import { extractState } from "../../services/extractionService.js";

export async function stateExtractionNode(state) {

    // Find the last assistant message, if any
    const assistantMessages = state.messages.filter(msg => msg.role === "assistant" || msg.constructor.name === "AIMessage");
    const lastAssistantQuestion = assistantMessages.length > 0 
        ? assistantMessages[assistantMessages.length - 1].content 
        : "";

    const extracted = await extractState(state.messages, state.conversationStage, lastAssistantQuestion);

    console.log("========== EXTRACTED ==========");
    console.dir(extracted, { depth: null });

    return {

        ...state,

        patient: {
            ...state.patient,
            ...extracted.patient,
        },

        appointment: {
            ...state.appointment,
            ...extracted.appointment,
        },

        conversationStage: "INTENT_CLASSIFIED",

    };

}