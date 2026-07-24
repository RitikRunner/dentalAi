export async function confirmationNode(state) {

    const lastMessage =
        state.messages[state.messages.length - 1].content.toLowerCase();

    const confirmedWords = [
        "yes",
        "confirm",
        "confirmed",
        "okay",
        "ok",
        "go ahead",
        "book it",
    ];

    const confirmed = confirmedWords.some(word =>
        lastMessage.includes(word)
    );

    return {

        ...state,

        confirmed,

        next: confirmed
            ? "bookAppointment"
            : "chatbot",

    };

}