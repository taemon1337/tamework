FROM node:alpine

WORKDIR /app

COPY ./ /app

ENV NODE_PATH=/app/node_modules

RUN npm install -g nodemon && npm install

CMD node app.js
