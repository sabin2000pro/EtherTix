FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install
EXPOSE 5051
RUN npm run build:orders-service
CMD [ "npm", "run", "start-orders:service" ]