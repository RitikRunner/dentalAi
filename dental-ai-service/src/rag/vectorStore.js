import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { OllamaEmbeddings } from "@langchain/ollama";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory array to store our chunks and their vector embeddings
let vectorStoreData = [];
let embeddingsModel = null;

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function initVectorStore() {
    try {
        console.log("Initializing Vector Store...");
        
        embeddingsModel = new OllamaEmbeddings({
            model: "nomic-embed-text",
            maxConcurrency: 1,
        });

        const kbPath = path.join(__dirname, '..', 'data', 'clinic_kb.txt');
        const text = fs.readFileSync(kbPath, 'utf-8');

        // Split the text by headers (##) to create distinct knowledge chunks
        const chunks = text.split('\n## ').map(c => c.trim()).filter(c => c.length > 0);

        console.log(`Generating embeddings for ${chunks.length} chunks...`);
        
        // Generate vectors for each chunk
        const embeddings = await embeddingsModel.embedDocuments(chunks);

        vectorStoreData = chunks.map((chunk, i) => ({
            content: chunk,
            vector: embeddings[i],
        }));
        
        console.log("Vector Store initialized successfully!");
    } catch (error) {
        console.error("Failed to initialize Vector Store:", error);
    }
}

export async function searchKnowledgeBase(query, topK = 2) {
    if (!vectorStoreData.length || !embeddingsModel) {
        console.warn("Vector Store not initialized. Returning empty context.");
        return "";
    }

    try {
        // Convert the user's question into a vector
        const queryVector = await embeddingsModel.embedQuery(query);
        
        // Compare the question vector against all chunks in our DB
        const results = vectorStoreData.map(item => ({
            content: item.content,
            score: cosineSimilarity(queryVector, item.vector)
        }));

        // Sort by the highest similarity score
        results.sort((a, b) => b.score - a.score);
        
        // Return the top K chunks
        return results.slice(0, topK).map(r => r.content).join("\n\n---\n\n");
    } catch (error) {
        console.error("Error searching knowledge base:", error);
        return "";
    }
}
