import { classifyDomain } from "../../services/domainGuardService.js";

export async function domainGuardNode(state) {

    const latestMessage =
        state.messages[state.messages.length - 1].content;

    // If we are already in the middle of a flow (e.g., collecting name, phone),
    // bypass the strict keyword check because conversational answers (like a name) 
    // won't contain dental keywords. The LLM itself acts as the secondary guard.
    if (state.conversationStage && state.conversationStage !== "START" && state.intent) {
        return {
            ...state,
            domain: "DENTAL",
        };
    }

    const result = await classifyDomain(latestMessage);

    console.log("Domain classification:", result);

    return {

        ...state,

        domain: result.domain,

    };

}


