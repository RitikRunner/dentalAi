import { START, END } from "@langchain/langgraph";

export function registerEdges(graph) {

    graph.addEdge(START, "intentClassifier");

    graph.addEdge("intentClassifier", "extract");

    // Chatbot runs BEFORE the decision
    graph.addEdge("extract", "chatbot");

    graph.addConditionalEdges(
        "decision",
        (state) => state.next,
        {
            tool: "tool",
            end: END,
        }
    );

    graph.addEdge("chatbot", "decision");

    graph.addEdge("tool", "chatbot");
}