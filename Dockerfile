# Base image

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install deps
RUN npm install

# Copy rest of the app
COPY . .

# Build Typescript
RUN npm run build

# Start the app
CMD ["node", "dist/main.js"]