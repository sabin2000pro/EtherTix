FROM node:alpine AS build-stage
ARG DEVMODE=dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 5299
RUN npm run build
CMD [ "npm", "run", "start:server" ]