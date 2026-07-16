export function createToolMessage(toolResult) {
    return {
        role: "user",
        content: `
The requested tool has completed.

Tool Result:

${JSON.stringify(toolResult)}

Using only this result, respond naturally to the patient.
Do not invent information.
`
    };
}