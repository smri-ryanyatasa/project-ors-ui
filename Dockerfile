FROM node:20-alpine AS base
WORKDIR /app

# Use the lockfile that actually exists in this project for reproducible installs.
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3033
ENV NEXT_PUBLIC_API_URL=http://host.docker.internal:3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3033

CMD ["npm", "run", "start"]
