import { classifyDomain } from "../../services/domainGuardService.js";

export async function domainGuardNode(state) {

    const latestMessage =
        state.messages[state.messages.length - 1].content;

    const result = await classifyDomain(latestMessage);

    console.log("Domain classification:", result);

    return {

        ...state,

        domain: result.domain,

    };

}


