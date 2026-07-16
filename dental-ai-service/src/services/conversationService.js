import redisClient from "../config/redis.js";

const MAX_MESSAGES = 20;

export async function getConversation(conversationId) {
    const key = `conversation:${conversationId}`;

    const data = await redisClient.get(key);

    if (!data) return [];

    return JSON.parse(data);
}

export async function saveConversation(conversationId, conversation) {

    const key = `conversation:${conversationId}`;

    const trimmedConversation = conversation.slice(-MAX_MESSAGES);

    await redisClient.set(
        key,
        JSON.stringify(trimmedConversation)
    );
}

export async function clearConversation(conversationId) {

    const key = `conversation:${conversationId}`;

    await redisClient.del(key);
}