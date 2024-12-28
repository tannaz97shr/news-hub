# Use an official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN yarn build

# Expose the port your application runs on (default for Next.js is 3000)
EXPOSE 3000

# Specify the command to run the application
CMD ["yarn", "start"]
