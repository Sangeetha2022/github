FROM node:14.11.0-alpine
COPY . /backend-gen-manager
WORKDIR /backend-gen-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
