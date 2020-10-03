FROM node:14.11.0-alpine
COPY . /frontend-gen-manager
WORKDIR /frontend-gen-manager
RUN npm i -g ts-node
RUN npm install
CMD npm run dev
