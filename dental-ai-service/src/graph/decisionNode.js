export async function decisionNode(state) {

    if (state.toolCalls && state.toolCalls.length > 0) {
        return {
            ...state,
            next: "tool",
        };
    }

    return {
        ...state,
        next: "end",
    };
}