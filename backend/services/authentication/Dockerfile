FROM node:alpine AS dev
ARG DEVMODE=dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install --silent
COPY . .
EXPOSE 5299
RUN npm run build
CMD [ "npm", "run", "start:server" ]