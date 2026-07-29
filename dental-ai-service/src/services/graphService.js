import { dentalGraph } from "../graph/bookingGraph.js";

export async function processGraph(state) {

    console.log("========== GRAPH INPUT ==========");
    console.dir(state, { depth: null });

    const updatedState = await dentalGraph.invoke(state);

    console.log("========== GRAPH OUTPUT ==========");
    console.dir(updatedState, { depth: null });

    return updatedState;
}