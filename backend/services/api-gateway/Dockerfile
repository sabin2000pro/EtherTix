FROM node:alpine AS api-dev
ARG DEVMODE=dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 6000
RUN npm run build
CMD [ "npm", "run", "start:api-gateway-service:dev" ]