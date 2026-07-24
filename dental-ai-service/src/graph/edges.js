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

        return state.domain;

    },
    {
        DENTAL: "intentClassifier",
        OUT_OF_SCOPE: "outOfScope",
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

    graph.addEdge("decision", END);

    graph.addEdge("outOfScope", END);

}