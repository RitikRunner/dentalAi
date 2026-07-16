import redisClient from "../config/redis.js";

const TTL = 60 * 60; // 1 hour

export async function getConversation(sessionId) {
    const conversation = await redisClient.get(`chat:${sessionId}`);

    if (!conversation) {
        return [];
    }

    return JSON.parse(conversation);
}

export async function saveConversation(sessionId, messages) {
    await redisClient.set(
        `chat:${sessionId}`,
        JSON.stringify(messages),
        {
            EX: TTL,
        }
    );
}