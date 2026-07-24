import { extractState } from "../../services/extractionService.js";

export async function stateExtractionNode(state) {

    const extracted = await extractState(state.messages);

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