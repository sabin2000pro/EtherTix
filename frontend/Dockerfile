FROM node:alpine AS development
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
RUN npm install --silent
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "start" ]