import { z } from "zod";

export const analysisSchema = z.object({
    call_summary: z.string().describe("A brief, professional 2-sentence summary of the call between the patient and the CRM staff."),
    patient_sentiment: z.enum(["angry", "anxious", "neutral", "happy", "in_pain"]).describe("The primary emotion or sentiment of the patient during the call."),
    staff_professionalism_score: z.number().min(1).max(10).describe("Score out of 10 for how professional, polite, and helpful the receptionist was."),
    policy_adherence: z.boolean().describe("True if the staff member followed all clinic policies perfectly. False if they violated or misquoted a policy."),
    inaccurate_information_given: z.boolean().describe("True if the staff quoted incorrect pricing, recovery times, or procedures based on the clinic knowledge base."),
    missed_opportunities: z.array(z.string()).describe("A list of things the staff forgot to mention (e.g., 'Failed to mention valet parking', 'Did not clarify consultation requirement'). Keep items short."),
    coaching_notes: z.string().describe("Constructive feedback for the CRM staff member on how to improve this interaction next time.")
});
