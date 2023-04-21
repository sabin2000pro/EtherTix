FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY nodemon.json .
COPY tsconfig .
RUN npm install
COPY . .
EXPOSE 5051
RUN npm run build
CMD [ "npm", "run", "start:contact-service" ]