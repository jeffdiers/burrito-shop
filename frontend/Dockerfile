# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install application dependencies backend
RUN yarn

# Copy the rest of your application code to the container
COPY . .

# Build the frontend
RUN yarn build

# Expose the port frontend will run on
EXPOSE 3000

# Define the command to start your application
CMD ["yarn", "start"]
