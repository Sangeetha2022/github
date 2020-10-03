FROM node:14.11.0-alpine
COPY . /flowmanager
WORKDIR /flowmanager
RUN npm i -g ts-node
RUN npm install
CMD npm run prod