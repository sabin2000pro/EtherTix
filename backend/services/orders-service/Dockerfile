FROM node:alpine AS build-stage
ARG devmode=dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 5051
RUN npm run build:orders-service
CMD [ "npm", "run", "start:server" ]