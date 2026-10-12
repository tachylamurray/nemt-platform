# AI Prompts Registry

This directory contains version-controlled system prompts, prompt chains, and agent instructions for all AI-driven features in the NEMT Platform.

## Directory Structure

```
/prompts
├── booking-assistant/
│   └── v1.0.0.md          # Patient booking assistant prompt
├── policy-lookup/
│   └── v1.0.0.md          # Medicaid/Medicare policy lookup prompt
├── billing-mapper/
│   └── v1.0.0.md          # HCPCS code mapping prompt
├── logs/                  # Runtime prompt execution logs (gitignored)
└── README.md              # This file
```

## Prompt Metadata

Each prompt file must include the following frontmatter metadata:

```yaml
---
prompt_id: unique-identifier
prompt_version: 1.0.0
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
author: Team Name
description: Brief description of prompt purpose
category: booking|policy|billing|general
language: english
---
```

## Version Control Guidelines

1. **Immutability**: Never modify an existing prompt version directly. Create a new version instead.
2. **Version Format**: Use semantic versioning (MAJOR.MINOR.PATCH)
   - MAJOR: Breaking changes to prompt structure or behavior
   - MINOR: New features or capabilities added
   - PATCH: Bug fixes or minor improvements
3. **Approval Process**: All prompt changes require:
   - Pull request review
   - Evaluation benchmark results
   - Safety guardrail validation
   - Team lead approval

## Prompt Execution Logging

When prompts are executed in production, logs should be stored in `/prompts/logs/` with the following structure:

```
/prompts/logs/
├── 2024-01-15/
│   ├── booking-assistant_2024-01-15_14-30-22.json
│   ├── policy-lookup_2024-01-15_14-35-10.json
│   └── billing-mapper_2024-01-15_14-40-05.json
```

Log format:
```json
{
  "prompt_id": "booking-assistant",
  "prompt_version": "1.0.0",
  "execution_id": "uuid",
  "timestamp": "2024-01-15T14:30:22Z",
  "input_parameters": {...},
  "grounded_context_retrieved": [...],
  "raw_completion_output": "...",
  "citation_sources": [...],
  "response": {...},
  "execution_time_ms": 1250,
  "model_used": "gpt-4",
  "tokens_used": {
    "prompt": 450,
    "completion": 320,
    "total": 770
  }
}
```

## Safety and Compliance

All prompts must follow the enterprise guardrails:

1. **Grounding**: Responses must be grounded in database records or verified documents
2. **Citation**: All factual claims must include source citations
3. **Factuality**: Explicitly state "Information Unavailable" when data is missing
4. **Medical Advice**: Never provide medical diagnosis or treatment recommendations
5. **Human Review**: Flag complex cases requiring human intervention

## Testing and Evaluation

Before deploying a new prompt version:

1. Run evaluation benchmarks against test cases
2. Validate output schema compliance
3. Test safety guardrails
4. Review citation accuracy
5. Measure response latency and token usage

## Adding New Prompts

1. Create a new directory under `/prompts/`
2. Create the initial version file (v1.0.0.md)
3. Include required frontmatter metadata
4. Follow the response format defined in existing prompts
5. Add safety guardrails specific to the use case
6. Update this README with the new prompt category

## Prompt Categories

- **booking**: Patient booking and scheduling assistance
- **policy**: Medicaid/Medicare policy and compliance information
- **billing**: HCPCS code mapping and billing automation
- **general**: General purpose AI interactions

## Contact

For questions about prompt development or modifications, contact the AI Engineering Team.
