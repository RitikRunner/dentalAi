export async function missingFieldNode(state) {

    console.log("========== MISSING FIELD ==========");
    console.dir(state,{depth:null});

    if (!state.patient.name) {
        return {
            ...state,
            nextAction: "ASK_NAME",
            conversationStage: "WAITING_NAME",
            next: "chatbot",
        };
    }

    if (!state.patient.phone) {
        return {
            ...state,
            nextAction: "ASK_PHONE",
            conversationStage: "WAITING_PHONE",
            next: "chatbot",
        };
    }

    if (!state.appointment.branch) {
        return {
            ...state,
            nextAction: "ASK_BRANCH",
            conversationStage: "WAITING_BRANCH",
            next: "chatbot",
        };
    }

    if (!state.appointment.date) {
        return {
            ...state,
            nextAction: "ASK_DATE",
            conversationStage: "WAITING_DATE",
            next: "chatbot",
        };
    }

    if (!state.appointment.preferredTime) {
        return {
            ...state,
            nextAction: "ASK_TIME",
            conversationStage: "WAITING_TIME",
            next: "chatbot",
        };
    }

    return {
        ...state,
        nextAction: "READY_FOR_BOOKING",
        conversationStage: "READY_FOR_BOOKING",
        next: "decision",
    };
}