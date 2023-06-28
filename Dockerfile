# We're using Node.js 14, but you can specify the version that suits your needs
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Transpile TypeScript into JavaScript
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]
