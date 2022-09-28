FROM node:alpine
ENV DEVMODE=development
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
RUN npm install
EXPOSE 5300
CMD [ "npm", "run", "start:server" ]