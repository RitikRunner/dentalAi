import { processGraph } from "../services/graphService.js";
import {
    loadState,
    saveState,
} from "../services/conversationService.js";

export async function chat(req, res) {
    try {

        const { message, sessionId = "demo-user" } = req.body;

        const state = await loadState(sessionId);

        state.messages.push({
            role: "user",
            content: message,
        });

        const updatedState = await processGraph(state);

        const reply = updatedState.finalResponse;

        if (reply?.trim()) {
            updatedState.messages.push({
                role: "assistant",
                content: reply,
            });
        }

        await saveState(sessionId, updatedState);

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