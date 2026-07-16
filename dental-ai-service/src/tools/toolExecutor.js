import { tools } from "../tools/toolRegistry.js";

export async function executeTool(toolName, args) {

    const tool = tools[toolName];

    if (!tool) {
        throw new Error(`Tool "${toolName}" not found.`);
    }

    return await tool(args);
}