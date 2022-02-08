FROM node:14.11.0-alpine
COPY . /sharedfeaturesmanager
WORKDIR /sharedfeaturesmanager
RUN npm install
RUN npm i -g ts-node
CMD npm run prod