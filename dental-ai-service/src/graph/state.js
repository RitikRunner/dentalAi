import { Annotation } from "@langchain/langgraph";

export const DentalState = Annotation.Root({

    messages: Annotation({
    default: () => [],
}),

    intent: Annotation({
    default: () => null,
}),

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
    default: () => "IDLE",
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

    toolResult: Annotation({
    default: () => null,
}),

    finalResponse: Annotation({
    default: () => "",
}),

    next: Annotation({
    default: () => null,
}),

    nextAction: Annotation({
    default: () => null,
}),

toolExecuted: Annotation({
    default: () => false,
}),

lastTool: Annotation({
    default: () => null,
}),

});