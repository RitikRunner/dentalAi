export async function decisionNode(state) {

    const appointment = state.appointment;
    const patient = state.patient;

    const readyForBooking =
        patient.name &&
        patient.phone &&
        appointment.branch &&
        appointment.date &&
        appointment.preferredTime;

    return {

        ...state,

        next: readyForBooking
            ? "tool"
            : "chatbot",

    };

}