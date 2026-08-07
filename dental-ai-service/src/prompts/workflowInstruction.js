export function buildWorkflowInstruction(state) {
    let instruction = "";
    switch (state.nextAction) {
        case "ASK_NAME":
            instruction = `
The workflow engine has already decided the next step: you must ask for the patient's name.

CRITICAL: If the user just asked a general question (e.g., about prices, treatments, before/after images, or who you are), you MUST answer their question FIRST using the knowledge base.
THEN, at the end of your response, politely ask for their full name so you can proceed with booking.

DO NOT output the text "ASK_NAME" or any other workflow tokens.
Do not ask for phone, branch, date, or time yet.
`;
            break;

        case "ASK_PHONE":
            instruction = `
The workflow engine has already decided the next step: you must ask for the patient's phone number.

CRITICAL: If the user just asked a general question, you MUST answer their question FIRST using the knowledge base.
THEN, at the end of your response, politely ask for their phone number.

DO NOT output the text "ASK_PHONE" or any other workflow tokens.
Do not ask for branch, date, time, or doctor.
`;
            break;

        case "ASK_BRANCH":
            instruction = `
The workflow engine has already decided the next step: ask for the branch.

CRITICAL: If the user just asked a general question, you MUST answer their question FIRST using the knowledge base.
THEN, at the end of your response, politely ask which clinic branch they prefer.

Available branches:
- Greater Kailash
- Pitampura

DO NOT output the text "ASK_BRANCH" or any other workflow tokens.
Do not ask for date or time yet.
`;
            break;

        case "ASK_DATE":
            instruction = `
The workflow engine has already decided the next step: ask for the date.

CRITICAL: If the user just asked a general question, you MUST answer their question FIRST using the knowledge base.
THEN, at the end of your response, politely ask for their preferred appointment date.

DO NOT output the text "ASK_DATE" or any other workflow tokens.
Do not ask for time yet.
`;
            break;

        case "ASK_TIME":
            instruction = `
The workflow engine has already decided the next step: ask for the time.

CRITICAL: If the user just asked a general question, you MUST answer their question FIRST using the knowledge base.
THEN, at the end of your response, politely ask for their preferred appointment time.

DO NOT output the text "ASK_TIME" or any other workflow tokens.
`;
            break;

        case "READY_FOR_BOOKING":
            instruction = `
All required information has already been collected.

Ask the user to confirm if they would like to proceed with booking the appointment with the details they provided.
Generate a polite, natural language response.
DO NOT output the text "READY_FOR_BOOKING" or any other workflow tokens.
`;
            break;

        case "ASK_REJECTION_REASON":
            instruction = `
The user has decided not to proceed or wants to change some details.

Generate a polite, natural language response asking the user what they would like to change or if they need help with anything else.
DO NOT output the text "ASK_REJECTION_REASON" or any other workflow tokens.
`;
            break;

        default:
            return "";
    }

    return instruction + `
CRITICAL OUT-OF-SCOPE RULE:
If the user's latest message asks an out-of-scope question (e.g., politics, general knowledge, math, history, non-dental topics), you MUST NOT answer it. 
Instead, politely inform them that you can only assist with dental appointments and clinic information, and gently guide them back to the current step. 
NEVER provide the answer to an out-of-scope question.
`;
}