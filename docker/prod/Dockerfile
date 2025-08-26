# ---------- BUILD STAGE ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only manifests first (leverages Docker layer cache)
COPY package.json package-lock.json ./

# Install deps (uses lockfile)
RUN npm ci

# Copy the rest and build
COPY . .
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

# Copy manifests and install only prod deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5501
CMD ["node", "dist/server.js"]
