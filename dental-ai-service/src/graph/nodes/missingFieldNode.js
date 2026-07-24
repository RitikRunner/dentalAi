export async function missingFieldNode(state) {

    // Patient Name
    if (!state.patient?.name) {

        return {
            ...state,
            conversationStage: "WAITING_NAME",
            nextAction: "ASK_NAME",
            next: "chatbot",
        };

    }

    // Patient Phone
    if (!state.patient?.phone) {

        return {
            ...state,
            conversationStage: "WAITING_PHONE",
            nextAction: "ASK_PHONE",
            next: "chatbot",
        };

    }

    // Branch
    if (!state.appointment?.branch) {

        return {
            ...state,
            conversationStage: "WAITING_BRANCH",
            nextAction: "ASK_BRANCH",
            next: "chatbot",
        };

    }

    // Date
    if (!state.appointment?.date) {

        return {
            ...state,
            conversationStage: "WAITING_DATE",
            nextAction: "ASK_DATE",
            next: "chatbot",
        };

    }

    // Time
    if (!state.appointment?.preferredTime) {

        return {
            ...state,
            conversationStage: "WAITING_TIME",
            nextAction: "ASK_TIME",
            next: "chatbot",
        };

    }

    // Everything collected
    return {
        ...state,
        conversationStage: "READY_FOR_BOOKING",
        nextAction: "READY_FOR_BOOKING",
        next: "decision",
    };

}