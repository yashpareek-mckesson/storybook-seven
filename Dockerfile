# pull the Node.js Docker images
FROM node:18-alpine AS build
ARG NPM_TOKEN
RUN npm config set @mckesson-ontada:registry https://npm.pkg.github.com
RUN npm config set "//npm.pkg.github.com/:_authToken" ${NPM_TOKEN}
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
COPY . .
RUN npm run build-storybook
CMD ["npm", "run", "storybook"]
