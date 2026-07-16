import { extractState } from "./services/extractionService.js";

const messages = [
    {
        role: "user",
        content:
            "Hi, my name is Ritik Sharma. My phone number is 9876543210. I want to book an appointment tomorrow at 3 PM in Greater Kailash for a root canal.",
    },
];

const result = await extractState(messages);

console.log(JSON.stringify(result, null, 2));