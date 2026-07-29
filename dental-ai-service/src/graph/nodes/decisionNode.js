export async function decisionNode(state) {

    // 1. LLM requested a tool
    if (
        state.toolCalls &&
        state.toolCalls.length > 0
    ) {
        return {
            ...state,
            next: "toolExecutor",
        };
    }

    // 2. Waiting for booking confirmation
    if (
        state.conversationStage === "READY_FOR_BOOKING" ||
        state.confirmationPending
    ) {
        return {
            ...state,
            confirmationPending: true,
            next: "confirmation",
        };
    }

    // // 3. Future RAG
    // if (state.intent === "treatment_information") {
    //     return {
    //         ...state,
    //         next: "rag",
    //     };
    // }

    // 4. Conversation finished
    return {
        ...state,
        next: "END",
    };
}