import { dentalGraph } from "../graph/bookingGraph.js";

export async function processGraph(messages) {

    const result = await dentalGraph.invoke({

        messages,

    });

    return result;
}