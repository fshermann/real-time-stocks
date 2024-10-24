# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend app
COPY . .

# Build the frontend for production
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the frontend port (adjust this as needed)
EXPOSE 3000

# Serve the frontend app
CMD ["serve", "-s", "build"]