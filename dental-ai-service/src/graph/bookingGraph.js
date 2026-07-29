import { StateGraph } from "@langchain/langgraph";

import { DentalState } from "./state.js";
import { registerEdges } from "./edges.js";

import { chatbotNode } from "./nodes/chatbotNode.js";
import { intentNode } from "./nodes/intentNode.js";
import { decisionNode } from "./nodes/decisionNode.js";
import { stateExtractionNode } from "./nodes/stateExtractionNode.js";

import { domainGuardNode } from "./nodes/domainGuardNode.js";
import { outOfScopeNode } from "./nodes/outOfScopeNode.js";
import { missingFieldNode } from "./nodes/missingFieldNode.js";
import { workflowRouterNode } from "./nodes/workflowRouterNode.js";
import { retrievalNode } from "./nodes/retrievalNode.js";

import { toolExecutorNode } from "./nodes/toolExecutorNode.js";

import { confirmationNode } from "./nodes/confirmationNode.js";

const graph = new StateGraph(DentalState);

graph.addNode("workflowRouter", workflowRouterNode);

graph.addNode("domainGuard", domainGuardNode);

graph.addNode("outOfScope", outOfScopeNode);

graph.addNode("toolExecutor", toolExecutorNode);

graph.addNode("intentClassifier", intentNode);

graph.addNode("extract", stateExtractionNode);

graph.addNode("missingField", missingFieldNode);

graph.addNode("confirmation", confirmationNode);

graph.addNode("retrievalNode", retrievalNode);
graph.addNode("chatbot", chatbotNode);

graph.addNode("decision", decisionNode);

registerEdges(graph);

export const dentalGraph = graph.compile();