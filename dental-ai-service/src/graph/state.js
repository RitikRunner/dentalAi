import { Annotation } from "@langchain/langgraph";

export const DentalState = Annotation.Root({

    messages: Annotation(),

    intent: Annotation(),

    patient: Annotation({
        default: () => ({
            name: null,
            phone: null,
        }),
    }),

    appointment: Annotation({
        default: () => ({
            branch: null,
            doctor: null,
            date: null,
            preferredTime: null,
            reason: null,
        }),
    }),

    toolCalls: Annotation({
        default: () => [],
    }),

    toolResult: Annotation(),

    finalResponse: Annotation(),

    next: Annotation(),

});