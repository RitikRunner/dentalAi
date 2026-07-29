export async function intentNode(state) {

    const lastMessage =
        state.messages[state.messages.length - 1]?.content.toLowerCase() || "";

    let intent = "GENERAL";

    if (
        lastMessage.includes("book") ||
        lastMessage.includes("appointment")
    ) {
        intent = "BOOK";
    }

    else if (
        lastMessage.includes("cancel")
    ) {
        intent = "CANCEL";
    }

    else if (
        lastMessage.includes("reschedule")
    ) {
        intent = "RESCHEDULE";
    }

    else if (
        lastMessage.includes("available") ||
        lastMessage.includes("availability")
    ) {
        intent = "AVAILABILITY";
    }

    return {

        ...state,

        intent,

        conversationStage: "INTENT_CLASSIFIED",

    };

}