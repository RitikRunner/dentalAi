export async function workflowRouterNode(state) {

    console.log("========== WORKFLOW ROUTER ==========");
    console.log("Current Stage:", state.conversationStage);

    // Brand new conversation
    if (
        !state.conversationStage ||
        state.conversationStage === "START"
    ) {

        console.log("Starting new workflow...");

        return {
            ...state,
            next: "domainGuard",
        };
    }

    // Existing booking workflow
    console.log("Continuing existing workflow...");

    return {
        ...state,
        next: "extract",
    };
}