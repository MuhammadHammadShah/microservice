# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files
COPY . .

# Build TypeScript files
RUN npm run build

# Run the built JS file
CMD ["npm", "run","dev"]
