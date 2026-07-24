

/**
 * prompts/systemPrompt.js
 * Composes all prompt modules into the final "Stunner" system prompt.
 *
 * Section ORDER is deliberate:
 *   Identity & context first (framing), scope/flows/tools next (behavior),
 *   RAG/memory/safety/security/examples last (grounding + recency-weighted guardrails).
 *
 * Runtime template variables to replace before each LLM call:
 *   {{CURRENT_DATETIME}}, {{CONVERSATION_STATE}}, {{RETRIEVED_CONTEXT}},
 *   {{ADDITIONAL_SERVICES}}, {{INSURANCE_AND_PAYMENT_INFO}}
 *
 * Usage:
 *   import { buildSystemPrompt } from "./prompts/systemPrompt.js";
 *   const sys = buildSystemPrompt({
 *     currentDatetime: "2026-07-11T14:30:00+05:30 (Saturday)",
 *     conversationState: JSON.stringify(state),
 *     retrievedContext: docs.join("\n\n"),
 *     additionalServices: "",
 *     insuranceAndPayment: "Not available",
 *   });
 */

import { identity, conversationStyle } from "./identity.js";
import { runtimeContext, clinicFacts } from "./clinicContext.js";
import {
  scope,
  intentAndFlows,
  workflowControl,
} from "./workflow.js";
import { toolRules } from "./toolRules.js";
import { rag } from "./rag.js";
import { memory } from "./memory.js";
import { healthcareSafety, emergencyProtocol, escalationPolicy, outOfScopePolicy, failureHandling } from "./safety.js";
import { security } from "./security.js";
import { examples } from "./examples.js";

// Ordered list of section strings that make up the full prompt.
const SECTIONS = [
  identity,            // 1
  runtimeContext,      // 2
  scope,               // 3
  clinicFacts,         // 4
  rag,                 // 5
  intentAndFlows,      // 6
  toolRules,           // 7
  memory,              // 8
  healthcareSafety,    // 9
  emergencyProtocol,   // 10
  escalationPolicy,    // 11
  outOfScopePolicy,    // 12
  conversationStyle,   // 13
  security,            // 14
  failureHandling,     // 15
  examples,            // 16
];

/** The raw assembled prompt, template variables still un-substituted. */
export const systemPromptTemplate = SECTIONS.map((s) => s.trim()).join("\n\n");

/**
 * Fill template variables and return the final prompt string.
 * Any variable not supplied falls back to a safe default so the prompt
 * never ships with a literal {{PLACEHOLDER}} in it.
 */
export function buildSystemPrompt({
  currentDatetime = "unknown",
  conversationState = "{}",
  retrievedContext = "",
  additionalServices = "",
  insuranceAndPayment = "Not available",
} = {}) {
  return systemPromptTemplate
    .replaceAll("{{CURRENT_DATETIME}}", currentDatetime)
    .replaceAll("{{CONVERSATION_STATE}}", conversationState)
    .replaceAll("{{RETRIEVED_CONTEXT}}", retrievedContext)
    .replaceAll("{{ADDITIONAL_SERVICES}}", additionalServices)
    .replaceAll("{{INSURANCE_AND_PAYMENT_INFO}}", insuranceAndPayment);
}

export default buildSystemPrompt;