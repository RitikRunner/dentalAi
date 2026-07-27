import { START, END } from "@langchain/langgraph";

export function registerEdges(graph) {

    graph.addEdge(START, "workflowRouter");

    graph.addConditionalEdges(
    "workflowRouter",
    (state) => state.next,
    {
        domainGuard: "domainGuard",
        extract: "extract",
    }
);

    graph.addConditionalEdges(
    "domainGuard",
    (state) => {
        console.log("Routing State:", state);
        console.log("Routing domain:", state.domain);

        if (state.domain === "OUT_OF_SCOPE") {
            return "outOfScope";
        }

        // If conversation is already started, jump straight to extraction
        if (state.conversationStage && state.conversationStage !== "START") {
            return "extract";
        }

        return "intentClassifier";
    },
    {
        intentClassifier: "intentClassifier",
        extract: "extract",
        outOfScope: "outOfScope",
    }
);

    graph.addEdge("intentClassifier", "extract");

    graph.addEdge("extract", "missingField");
    
    graph.addConditionalEdges(
    "missingField",
    (state) => state.next,
    {
        chatbot: "chatbot",
        decision: "decision",
    }
);
graph.addEdge("chatbot", "decision");

graph.addConditionalEdges(
    "decision",
    (state) => state.next,
    {
        confirmation: "confirmation",
        chatbot: "chatbot",
        toolExecutor: "toolExecutor",
        END: END,
    }
);

graph.addConditionalEdges(
    "confirmation",
    (state) => state.next,
    {
        toolExecutor: "toolExecutor",
        chatbot: "chatbot",
    }
);



graph.addEdge("toolExecutor", "chatbot");

graph.addEdge("outOfScope", END);

}