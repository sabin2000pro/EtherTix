FROM node:alpine
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
COPY package-lock.json .
RUN npm install
EXPOSE 3000