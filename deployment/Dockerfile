FROM node:lts-alpine AS base

ARG NEXT_PUBLIC_API_URL_V1
ARG NEXT_PUBLIC_STORAGE_PREFIX

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN corepack enable pnpm && pnpm install

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN printenv | grep -E "^[A-Z_]+=" > .env

RUN corepack enable pnpm && pnpm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]