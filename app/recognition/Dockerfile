FROM node:9.9.0 AS builder
ENV BROKER_URL=localhost
RUN mkdir /var/images

WORKDIR /app
COPY ./models /app/models

COPY package.json ./
RUN npm install --quiet

COPY ./src src
COPY tsconfig.json .
RUN npm run build

CMD [ "node", "/app/dist/index.js" ]