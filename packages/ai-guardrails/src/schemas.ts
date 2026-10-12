import { z } from 'zod';

// AI Response Validation Schemas
export const BookingAssistantResponseSchema = z.object({
  prompt_id: z.string(),
  prompt_version: z.string(),
  input_parameters: z.record(z.any()),
  grounded_context_retrieved: z.array(z.string()),
  raw_completion_output: z.string(),
  citation_sources: z.array(z.object({
    source_id: z.string(),
    source_type: z.enum(['database', 'manual', 'ehr', 'policy']),
    reference: z.string(),
    timestamp: z.string().optional(),
  })),
  response: z.object({
    content: z.string(),
    confidence: z.number().min(0).max(1),
    requires_human_review: z.boolean(),
    data_unavailable: z.boolean().default(false),
  }),
});

export const PolicyLookupResponseSchema = z.object({
  prompt_id: z.string(),
  prompt_version: z.string(),
  query: z.string(),
  grounded_context_retrieved: z.array(z.string()),
  citation_sources: z.array(z.object({
    source_id: z.string(),
    source_type: z.enum(['medicaid_manual', 'medicare_manual', 'state_regulation']),
    section_number: z.string(),
    reference: z.string(),
  })),
  response: z.object({
    policy_details: z.string(),
    applicable_codes: z.array(z.string()),
    restrictions: z.array(z.string()).optional(),
    data_unavailable: z.boolean().default(false),
  }),
});

export const BillingCodeMapperResponseSchema = z.object({
  prompt_id: z.string(),
  prompt_version: z.string(),
  trip_details: z.object({
    distance_miles: z.number(),
    duration_minutes: z.number(),
    mobility_tier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']),
    vehicle_type: z.enum(['AUTONOMOUS', 'COMPANION_VEHICLE', 'WAV']),
  }),
  citation_sources: z.array(z.object({
    source_id: z.string(),
    source_type: z.enum(['hcpcs_guidelines', 'state_billing_rules']),
    reference: z.string(),
  })),
  response: z.object({
    primary_code: z.string(),
    secondary_codes: z.array(z.string()),
    modifiers: z.array(z.string()).optional(),
    billing_notes: z.string(),
    confidence: z.number().min(0).max(1),
    data_unavailable: z.boolean().default(false),
  }),
});

// Guardrail Validation Functions
export function validateBookingAssistantResponse(data: unknown): z.infer<typeof BookingAssistantResponseSchema> {
  return BookingAssistantResponseSchema.parse(data);
}

export function validatePolicyLookupResponse(data: unknown): z.infer<typeof PolicyLookupResponseSchema> {
  return PolicyLookupResponseSchema.parse(data);
}

export function validateBillingCodeMapperResponse(data: unknown): z.infer<typeof BillingCodeMapperResponseSchema> {
  return BillingCodeMapperResponseSchema.parse(data);
}

// Medical Advice Guardrail
export function containsMedicalAdvice(text: string): boolean {
  const medicalAdviceKeywords = [
    'diagnosis', 'prescribe', 'prescription', 'treatment plan',
    'medical advice', 'recommend treatment', 'you should take',
    'dosage', 'medication', 'cure', 'heal'
  ];
  
  const lowerText = text.toLowerCase();
  return medicalAdviceKeywords.some(keyword => lowerText.includes(keyword));
}

// Factuality Guardrail
export function requiresCitation(text: string): boolean {
  // Check if response contains factual claims that need citations
  const factualPatterns = [
    /\d+%/g, // percentages
    /\$\d+/g, // monetary values
    /Medicaid/i,
    /Medicare/i,
    /HCPCS/i,
    /NEMT/i,
  ];
  
  return factualPatterns.some(pattern => pattern.test(text));
}

export type BookingAssistantResponse = z.infer<typeof BookingAssistantResponseSchema>;
export type PolicyLookupResponse = z.infer<typeof PolicyLookupResponseSchema>;
export type BillingCodeMapperResponse = z.infer<typeof BillingCodeMapperResponseSchema>;
