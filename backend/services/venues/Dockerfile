FROM node:alpine as dev
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 5302
RUN npm run build
CMD [ "npm", "run", "start:server" ]