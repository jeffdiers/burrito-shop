# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files for the back-end
COPY backend/package.json backend/yarn.lock ./backend/

# Copy the package.json and yarn.lock files for the front-end
COPY frontend/package.json frontend/yarn.lock ./frontend/

# Copy package.json and yarn.lock to the container
COPY package*.json yarn.lock ./

# Install application dependencies backend
RUN cd backend && yarn install

# Install application dependencies frontend
RUN cd frontend && yarn install

# Install application dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Build the frontend
RUN cd frontend && yarn build

# Expose the port backend will run on
EXPOSE 4000

# Expose the port frontend will run on
EXPOSE 3000

# Define the command to start your application
CMD ["yarn", "start:app"]
