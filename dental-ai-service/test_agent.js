import { invokeDentalAgent } from "./src/agents/dentalAgent.js";
import { HumanMessage } from "@langchain/core/messages";
import { initVectorStore, searchKnowledgeBase } from "./src/rag/vectorStore.js";
import { config } from "dotenv";

config();

async function test() {
  await initVectorStore();
  const ragContext = await searchKnowledgeBase("Root Canal Treatment pricing");
  console.log("RAG CONTEXT:\\n", ragContext);
  
  const state = {
    messages: [new HumanMessage("Tell me about the RCT prices")],
    patient: { name: null, phone: null },
    appointment: { branch: null, doctor: null, date: null, preferredTime: null, reason: null },
    intent: "GENERAL",
    conversationStage: "CHATBOT_RESPONDED",
    ragContext: ragContext
  };

  const response = await invokeDentalAgent(state);
  console.log("\\nAI RESPONSE:\\n", response.content);
}

test();
