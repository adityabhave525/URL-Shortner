FROM node:22-alpine

WORKDIR /short-url

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js"]