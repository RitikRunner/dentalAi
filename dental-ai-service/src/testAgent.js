import { invokeDentalAgent } from "./agents/dentalAgent.js";

const response = await invokeDentalAgent(
    "I'd like to book an appointment tomorrow at the Greater Kailash branch."
);

console.log(response);
console.log(response.tool_calls);

console.log("\nTool Calls:");
console.dir(response.tool_calls, { depth: null });