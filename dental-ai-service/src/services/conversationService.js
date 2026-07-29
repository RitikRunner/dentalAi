import redisClient from "../config/redis.js";

const MAX_MESSAGES = 20;

export async function loadState(sessionId) {

    const key = `conversation:${sessionId}`;

    const data = await redisClient.get(key);

    if (!data) {
        return {
            messages: [],
            conversationStage: undefined,
            nextAction: null,
            patient: {},
            appointment: {},
            intent: null,
            domain: null,
        };
    }

    return JSON.parse(data);
}

export async function saveState(sessionId, state) {

    const key = `conversation:${sessionId}`;

    state.messages = state.messages.slice(-MAX_MESSAGES);

    await redisClient.set(
        key,
        JSON.stringify(state)
    );
}

export async function clearConversation(sessionId) {

    const key = `conversation:${sessionId}`;

    await redisClient.del(key);
}