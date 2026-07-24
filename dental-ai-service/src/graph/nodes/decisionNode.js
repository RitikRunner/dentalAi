export async function decisionNode(state) {

    // 1. LLM requested a tool
    if (state.toolCalls?.length > 0) {
        return {
            ...state,
            next: "tool",
        };
    }

    // 2. Waiting for booking confirmation
    // if (
    //     state.conversationStage === "WAITING_CONFIRMATION" ||
    //     state.confirmationPending
    // ) {
    //     return {
    //         ...state,
    //         next: "confirmation",
    //     };
    // }

    // // 3. Future RAG
    // if (state.intent === "treatment_information") {
    //     return {
    //         ...state,
    //         next: "rag",
    //     };
    // }

//     if (
//     state.conversationStage === "WAITING_CONFIRMATION" ||
//     state.confirmationPending
// ) {
//     return {
//         ...state,
//         next: "end",
//     };
// }

    // 4. Conversation finished
    return {
        ...state,
        next: "end",
    };
}