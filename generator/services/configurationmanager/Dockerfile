FROM node:14.11.0-alpine
COPY . /configurationmanager
WORKDIR /configurationmanager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
