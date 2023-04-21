FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install
COPY . .
EXPOSE 5050
CMD [ "npm", "run", "start-booking:service" ]