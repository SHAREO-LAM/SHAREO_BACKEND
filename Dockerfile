# Build stage
FROM node:20.11-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Configure npm for better network resilience
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-timeout 60000 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-retries 5

# Install dependencies (include dev deps for build)
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM node:20.11-alpine 

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Configure npm for better network resilience
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-timeout 60000 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-retries 5

# Install production dependencies only
RUN npm ci --omit=dev --prefer-offline --no-audit --no-fund

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/main"]
