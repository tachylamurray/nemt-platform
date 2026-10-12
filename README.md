# NEMT Platform - Enterprise Non-Emergency Medical Transportation

A full-stack enterprise platform for managing Non-Emergency Medical Transportation (NEMT) services, built with Next.js, NestJS, PostgreSQL, and comprehensive AI guardrails.

## 🏗️ Architecture

This is a monorepo using Turborepo with the following structure:

```
nemt-platform/
├── apps/
│   ├── web/              # Next.js frontend (Landing, Booking, Portals)
│   └── api/              # NestJS backend (REST/GraphQL & WebSockets)
├── packages/
│   ├── db/               # PostgreSQL, Prisma schema, PostGIS migrations
│   └── ai-guardrails/    # LLM validation schemas, prompt registry
├── prompts/              # Version-controlled AI prompts
└── .devin/              # Devin configuration
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **Mapbox GL** - Interactive maps

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database with PostGIS
- **Redis** - Caching and session management
- **Socket.io** - Real-time communication

### Database
- **PostgreSQL 15** with PostGIS extension
- **Prisma ORM** for type-safe database access
- **PostGIS** for geospatial vehicle tracking

### AI & Guardrails
- **Zod** - Schema validation
- **Custom Guardrails** - LLM response validation
- **Prompt Registry** - Version-controlled AI prompts

## 📋 Features

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

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- npm 10+
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nemt-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start PostgreSQL and Redis**
```bash
docker-compose up -d postgres redis
```

5. **Initialize PostGIS extension**
```bash
# Connect to PostgreSQL
docker exec -it nemt-postgres psql -U nemt_user -d nemt_platform

# Run: CREATE EXTENSION IF NOT EXISTS postgis;
```

6. **Run database migrations**
```bash
cd packages/db
npm run migrate
```

7. **Seed the database (optional)**
```bash
npm run seed
```

8. **Start development servers**
```bash
# Terminal 1: Frontend
cd apps/web
npm run dev

# Terminal 2: Backend
cd apps/api
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend API will be available at `http://localhost:4000`
API documentation at `http://localhost:4000/api/docs`

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests for specific package
npm test --filter=@nemt/api
npm test --filter=@nemt/web
```

### E2E Tests
```bash
cd apps/web
npm run test:e2e
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## 🏗️ Building for Production

```bash
# Build all packages
npm run build

# Build specific package
npm run build --filter=@nemt/web
npm run build --filter=@nemt/api
```

### Docker Production Build

```bash
# Build and start all services
docker-compose up --build
```

## 📁 Project Structure

### Frontend (`apps/web`)
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and helpers
- `e2e/` - Playwright end-to-end tests

### Backend (`apps/api`)
- `src/modules/` - Feature modules (booking, patient, vehicle, billing, auth, ai)
- `src/common/` - Shared utilities and middleware
- `test/` - Unit tests

### Database (`packages/db`)
- `prisma/schema.prisma` - Database schema
- `prisma/migrations/` - Migration files
- `prisma/seed.ts` - Database seeding script
- `src/index.ts` - Prisma client export

### AI Guardrails (`packages/ai-guardrails`)
- `src/schemas.ts` - Zod validation schemas
- Guardrail functions for LLM response validation

### Prompts (`prompts/`)
- `booking-assistant/` - Patient booking prompts
- `policy-lookup/` - Medicaid/Medicare policy prompts
- `billing-mapper/` - HCPCS code mapping prompts
- `logs/` - Runtime prompt execution logs (gitignored)

## 🔒 Security & Compliance

### AI Guardrails
- All AI responses are validated against strict schemas
- Medical advice detection and blocking
- Citation requirements for factual claims
- Deterministic guardrails to prevent hallucination

### Data Protection
- Encrypted passwords using bcrypt
- JWT authentication
- Environment variable management
- GDPR/HIPAA compliance considerations

### Accessibility
- WCAG 2.1 AA compliant frontend
- Screen reader support
- Keyboard navigation
- High contrast mode support
- Large touch targets

## 📊 Database Schema

Key entities:
- **User** - Authentication and authorization
- **Patient** - Patient information and insurance details
- **Clinic** - Healthcare provider information
- **Vehicle** - Fleet management with GPS tracking
- **Booking** - Trip requests and scheduling
- **Trip** - Actual trip execution with GPS logs
- **BillingClaim** - Insurance claims with HCPCS codes
- **PartnerLead** - Partnership lead capture

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

### Pre-commit Hooks
The project uses Husky for pre-commit hooks:
- ESLint and Prettier formatting
- TypeScript type checking
- Lint-staged for efficient checks

## 📝 License

Proprietary - All rights reserved

## 🆘 Support

For technical support, contact the development team.

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- Basic platform infrastructure
- Landing page and lead capture
- Senior booking portal
- Clinic dashboard
- AI guardrails framework

### Phase 2 (Next)
- Dispatcher dashboard with live map
- Fleet management system
- HCPCS billing automation
- Basic insurance verification

### Phase 3 (Future)
- Automated eligibility verification
- EHR/FHIR integration
- EDI claims submission
- Advanced analytics and reporting

---

Built with ❤️ for accessible, reliable medical transportation.
