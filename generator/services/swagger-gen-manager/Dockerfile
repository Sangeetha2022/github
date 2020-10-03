FROM node:14.11.0-alpine
COPY . /swaggergenmanager
WORKDIR /swaggergenmanager
RUN npm install
RUN npm i -g ts-node
CMD npm run dev