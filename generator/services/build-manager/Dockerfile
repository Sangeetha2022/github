FROM node:14.11.0-alpine
COPY . /buildmanager
WORKDIR /buildmanager
RUN npm i -g ts-node
RUN npm install
CMD npm run prod