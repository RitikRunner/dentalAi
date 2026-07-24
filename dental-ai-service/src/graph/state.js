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

    domain: Annotation({
    default: () => null,
}),

    domainValidated: Annotation({
    default: () => false,
}),

    confirmationPending: Annotation({
    default: () => false,
    }),

    conversationStage: Annotation({
    default: () => "START",
    }),

    confirmed: Annotation({
    default: () => false,
    }),

    bookingStatus: Annotation({
    default: () => "draft",
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