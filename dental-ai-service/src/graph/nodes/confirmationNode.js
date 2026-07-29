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
        "sure",
        "please do",
    ];

    const isConfirmed = confirmedWords.some(word =>
        lastMessage.includes(word)
    );

    if (isConfirmed) {
        return {
            ...state,
            confirmed: true,
            confirmationPending: false,
            conversationStage: "BOOKING_CONFIRMED",
            toolCalls: [
                {
                    name: "bookAppointment",
                    args: {
                        patientName: state.patient.name,
                        phone: state.patient.phone,
                        doctor: state.appointment.doctor,
                        date: state.appointment.date,
                        time: state.appointment.preferredTime,
                        treatment: state.appointment.reason || "General Consultation",
                        branch: state.appointment.branch
                    }
                }
            ],
            next: "toolExecutor"
        };
    } else {
        // If rejected, clear confirmationPending and ask what they want to change
        return {
            ...state,
            confirmed: false,
            confirmationPending: false,
            conversationStage: "BOOKING_REJECTED",
            // We can ask the chatbot to handle the rejection by giving a specific nextAction
            nextAction: "ASK_REJECTION_REASON",
            next: "chatbot"
        };
    }
}