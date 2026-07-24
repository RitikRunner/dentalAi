export async function workflowRouterNode(state) {

    console.log("========== WORKFLOW ROUTER ==========");

    console.log("Current Stage:", state.conversationStage);

    // If we are already inside a booking flow,
    // skip classification completely.
    if (
        state.conversationStage &&
        state.conversationStage !== "IDLE"
    ) {

        console.log("Continuing existing workflow...");

        return {
            ...state,
            next: "extract",
        };
    }

    console.log("Starting new workflow...");

    return {
        ...state,
        next: "domainGuard",
    };
}