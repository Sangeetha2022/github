FROM node:14.11.0-alpine
COPY . /datastore-manager
WORKDIR /datastore-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
