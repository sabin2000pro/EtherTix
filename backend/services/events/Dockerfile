FROM node:alpine AS dev
ARG DEVMODE=dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 5301
RUN npm run build
CMD [ "npm", "run", "start:development" ]