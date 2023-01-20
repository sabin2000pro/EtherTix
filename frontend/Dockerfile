FROM node:alpine AS build-stage
WORKDIR '/app'
COPY package.json .
COPY tsconfig.json .
RUN npm install --silent
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "start" ]

FROM nginx:latest

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]