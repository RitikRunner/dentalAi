

export function buildWorkflowInstruction(state) {
    if (!state.nextAction) return "";

    return `
CURRENT WORKFLOW

NEXT_ACTION = ${state.nextAction}

Only perform this action.
Do not ask for any other information.
`;
}