FROM node:14.11.0-alpine
COPY . /generation-manager
WORKDIR /generation-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev