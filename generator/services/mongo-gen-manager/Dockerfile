FROM node:14.11.0-alpine
COPY . /mongo-gen-manager
WORKDIR /mongo-gen-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
