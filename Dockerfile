# Use an official Node.js runtime as a parent image
FROM node:22-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server for the production build
FROM nginx:stable-alpine

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
