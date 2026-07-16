import ollama from "ollama";
import buildSystemPrompt from "../prompts/systemPrompts.js";
import { env } from "../config/env.js";


const systemPrompt = buildSystemPrompt({
  currentDatetime: new Date().toISOString(),
  conversationState: "{}",
  retrievedContext: "",
  additionalServices: "",
  insuranceAndPayment: "Not available",
});


export async function chatWithAI(messages) {

    console.log(env.OLLAMA_MODEL);

  console.log("===== Messages Sent to Ollama =====");
console.dir(
    [
        {
            role: "system",
            content: systemPrompt,
        },
        ...messages,
    ],
    { depth: null }
);  

    const response = await ollama.chat({
        model: env.OLLAMA_MODEL,
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            ...messages,
        ],
    });

    return response.message.content;
}
