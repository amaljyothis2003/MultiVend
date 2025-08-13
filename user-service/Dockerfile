# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies (use package files first for layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Expose service port
EXPOSE 3001

# Start app
CMD ["npm", "start"]
