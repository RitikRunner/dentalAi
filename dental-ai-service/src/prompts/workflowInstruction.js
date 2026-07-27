export function buildWorkflowInstruction(state) {
    switch (state.nextAction) {
        case "ASK_NAME":
            return `
The workflow engine has already decided the next step.

Generate a polite, natural language response asking for the patient's full name.
DO NOT output the text "ASK_NAME" or any other workflow tokens.

Do not ask for anything else.
Do not skip ahead.
Do not change the workflow.
`;

        case "ASK_PHONE":
            return `
The workflow engine has already decided the next step.

Generate a polite, natural language response asking for the patient's phone number.
DO NOT output the text "ASK_PHONE" or any other workflow tokens.

Do not ask for branch.
Do not ask for date.
Do not ask for time.
Do not ask for doctor.
`;

        case "ASK_BRANCH":
            return `
The workflow engine has already decided the next step.

Generate a polite, natural language response asking which clinic branch the patient prefers.
DO NOT output the text "ASK_BRANCH" or any other workflow tokens.

Available branches:
- Greater Kailash
- Pitampura

Do not ask anything else.
`;

        case "ASK_DATE":
            return `
The workflow engine has already decided the next step.

Generate a polite, natural language response asking for the preferred appointment date.
DO NOT output the text "ASK_DATE" or any other workflow tokens.

Do not ask for time yet.
`;

        case "ASK_TIME":
            return `
The workflow engine has already decided the next step.

Generate a polite, natural language response asking for the preferred appointment time.
DO NOT output the text "ASK_TIME" or any other workflow tokens.

Do not ask for anything else.
`;

        case "READY_FOR_BOOKING":
            return `
All required information has already been collected.

Ask the user to confirm if they would like to proceed with booking the appointment with the details they provided.
Generate a polite, natural language response.
DO NOT output the text "READY_FOR_BOOKING" or any other workflow tokens.
`;

        case "ASK_REJECTION_REASON":
            return `
The user has decided not to proceed or wants to change some details.

Generate a polite, natural language response asking the user what they would like to change or if they need help with anything else.
DO NOT output the text "ASK_REJECTION_REASON" or any other workflow tokens.
`;

        default:
            return "";
    }
}