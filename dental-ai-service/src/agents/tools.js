import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { checkAvailableSlots } from "../tools/availabilityTool.js";

export const checkAvailableSlotsTool = tool(
    async ({ date, doctor }) => {
        return await checkAvailableSlots({
            date,
            doctor,
        });
    },
    {
        name: "checkAvailableSlots",
        description:
            "Check available appointment slots for a given date and optional doctor.",

        schema: z.object({
            date: z.string().describe("Appointment date"),
            doctor: z
                .string()
                .optional()
                .describe("Doctor name"),
        }),
    }
);

export const dentalTools = [
    checkAvailableSlotsTool,
];