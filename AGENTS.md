# NEMT Platform - Developer Guide

## Project Information

This is an enterprise-grade Non-Emergency Medical Transportation (NEMT) platform built with Next.js, NestJS, PostgreSQL, and comprehensive AI guardrails.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Radix UI
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 15 with PostGIS extension
- **AI**: Custom guardrails with Zod validation
- **Testing**: Jest, Playwright
- **Build**: Turborepo, Docker

## Key Commands

### Development
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Start specific package
cd apps/web && npm run dev
cd apps/api && npm run dev

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
```

### Testing
```bash
# Run all tests
npm test

# Run specific package tests
npm test --filter=@nemt/api
npm test --filter=@nemt/web

# E2E tests
cd apps/web && npm run test:e2e
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Formatting
npm run format
```

### Building
```bash
# Build all packages
npm run build

# Build specific package
npm run build --filter=@nemt/web
```

## Project Structure

```
nemt-platform/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/app/      # App Router pages
│   │   ├── src/components/  # UI components
│   │   └── e2e/          # Playwright tests
│   └── api/              # NestJS backend
│       ├── src/modules/  # Feature modules
│       └── test/         # Unit tests
├── packages/
│   ├── db/               # Database schema and migrations
│   └── ai-guardrails/    # AI validation schemas
├── prompts/              # Version-controlled AI prompts
└── docker-compose.yml    # Docker services
```

## Database Schema

Key entities are defined in `packages/db/prisma/schema.prisma`:
- **User** - Authentication
- **Patient** - Patient information and insurance
- **Clinic** - Healthcare providers
- **Vehicle** - Fleet management
- **Booking** - Trip requests
- **Trip** - Trip execution
- **BillingClaim** - Insurance claims

## AI Guardrails

The platform includes comprehensive AI guardrails:
- **Schema Validation**: Zod schemas for all AI responses
- **Medical Advice Detection**: Blocks unauthorized medical advice
- **Citation Requirements**: Ensures factual claims have sources
- **Prompt Registry**: Version-controlled prompts in `/prompts/`

## Accessibility Standards

The frontend is WCAG 2.1 AA compliant:
- Large high-contrast typography
- Screen reader support
- Keyboard navigation
- Voice-to-text input support
- Reduced motion support

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing key
- `FRONTEND_URL` - Frontend URL for CORS

## Development Workflow

1. Make changes to code
2. Run tests: `npm test`
3. Run linting: `npm run lint`
4. Type check: `npm run typecheck`
5. Commit changes (pre-commit hooks will run automatically)

## Pre-commit Hooks

The project uses Husky for pre-commit hooks:
- ESLint and Prettier formatting
- TypeScript type checking
- Lint-staged for efficient checks

## Deployment

### Docker
```bash
docker-compose up --build
```

### Manual
```bash
npm run build
cd apps/web && npm start
cd apps/api && npm start
```

## Priority Implementation Status

### Priority 1: Front-Facing Applications ✅
- ✅ Corporate landing page with lead capture
- ✅ WCAG 2.1 AA compliant booking portal
- ✅ Clinic and insurance provider dashboard

### Priority 2: Core Operations 🚧
- 🚧 Dispatcher dashboard with live map
- 🚧 Fleet management system
- 🚧 HCPCS billing code generator
- 🚧 Basic insurance verification

### Priority 3: Advanced Workflows 🔮
- 🔮 Automated insurance eligibility engine
- 🔮 EHR/FHIR integration
- 🔮 EDI 837P claims submission

## Important Notes

- Always use TypeScript strict mode
- Follow the existing code conventions
- Write tests for new features
- Ensure accessibility compliance
- Never commit secrets or keys
- Use deterministic AI responses with citations
