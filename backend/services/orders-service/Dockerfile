FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig.json .
RUN npm install
EXPOSE 5771
RUN npm run build
CMD [ "npm", "run", "start-orders:service" ]