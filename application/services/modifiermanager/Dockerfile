FROM node:14.11.0-alpine
COPY . /modifiermanager
WORKDIR /modifiermanager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
