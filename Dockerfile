# Stage 1: Build client
FROM node:18-alpine AS build-client

WORKDIR /app

# Copy client package files
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci

# Copy client source and build
COPY client/ .
RUN npm run build

# Stage 2: Production
FROM node:18-slim AS production

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Copy server source
COPY server/ .

# Copy built client from build stage
COPY --from=build-client /app/client/build ./client/build

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
