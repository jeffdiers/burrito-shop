# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN yarn

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 4000

# Define the command to start your application
CMD ["yarn", "start"]
