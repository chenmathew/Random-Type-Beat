# Install nodejs version 16 alpine
FROM node:16-alpine

# Make the working directory /app
WORKDIR /app

# Copy the package.json to the workdir
COPY package.json .

# Install packages in package.json
RUN npm install

# Copies all files in project directory
COPY . .

# Expose port 3000
EXPOSE 5001

# Start the backend
CMD ["node", "app.js"]