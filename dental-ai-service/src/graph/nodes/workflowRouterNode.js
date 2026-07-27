export async function workflowRouterNode(state) {

    console.log("========== WORKFLOW ROUTER ==========");
    console.log("Current Stage:", state.conversationStage);

    // Always run domain guard first to prevent out-of-scope queries mid-conversation
    return {
        ...state,
        next: "domainGuard",
    };
}