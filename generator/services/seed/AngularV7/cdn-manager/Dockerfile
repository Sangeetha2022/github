FROM node:14.11.0-alpine
COPY . /cdnmanager
WORKDIR /cdnmanager
RUN npm i -g ts-node
RUN npm install
CMD npm run prod