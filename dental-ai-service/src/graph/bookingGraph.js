import { StateGraph } from "@langchain/langgraph";
import { DentalState } from "./state.js";
import { chatbotNode } from "./nodes.js";
import { registerEdges } from "./edges.js";
import { intentNode } from "./intentNode.js";
import { toolNode } from "./toolNode.js";
import { decisionNode } from "./decisionNode.js";
import { stateExtractionNode } from "./stateExtractionNode.js";


const graph = new StateGraph(DentalState);

graph.addNode("chatbot", chatbotNode);

graph.addNode("tool", toolNode);

graph.addNode("intent", intentNode);

graph.addNode("extract", stateExtractionNode);

graph.addNode("decision", decisionNode);

registerEdges(graph);

export const dentalGraph = graph.compile();