import { searchKnowledgeBase } from "../../rag/vectorStore.js";

export async function retrievalNode(state) {
    console.log("========== RETRIEVAL NODE ==========");
    
    // Get the user's latest message
    const latestMessage = state.messages[state.messages.length - 1].content;
    
    // Search the vector store based on their message
    const retrievedContext = await searchKnowledgeBase(latestMessage);
    
    console.log("Retrieved RAG Context Length:", retrievedContext.length);

    // Save the retrieved context to the state so the chatbotNode can use it
    return {
        ...state,
        ragContext: retrievedContext,
    };
}
