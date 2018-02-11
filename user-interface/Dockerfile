FROM node:alpine

WORKDIR /app

COPY ./ /app

RUN echo "installing npm packages..." && npm install

CMD node index.js
