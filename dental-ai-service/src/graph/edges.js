import { START, END } from "@langchain/langgraph";

export function registerEdges(graph) {

    graph.addEdge(START, "intent");

    graph.addEdge("intent", "extract");

    graph.addEdge("extract", "decision");

    graph.addConditionalEdges(
        "decision",

        (state) => state.next,

        {
            chatbot: "chatbot",
            tool: "tool",
            end: END,
        }
    );

    graph.addEdge("chatbot", "decision");

    graph.addEdge("tool", "decision");

}