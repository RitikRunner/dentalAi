export function parseToolCall(aiResponse) {

    try {

        const parsed = JSON.parse(aiResponse);

        if (
            typeof parsed !== "object" ||
            parsed === null
        ) {
            return null;
        }

        if (!parsed.tool) {
            return null;
        }

        if (!parsed.args) {
            parsed.args = {};
        }

        return parsed;

    } catch {

        return null;

    }

}