import { initVectorStore, searchKnowledgeBase } from "./src/rag/vectorStore.js";

async function test() {
    await initVectorStore();
    const result = await searchKnowledgeBase("RCT prices");
    console.log("=== RAG RESULT ===");
    console.log(result);
}
test();
