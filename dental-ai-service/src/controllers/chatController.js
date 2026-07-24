// import { chatWithAI } from "../llm/ollama.js";
import { processGraph } from "../services/graphService.js";
import {
    getConversation,
    saveConversation,
} from "../services/conversationService.js";

export async function chat(req, res) {

    try {

        const { message, sessionId = "demo-user" } = req.body;

        const conversation = await getConversation(sessionId);

        console.log("Conversation:", conversation);
console.log("Is Array:", Array.isArray(conversation));
console.log("Type:", typeof conversation);

        conversation.push({
            role: "user",
            content: message,
        });

        const graphResult = await processGraph(conversation);

        const reply = graphResult.finalResponse;

        conversation.push({
            role: "assistant",
            content: reply,
        });

        await saveConversation(sessionId, conversation);

        res.json({
            success: true,
            response: reply,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message,
        });

    }
}