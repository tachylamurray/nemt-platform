FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/package-lock.json* ./apps/api/
COPY packages/db/package.json packages/db/package-lock.json* ./packages/db/
COPY packages/ai-guardrails/package.json packages/ai-guardrails/package-lock.json* ./packages/ai-guardrails/

RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --filter=@nemt/api

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

USER nestjs

EXPOSE 4000

ENV PORT 4000

CMD ["node", "dist/main"]
